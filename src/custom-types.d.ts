import { Request, Response, NextFunction } from "express";
export type MiddlewareFn = (
  req: Request,
  res: Response,
  next: NextFunction
) => void;

export type RouterFn = (req: Request, res: Response) => void;

export type MovieType = {
  title: string;
  plot_summary: string;
  duration: string;
};

export type UserType = {
  id: number | string;
  username: string;
  password: string;
};
