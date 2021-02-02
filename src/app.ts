import express, { Request, Response, NextFunction } from "express";
import * as bodyParser from "body-parser";
import helmet from "helmet";
import morgan from "morgan";
import { connect } from "./db/db";
import { Routes } from "./db/routes";
import { requireToken } from "./db/middleware/requireToken";
import { compose } from "compose-middleware";

connect();

const app = express();

app.use(
  bodyParser.json({
    limit: "50mb",
    verify(req: any, res, buf, encoding) {
      req.rawBody = buf;
    },
  })
);

app.use(helmet());
app.use(morgan("combined"));

Routes.forEach((route) => {
  (app as any)[route.method](
    route.route,
    compose(route.middleware),
    (req: Request, res: Response, next: NextFunction) => {
      const result = new (route.controller as any)()[route.action](
        req,
        res,
        next
      );
      if (result instanceof Promise) {
        result
          .then((result) =>
            result !== null && result !== undefined
              ? res.send(result)
              : console.log(result)
          )
          .catch((err) => res.status(500).json({ error: err.toString() }));
      } else if (result !== null && result !== undefined) {
        res.json(result);
      } else res.status(500).json({ msg: "something went wrong" });
    }
  );
});

app.get("/", (req, res) => res.send("Hello World!"));

export { app };
