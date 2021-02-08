import { Response } from 'express';
import { ValidationError } from 'class-validator';
import { statusCodes } from '../enums/StatusCodes';

const sendError = {
	constraints(errors: ValidationError[], res: Response) {
		const STATUS = statusCodes.BAD_REQUEST;
		const constraints = errors.map(error => error.constraints);
		res.status(STATUS).json(constraints);
		return STATUS;
	},

	server(err: any, res: Response) {
		const STATUS = statusCodes.SERVER_ERROR;
		res.status(STATUS).json({ error: err.toString() });
		return STATUS;
	},

	check400(err: any, res: Response) {
		if (err.status === 400) {
			const STATUS = statusCodes.BAD_REQUEST;
			res.status(STATUS).json({ msg: err.message });
			return STATUS;
		} else {
			return this.server(err, res);
		}
	},
};

export { sendError };
