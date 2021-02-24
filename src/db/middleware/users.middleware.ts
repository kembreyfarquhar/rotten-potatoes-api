import { getRepository } from 'typeorm';
import { User } from '../models/User.model';
import { RequestHandler } from 'express';
import { sendError } from '../../utils/sendError';
import { statusCodes } from '../../enums/statusCodes';
import { loggerRoutes } from '../../enums/loggerRouteTypes';
import { handleFailure } from '../../utils/handleMiddlewareFailure';

const route = loggerRoutes.get('USERS');

export const isUser: RequestHandler = async (req, res, next) => {
	const { id } = req.params;
	const { username } = req.body;
	const query = id ? `users.id = :id` : `users.username = :username`;
	const obj = id ? { id } : { username };
	const { status, label } = statusCodes.get('NOT_FOUND');

	try {
		const user = await getRepository(User).createQueryBuilder('users').where(query, obj).getOne();
		if (!user) {
			const msg = `user ${id ? id : username} not found`;
			return handleFailure(req, res, status, msg, label, route);
		} else {
			req.user = user;
			next();
		}
	} catch (err) {
		return sendError.server(err, res, req);
	}
};

export const userValidator: RequestHandler = (req, res, next) => {
	const { username, password } = req.body;
	const keys = Object.keys(req.body);
	const { status, label } = statusCodes.get('BAD_REQUEST');

	if (!keys.length) {
		const msg = 'must contain a json body';
		return handleFailure(req, res, status, msg, label, route);
	} else if (!username || !password) {
		const msg = 'must include username & password';
		return handleFailure(req, res, status, msg, label, route);
	} else if (keys.length !== 2) {
		const msg = 'must only include username & password';
		return handleFailure(req, res, status, msg, label, route);
	} else next();
};

export const userUpdateValidator: RequestHandler = (req, res, next) => {
	const { username, password } = req.body;
	const keys = Object.keys(req.body);
	const { status, label } = statusCodes.get('BAD_REQUEST');

	if (!keys.length) {
		const msg = 'must contain a json body';
		return handleFailure(req, res, status, msg, label, route);
	} else if (req.body.id) {
		const msg = 'cannot change user id';
		return handleFailure(req, res, status, msg, label, route);
	} else if (!username && !password) {
		const msg = 'must include a username or password';
		return handleFailure(req, res, status, msg, label, route);
	} else if (keys.length > 1) {
		const msg = 'may only change username or password, one at a time';
		return handleFailure(req, res, status, msg, label, route);
	} else next();
};

export const userTokenValidator: RequestHandler = (req, res, next) => {
	const token = req.token;
	const { status, label } = statusCodes.get('UNAUTHORIZED');

	if (req.params.id == token.subject.toString()) {
		next();
	} else {
		const msg = 'user token and user id do not match';
		return handleFailure(req, res, status, msg, label, route);
	}
};
