import { getRepository } from 'typeorm';
import { Request, Response } from 'express';
import { User } from '../models/User.model';
import { hashSync, compareSync } from 'bcryptjs';
import { genToken } from '../../utils/genToken';
import { sendError } from '../../utils/sendError';
import { validate } from 'class-validator';
import { statusCodes } from '../../enums/statusCodes';

export class UserController {
	private userRepository = getRepository(User);

	async all(req: Request, res: Response) {
		try {
			const users = await this.userRepository.find();
			users.forEach(user => delete user.password);
			const STATUS = statusCodes.get('OK').status;
			res.status(STATUS).json(users);
			return STATUS;
		} catch (err) {
			const STATUS = sendError.server(err, res, req);
			return STATUS;
		}
	}

	byID(req: Request, res: Response) {
		const user = req.user;
		delete user.password;
		const STATUS = statusCodes.get('OK').status;
		res.status(STATUS).json(user || {});
		return STATUS;
	}

	async register(req: Request, res: Response) {
		const user = new User();
		user.username = req.body.username;
		user.password = req.body.password;

		try {
			const errors = await validate(user);
			if (errors.length > 0) {
				sendError.constraints(errors, res, req);
			} else {
				const hash = hashSync(user.password, 10);
				user.password = hash;
				const savedUser = await this.userRepository.save(user);
				delete savedUser.password;
				const token = genToken(savedUser);
				res.status(statusCodes.get('CREATED').status).json({ token, ...savedUser });
				return statusCodes.get('CREATED').status;
			}
		} catch (err) {
			const STATUS = sendError.check400(err, res, req);
			return STATUS;
		}
	}

	async login(req: Request, res: Response) {
		const user = new User();
		user.username = req.body.username;
		user.password = req.body.password;
		const foundUser = req.user;

		try {
			if (compareSync(user.password, foundUser.password)) {
				delete foundUser.password;
				const token = genToken(foundUser);
				const STATUS = statusCodes.get('OK').status;
				res.status(STATUS).json({ token, ...foundUser });
				return STATUS;
			} else {
				const STATUS = statusCodes.get('UNAUTHORIZED').status;
				res.status(STATUS).json({ error: 'Invalid credentials' });
				return STATUS;
			}
		} catch (err) {
			const STATUS = sendError.server(err, res, req);
			return STATUS;
		}
	}

	async update(req: Request, res: Response) {
		const changes = req.body;

		try {
			await this.userRepository.update(req.params.id, changes);
			const STATUS = statusCodes.get('CREATED').status;
			res.status(STATUS).json({ msg: 'updated successfully' });
			return STATUS;
		} catch (err) {
			const STATUS = sendError.check400(err, res, req);
			return STATUS;
		}
	}

	async remove(req: Request, res: Response) {
		const foundUser = req.user;
		const id = foundUser.id;

		try {
			await this.userRepository.remove(foundUser);
			const STATUS = statusCodes.get('CREATED').status;
			res.status(STATUS).json({ msg: `user with id:${id} successfully deleted` });
			return STATUS;
		} catch (err) {
			const STATUS = sendError.server(err, res, req);
			return STATUS;
		}
	}
}
