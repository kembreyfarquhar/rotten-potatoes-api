import dotenv from "dotenv";
dotenv.config();
import { UserType } from "../custom-types";
import jsonwebtoken from "jsonwebtoken";
const secret = process.env.JWT_SECRET || "secret";

function genToken(user: Partial<UserType>) {
  const payload = {
    subject: user.id,
    username: user.username,
  };

  const options = {
    expiresIn: "1d",
  };

  return jsonwebtoken.sign(payload, secret, options);
}

export { genToken };
