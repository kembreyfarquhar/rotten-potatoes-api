import { NextFunction, Request, Response } from "express";
import jsonwebtoken from "jsonwebtoken";
const secret = process.env.JWT_SECRET || "secret";

export type JWTToken = {
  subject: number;
  username: string;
  iat: number;
  exp: number;
};

const requireToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;

  if (token) {
    jsonwebtoken.verify(token, secret, (err, decodedToken) => {
      if (err) {
        res.status(401).json({ message: "Invalid token" });
      } else {
        //@ts-ignore
        req.token = decodedToken as JWTToken;
        next();
      }
    });
  } else {
    res.status(401).json({ message: "Please provide a token" });
  }
};

export { requireToken };
