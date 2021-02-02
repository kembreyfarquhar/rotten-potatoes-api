import { getRepository } from "typeorm";
import { Request, Response } from "express";
import { User } from "../models/User.model";
import { hashSync, compareSync } from "bcryptjs";
import {
  userValidator,
  userUpdateValidator,
} from "../validators/User.validator";
import { genToken } from "../../utils/genToken";
import { sendError } from "../../utils/sendError";
import { validate } from "class-validator";

export class UserController {
  private userRepository = getRepository(User);

  async findUser(id: string, res: Response) {
    try {
      const user = await this.userRepository.findOne(id);
      if (!user) res.status(404).json({ msg: `user with id:${id} not found` });
      else return user;
    } catch (err) {
      sendError.server(err, res);
    }
  }

  async all(req: Request, res: Response) {
    try {
      const users = await this.userRepository.find();
      users.forEach((user) => delete user.password);
      return users;
    } catch (err) {
      sendError.server(err, res);
    }
  }

  async byID(req: Request, res: Response) {
    const user = await this.findUser(req.params.id, res);
    if (user) {
      delete user.password;
      return user;
    }
    console.log("Here");
  }

  async register(req: Request, res: Response) {
    const user = new User();
    user.username = req.body.username;
    user.password = req.body.password;
    try {
      await userValidator(req.body);
      const errors = await validate(user);
      if (errors.length > 0) sendError.constraints(errors, res);
      else {
        const hash = hashSync(user.password, 10);
        user.password = hash;
        const savedUser = await this.userRepository.save(user);
        delete savedUser.password;
        const token = genToken(savedUser);
        return { token, ...savedUser };
      }
    } catch (err) {
      sendError.check400(err, res);
    }
  }

  async login(req: Request, res: Response) {
    const user = new User();
    user.username = req.body.username;
    user.password = req.body.password;
    try {
      await userValidator(req.body);
      const foundUser = await this.userRepository.findOne({
        where: { username: user.username },
      });
      if (foundUser && compareSync(user.password, foundUser.password)) {
        delete foundUser.password;
        const token = genToken(foundUser);
        return { token, ...foundUser };
      } else {
        res.status(401).json({ error: "Invalid credentials" });
      }
    } catch (err) {
      sendError.server(err, res);
    }
  }

  async update(req: Request, res: Response) {
    const changes = req.body;
    try {
      await userUpdateValidator(changes);
      const foundUser = await this.findUser(req.params.id, res);
      if (foundUser) {
        await this.userRepository.update(req.params.id, changes);
        return { msg: "updated successfully" };
      }
    } catch (err) {
      sendError.check400(err, res);
    }
  }

  async remove(req: Request, res: Response) {
    const id = req.params.id;
    try {
      const foundUser = await this.findUser(id, res);
      await this.userRepository.remove(foundUser);
      return { msg: `user with id:${id} successfully deleted` };
    } catch (err) {
      sendError.server(err, res);
    }
  }
}
