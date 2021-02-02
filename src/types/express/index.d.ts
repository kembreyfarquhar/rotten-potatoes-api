import { JWTToken } from "../../db/middleware/requireToken";

declare namespace Express {
  interface Request {
    token: JWTToken;
  }
}
