import { getRepository } from 'typeorm';
import { Request, Response } from 'express';
import { User } from '../models/User.model';
import { hashSync, compareSync } from 'bcryptjs';
import { genToken } from '../../utils/genToken';
import { sendError } from '../../utils/sendError';
import { validate } from 'class-validator';
import { STATUS_CODES } from '../../enums/STATUS_CODES';

export class UserController {
  private userRepository = getRepository(User);

  async all(req: Request, res: Response) {
    try {
      const users = await this.userRepository.find();

      users.forEach(user => delete user.password);

      const STATUS = STATUS_CODES.OK;
      res.status(STATUS).json(users);
      return STATUS;
    } catch (err) {
      const STATUS = sendError.server(err, res);
      return STATUS;
    }
  }

  byID(req: Request, res: Response) {
    const user = req.user;
    delete user.password;
    const STATUS = STATUS_CODES.OK;
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
        sendError.constraints(errors, res);
      } else {
        const hash = hashSync(user.password, 10);
        user.password = hash;

        const savedUser = await this.userRepository.save(user);

        delete savedUser.password;

        const token = genToken(savedUser);

        res.status(STATUS_CODES.CREATED).json({ token, ...savedUser });
        return STATUS_CODES.CREATED;
      }
    } catch (err) {
      const STATUS = sendError.check400(err, res);
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
        const STATUS = STATUS_CODES.OK;

        res.status(STATUS).json({ token, ...foundUser });
        return STATUS;
      } else {
        const STATUS = STATUS_CODES.UNAUTHORIZED;
        res.status(STATUS).json({ error: 'Invalid credentials' });
        return STATUS;
      }
    } catch (err) {
      const STATUS = sendError.server(err, res);
      return STATUS;
    }
  }

  async update(req: Request, res: Response) {
    const changes = req.body;

    try {
      await this.userRepository.update(req.params.id, changes);

      const STATUS = STATUS_CODES.CREATED;

      res.status(STATUS).json({ msg: 'updated successfully' });
      return STATUS;
    } catch (err) {
      const STATUS = sendError.check400(err, res);
      return STATUS;
    }
  }

  async remove(req: Request, res: Response) {
    const foundUser = req.user;
    const id = foundUser.id;

    try {
      await this.userRepository.remove(foundUser);

      const STATUS = STATUS_CODES.CREATED;

      res.status(STATUS).json({ msg: `user with id:${id} successfully deleted` });
      return STATUS;
    } catch (err) {
      const STATUS = sendError.server(err, res);
      return STATUS;
    }
  }
}
