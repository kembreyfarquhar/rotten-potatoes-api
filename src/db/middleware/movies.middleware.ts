import { getRepository } from 'typeorm';
import { Movie } from '../models/Movie.model';
import { RequestHandler } from 'express';
import { sendError } from '../../utils/sendError';
import { STATUS_CODES } from '../../enums/StatusCodes';

export const isMovie: RequestHandler = async (req, res, next) => {
  try {
    if (Object.keys(req.query).length !== 0) {
      const movies = await getRepository(Movie)
        .createQueryBuilder('movies')
        .where(req.query)
        .getMany();

      if (!movies.length) res.status(STATUS_CODES.NOT_FOUND).json({ msg: `movie(s) not found` });
      else {
        req.movies = movies;
        next();
      }
    } else {
      const { id } = req.params;
      const movie = await getRepository(Movie)
        .createQueryBuilder('movies')
        .where('movies.id = :id', { id })
        .getOne();

      if (!movie) res.status(STATUS_CODES.NOT_FOUND).json({ msg: `movie ${id} not found` });
      else {
        req.movie = movie;
        next();
      }
    }
  } catch (err) {
    sendError.server(err, res);
  }
};

export const movieValidator: RequestHandler = (req, res, next) => {
  const { title, plot_summary, duration } = req.body;
  const keys = Object.keys(req.body);

  if (!keys.length) {
    res.status(STATUS_CODES.BAD_REQUEST).json({ msg: 'must contain a json body' });
  } else if (!title || !plot_summary || !duration) {
    res
      .status(STATUS_CODES.BAD_REQUEST)
      .json({ msg: 'must include title, plot_summary, & duration' });
  } else if (keys.length !== 3) {
    res
      .status(STATUS_CODES.BAD_REQUEST)
      .json({ msg: 'must only include title, plot_summary, & duration' });
  } else next();
};

export const movieUpdateValidator: RequestHandler = (req, res, next) => {
  const { title, plot_summary, duration } = req.body;

  const keys = Object.keys(req.body);

  if (!keys.length) {
    res.status(STATUS_CODES.BAD_REQUEST).json({ msg: 'must contain a json body' });
  } else if (!title && !plot_summary && !duration) {
    res
      .status(STATUS_CODES.BAD_REQUEST)
      .json({ msg: 'must include title, plot_summary, or duration' });
  } else if (
    req.body.id ||
    req.body.created_at ||
    req.body.last_updated ||
    req.body.created_by_user_id ||
    req.body.last_updated_user_id
  ) {
    res.status(STATUS_CODES.BAD_REQUEST).json({
      msg: 'cannot change movie id, created_at, created_by_user_id, or last_updated_user_id',
    });
  } else next();
};
