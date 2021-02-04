import express, { Request, Response, NextFunction } from 'express';
import { connect } from './db/db';
import { Routes } from './db/routes';
import { compose } from 'compose-middleware';
import { LoggerService } from './services/loggerService';
import { STATUS_CODES } from './enums/STATUS_CODES';
import { HTTP_METHODS_VALUES } from './enums/HTTP_METHODS';
import { LOGGER_ROUTES, LOGGER_ROUTE_VALUES } from './enums/LOGGER_ROUTE_TYPES';

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

      let data = req.body;
      if (req.body.password) delete data.password;

      const logger = new LoggerService(
        ROUTE,
        req.originalUrl,
        req.method as HTTP_METHODS_VALUES,
        req.headers.host,
        req.headers['user-agent'],
        result
      );

      if (result < 300) logger.info(`${route.action.toUpperCase()} ${ROUTE} SUCCESS`, data);
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
  res.send('<h1>Rotten Potatoes API</h1><h4>Made with ❤️ by Katie.</h4>');
});

export { app };
