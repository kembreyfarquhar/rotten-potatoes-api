import { UserController } from "./controllers/User.controller";
import { MovieController } from "./controllers/Movie.controller";
import { Request, Response, NextFunction } from "express";
import { requireToken } from "../db/middleware/requireToken";
import { logger } from "../utils/logger";

//@ts-ignore
type Route = {
  method: string;
  route: string;
  controller: Function;
  action: string;
  middleware: any;
};

const defaultNoMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.info(
    `HTTP version: ${req.httpVersion} IP: ${req.ip} Original URL: ${
      req.originalUrl
    } Body: ${JSON.stringify(req.body)} Headers: ${JSON.stringify(req.headers)}`
  );

  next();
};

export const Routes: Route[] = [
  {
    method: "get",
    route: "/users",
    controller: UserController,
    action: "all",
    middleware: [requireToken],
  },
  {
    method: "get",
    route: "/users/:id",
    controller: UserController,
    action: "byID",
    middleware: [requireToken],
  },
  {
    method: "post",
    route: "/users/register",
    controller: UserController,
    action: "register",
    middleware: [defaultNoMiddleware],
  },
  {
    method: "post",
    route: "/users/login",
    controller: UserController,
    action: "login",
    middleware: [defaultNoMiddleware],
  },
  {
    method: "put",
    route: "/users/:id",
    controller: UserController,
    action: "update",
    middleware: [requireToken],
  },
  {
    method: "delete",
    route: "/users/:id",
    controller: UserController,
    action: "remove",
    middleware: [requireToken],
  },
  {
    method: "get",
    route: "/movies",
    controller: MovieController,
    action: "all",
    middleware: [defaultNoMiddleware],
  },
  {
    method: "get",
    route: "/movies/:id",
    controller: MovieController,
    action: "byID",
    middleware: [defaultNoMiddleware],
  },
  {
    method: "post",
    route: "/movies",
    controller: MovieController,
    action: "save",
    middleware: [defaultNoMiddleware],
  },
  {
    method: "put",
    route: "/movies/:id",
    controller: MovieController,
    action: "update",
    middleware: [requireToken],
  },
  {
    method: "delete",
    route: "/movies/:id",
    controller: MovieController,
    action: "remove",
    middleware: [requireToken],
  },
];
