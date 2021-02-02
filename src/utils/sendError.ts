import { Response } from "express";
import { ValidationError } from "class-validator";

const sendError = {
  constraints(errors: ValidationError[], res: Response) {
    const constraints = errors.map((error) => error.constraints);
    res.status(400).json(constraints);
  },

  server(err: any, res: Response) {
    res.status(500).json({ error: err.toString() });
  },

  check400(err: any, res: Response) {
    if (err.status === 400) {
      res.status(400).json({ msg: err.message });
    } else {
      this.server(err, res);
    }
  },
};

export { sendError };
