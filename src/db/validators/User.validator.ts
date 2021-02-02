import { UserType } from "../../custom-types";

export const userValidator = (body: Partial<UserType>) => {
  const { username, password } = body;
  const promise = new Promise(
    (resolve: (value: unknown) => void, reject: (reason?: any) => void) => {
      let status = true;
      let message;
      if (Object.keys(body).length === 0) {
        status = false;
        message = "must contain a json body";
      } else if (!username || !password) {
        status = false;
        message = "must include username & password";
      } else if (Object.keys(body).length !== 2) {
        status = false;
        message = "must only include username and password";
      }

      if (status === true) {
        resolve("validated");
      } else {
        reject({ message, status: 400 });
      }
    }
  );
  return promise;
};

export const userUpdateValidator = (body: Partial<UserType>) => {
  const promise = new Promise(
    (resolve: (value: unknown) => void, reject: (reason?: any) => void) => {
      let status = true;
      let message;
      if (Object.keys(body).length === 0) {
        status = false;
        message = "must contain a json body";
      } else if (body.id) {
        status = false;
        message = "cannot change user id";
      } else if (!body.username && !body.password) {
        status = false;
        message = "must include a username or password";
      } else if (Object.keys(body).length > 1) {
        status = false;
        message = "may only change either username or password, one at a time";
      }

      if (status === true) {
        resolve("validated");
      } else {
        reject({ message, status: 400 });
      }
    }
  );
  return promise;
};
