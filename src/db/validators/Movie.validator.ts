import { MovieType } from "../../custom-types";
import { isDate, isEmpty } from "class-validator";

const movieValidator = (body: MovieType) => {
  const { title, plot_summary, duration } = body;
  const promise = new Promise(
    (resolve: (value: unknown) => void, reject: (reason?: any) => void) => {
      let status = true;
      let message;
      if (Object.keys(body).length === 0) {
        status = false;
        message = "must contain a json body";
      } else if (!title || !plot_summary || !duration) {
        status = false;
        message = "must include title, plot_summary, & duration";
      } else if (Object.keys(body).length !== 3) {
        status = false;
        message = "must only include title, plot_summary, & duration";
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

export { movieValidator };
