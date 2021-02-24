import { getRepository } from 'typeorm';
import { Request, Response } from 'express';
import { Movie } from '../models/Movie.model';
import { sendError } from '../../utils/sendError';
import { validate } from 'class-validator';
import { statusCodes } from '../../enums/statusCodes';

export class MovieController {
	private movieRepository = getRepository(Movie);

	async all(req: Request, res: Response) {
		try {
			const movies = await this.movieRepository.find();
			const STATUS = statusCodes.get('OK').status;
			res.status(STATUS).json(movies);
			return STATUS;
		} catch (err) {
			const STATUS = sendError.server(err, res, req);
			return STATUS;
		}
	}

	async findMovies(req: Request, res: Response) {
		const movie = req.movies;
		const STATUS = statusCodes.get('OK').status;
		res.status(STATUS).json(movie);
		return STATUS;
	}

	async save(req: Request, res: Response) {
		const token = req.token;
		const user_id = token.subject;
		const movie = new Movie();
		movie.title = req.body.title;
		movie.plot_summary = req.body.plot_summary;
		movie.duration = req.body.duration;
		movie.created_by_user = user_id;
		movie.last_updated_user = user_id;
		try {
			const errors = await validate(movie);
			if (errors.length > 0) sendError.constraints(errors, res, req);
			else {
				const savedMovie = await this.movieRepository.save(movie);
				const STATUS = statusCodes.get('CREATED').status;
				res.status(STATUS).json(savedMovie);
				return STATUS;
			}
		} catch (err) {
			const STATUS = sendError.check400(err, res, req);
			return STATUS;
		}
	}

	async update(req: Request, res: Response) {
		const incomingChanges = req.body;
		const id = req.params.id;
		const last_updated_user = req.token.subject;
		const last_updated = new Date();
		const changes = { ...incomingChanges, last_updated, last_updated_user };
		try {
			await this.movieRepository.update(id, changes);
			const STATUS = statusCodes.get('CREATED').status;
			res.status(STATUS).json({ msg: 'updated successfully' });
			return STATUS;
		} catch (err) {
			const STATUS = sendError.check400(err, res, req);
			return STATUS;
		}
	}

	async remove(req: Request, res: Response) {
		const foundMovie = req.movie;
		const id = foundMovie.id;
		try {
			await this.movieRepository.remove(foundMovie);
			const STATUS = statusCodes.get('CREATED').status;
			res.status(STATUS).json({ msg: `movie with id:${id} successfully deleted` });
			return STATUS;
		} catch (err) {
			const STATUS = sendError.server(err, res, req);
			return STATUS;
		}
	}
}
