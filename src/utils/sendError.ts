import { Request, Response } from 'express';
import { ValidationError } from 'class-validator';
import { statusCodes } from '../enums/statusCodes';
import { handleFailure } from './handleMiddlewareFailure';
import { getLoggerRoute } from './getLoggerRoute';

const sendError = {
	constraints(errors: ValidationError[], res: Response, req: Request) {
		const { status, label } = statusCodes.get('BAD_REQUEST');
		const constraints = errors.map(error => error.constraints);
		const route = getLoggerRoute(req.originalUrl);
		handleFailure(req, res, status, constraints, label, route);
		return status;
	},

	server(err: any, res: Response, req: Request) {
		const { status, label } = statusCodes.get('SERVER_ERROR');
		const route = getLoggerRoute(req.originalUrl);
		handleFailure(req, res, status, err.toString(), label, route);
		return status;
	},

	check400(err: any, res: Response, req: Request) {
		if (err.status === 400) {
			const { status, label } = statusCodes.get('BAD_REQUEST');
			const route = getLoggerRoute(req.originalUrl);
			handleFailure(req, res, status, err.message, label, route);
			return status;
		} else {
			return this.server(err, res, req);
		}
	},
};

export { sendError };
