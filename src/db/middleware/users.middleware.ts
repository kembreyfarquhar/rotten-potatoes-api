import { getRepository } from 'typeorm';
import { User } from '../models/User.model';
import { RequestHandler } from 'express';
import { sendError } from '../../utils/sendError';
import { statusCodes } from '../../enums/StatusCodes';

export const isUser: RequestHandler = async (req, res, next) => {
	const { id } = req.params;
	const { username } = req.body;
	const query = id ? `users.id = :id` : `users.username = :username`;
	const obj = id ? { id } : { username };

	try {
		const user = await getRepository(User).createQueryBuilder('users').where(query, obj).getOne();
		if (!user)
			return res
				.status(statusCodes.NOT_FOUND)
				.json({ msg: `user ${id ? id : username} not found` });
		else {
			req.user = user;
			next();
		}
	} catch (err) {
		sendError.server(err, res);
	}
};

export const userValidator: RequestHandler = (req, res, next) => {
	const { username, password } = req.body;
	const keys = Object.keys(req.body);

	console.log(req.body);
	if (!keys.length) {
		return res.status(statusCodes.BAD_REQUEST).json({ msg: 'must contain a json body' });
	} else if (!username || !password) {
		return res.status(statusCodes.BAD_REQUEST).json({ msg: 'must include username & password' });
	} else if (keys.length !== 2) {
		return res
			.status(statusCodes.BAD_REQUEST)
			.json({ msg: 'must only include username & password' });
	} else next();
};

export const userUpdateValidator: RequestHandler = (req, res, next) => {
	const { username, password } = req.body;
	const keys = Object.keys(req.body);

	if (!keys.length) {
		return res.status(statusCodes.BAD_REQUEST).json({ msg: 'must contain a json body' });
	} else if (req.body.id) {
		return res.status(statusCodes.BAD_REQUEST).json({ msg: 'cannot change user id' });
	} else if (!username && !password) {
		return res.status(statusCodes.BAD_REQUEST).json({ msg: 'must include a username or password' });
	} else if (keys.length > 1) {
		return res
			.status(statusCodes.BAD_REQUEST)
			.json({ msg: 'may only change username or password, one at a time' });
	} else next();
};

export const userTokenValidator: RequestHandler = (req, res, next) => {
	const token = req.token;

	if (req.params.id == token.subject.toString()) {
		next();
	} else {
		return res
			.status(statusCodes.UNAUTHORIZED)
			.json({ msg: 'user token and user id do not match' });
	}
};
