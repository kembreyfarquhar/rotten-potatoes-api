import { getRepository } from "typeorm";
import { Request, Response } from "express";
import { Movie } from "../models/Movie.model";
import { movieValidator } from "../validators/Movie.validator";
import { sendError } from "../../utils/sendError";
import { requireToken } from "../middleware/requireToken";
import { validate, isEmpty } from "class-validator";

export class MovieController {
  private movieRepository = getRepository(Movie);

  async findMovie(id: string, res: Response) {
    try {
      const movie = await this.movieRepository.findOne(id);
      if (!movie)
        res.status(404).json({ msg: `movie with id:${id} not found` });
      else return movie;
    } catch (err) {
      sendError.server(err, res);
    }
  }

  async all(req: Request, res: Response) {
    try {
      const movies = await this.movieRepository.find();
      return movies;
    } catch (err) {
      sendError.server(err, res);
    }
  }

  async byID(req: Request, res: Response) {
    const movie = await this.findMovie(req.params.id, res);
    if (movie) {
      return movie;
    }
  }

  async save(req: Request, res: Response) {
    //@ts-ignore
    const token = req.token;
    const user_id = token.subject;
    const movie = new Movie();
    movie.title = req.body.title;
    movie.plot_summary = req.body.plot_summary;
    movie.duration = req.body.duration;
    movie.created_by_user = user_id;
    movie.last_updated_user = user_id;
    try {
      await movieValidator(req.body);
      const errors = await validate(movie);
      if (errors.length > 0) sendError.constraints(errors, res);
      else {
        const savedMovie = await this.movieRepository.save(movie);
        return savedMovie;
      }
    } catch (err) {
      sendError.check400(err, res);
    }
  }

  async update(req: Request, res: Response) {
    // cannot be empty
    // cannot update id or any created_by, last_updated, created_at, ....
    // if doesn't include title, plot, duration then error
    // validate with class-validator
    // const token = requireToken(req.headers.authorization, res)
    // if (token !== undefined) {
    //     const user_id = token.subject;
    // }
    // const date = new Date();
    // const result = isDate(date);
    const obj = {};
    const result = isEmpty(obj);
    console.log(result);
  }

  async remove(req: Request, res: Response) {
    let movieToRemove = await this.movieRepository.findOne(req.params.id);
    await this.movieRepository.remove(movieToRemove);
  }
}
