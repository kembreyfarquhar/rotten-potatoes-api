import { getRepository } from 'typeorm';
import { User } from '../models/User.model';
import { Request, Response, NextFunction } from 'express';
import { sendError } from '../../utils/sendError';
import { STATUS_CODES } from '../../enums/STATUS_CODES';

export const isUser = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const { username } = req.body;
  const query = id ? `users.id = :id` : `users.username = :username`;
  const obj = id ? { id } : { username };

  try {
    const user = await getRepository(User).createQueryBuilder('users').where(query, obj).getOne();
    if (!user)
      return res
        .status(STATUS_CODES.NOT_FOUND)
        .json({ msg: `user ${id ? id : username} not found` });
    else {
      req.user = user;
      next();
    }
  } catch (err) {
    sendError.server(err, res);
  }
};

export const userValidator = (req: Request, res: Response, next: NextFunction) => {
  const { username, password } = req.body;
  const keys = Object.keys(req.body);

  if (!keys.length) {
    return res.status(STATUS_CODES.BAD_REQUEST).json({ msg: 'must contain a json body' });
  } else if (!username || !password) {
    return res.status(STATUS_CODES.BAD_REQUEST).json({ msg: 'must include username & password' });
  } else if (keys.length !== 2) {
    return res
      .status(STATUS_CODES.BAD_REQUEST)
      .json({ msg: 'must only include username & password' });
  } else next();
};

export const userUpdateValidator = (req: Request, res: Response, next: NextFunction) => {
  const { username, password } = req.body;
  const keys = Object.keys(req.body);

  if (!keys.length) {
    return res.status(STATUS_CODES.BAD_REQUEST).json({ msg: 'must contain a json body' });
  } else if (req.body.id) {
    return res.status(STATUS_CODES.BAD_REQUEST).json({ msg: 'cannot change user id' });
  } else if (!username && !password) {
    return res
      .status(STATUS_CODES.BAD_REQUEST)
      .json({ msg: 'must include a username or password' });
  } else if (keys.length > 1) {
    return res
      .status(STATUS_CODES.BAD_REQUEST)
      .json({ msg: 'may only change username or password, one at a time' });
  } else next();
};

export const userTokenValidator = (req: Request, res: Response, next: NextFunction) => {
  const token = req.token;

  if (req.params.id == token.subject.toString()) {
    next();
  } else {
    return res
      .status(STATUS_CODES.UNAUTHORIZED)
      .json({ msg: 'user token and user id do not match' });
  }
};
