import express, { Request, Response, NextFunction } from 'express';
import { connect } from './db/db';
import { Routes } from './db/routes';
import { compose } from 'compose-middleware';
import { LoggerService } from './services/loggerService';
import { STATUS_CODES } from './enums/StatusCodes';
import { HTTP_METHODS_VALUES } from './enums/httpMethods';
import { LOGGER_ROUTES, LOGGER_ROUTE_VALUES } from './enums/loggerRouteTypes';

connect();

const app = express();

app.use(express.json());

Routes.forEach(route => {
  (app as any)[route.method](
    route.route,
    compose(route.middleware),
    async (req: Request, res: Response, next: NextFunction) => {
      const result = await new (route.controller as any)()[route.action](req, res, next);

      let ROUTE: LOGGER_ROUTE_VALUES;

      const routePathArr = route.route.split('/');
      if (routePathArr.includes('users')) ROUTE = LOGGER_ROUTES.USERS;
      else if (routePathArr.includes('movies')) ROUTE = LOGGER_ROUTES.MOVIES;
      else ROUTE = LOGGER_ROUTES.BASE;

      let data = { ...req.body };
      if (data.password) delete data.password;

      const logger = new LoggerService(
        ROUTE,
        req.originalUrl,
        req.method as HTTP_METHODS_VALUES,
        req.headers.host,
        req.headers['user-agent'],
        result
      );

      if (result < 300) logger.info(`${route.action.toUpperCase()} ${ROUTE} SUCCESS`, data);
      else if (result > 299 && result < 499)
        logger.warn(`${route.action.toUpperCase()} ${ROUTE} CLIENT SIDE ERROR`);
      else logger.error(`${route.action.toUpperCase()} ${ROUTE} FAILURE`, data);
    }
  );
});

app.get('/', (req, res) => {
  const logger = new LoggerService(
    LOGGER_ROUTES.BASE,
    req.originalUrl,
    'get',
    req.headers.host,
    req.headers['user-agent'],
    STATUS_CODES.OK
  );

  logger.info('Sanity test working');

  res.send(
    `<!DOCTYPE html>
    <html lang="en">
    <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Rotten Potatoes API</title>
    </head>
    <body
    style="
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: calc(100vh / 2);
      background: thistle;
      font-family: Arial, Helvetica, sans-serif;
    "
  >
    <div
      style="
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        background-color: whitesmoke;
        padding: 36px;
        border-radius: 8px;
        box-shadow: 0px 0px 12px black;
      "
    >
      <h1>Rotten Potatoes API</h1>
      <h4>Made with ❤️ by Katie Embrey-Farquhar.</h4>
      <p>
        For full documentation, please visit the
        <a href="https://github.com/kembreyfarquhar/rotten-potatoes-api">github repo</a>.
      </p>
    </div>
  </body>
    </html>`
  );
});

export { app };
