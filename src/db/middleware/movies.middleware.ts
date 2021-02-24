import { getRepository } from 'typeorm';
import { Movie } from '../models/Movie.model';
import { RequestHandler } from 'express';
import { sendError } from '../../utils/sendError';
import { statusCodes } from '../../enums/statusCodes';
import { loggerRoutes } from '../../enums/loggerRouteTypes';
import { handleFailure } from '../../utils/handleMiddlewareFailure';
import { objectHasOne } from '../../utils/objectFunctions';

const route = loggerRoutes.get('MOVIES');

export const isMovie: RequestHandler = async (req, res, next) => {
	const { status, label } = statusCodes.get('NOT_FOUND');

	try {
		if (Object.keys(req.query).length !== 0) {
			const movies = await getRepository(Movie).createQueryBuilder('movies').where(req.query).getMany();
			if (!movies.length) {
				const msg = 'movie(s) not found';
				return handleFailure(req, res, status, msg, label, route);
			} else {
				req.movies = movies;
				next();
			}
		} else {
			const { id } = req.params;
			const movie = await getRepository(Movie).createQueryBuilder('movies').where('movies.id = :id', { id }).getOne();
			if (!movie) {
				const msg = `movie ${id} not found`;
				return handleFailure(req, res, status, msg, label, route);
			} else {
				req.movie = movie;
				next();
			}
		}
	} catch (err) {
		return sendError.server(err, res, req);
	}
};

export const movieValidator: RequestHandler = (req, res, next) => {
	const { title, plot_summary, duration } = req.body;
	const keys = Object.keys(req.body);
	const { status, label } = statusCodes.get('BAD_REQUEST');

	if (!keys.length) {
		const msg = 'must contain a json body';
		return handleFailure(req, res, status, msg, label, route);
	} else if (!title || !plot_summary || !duration) {
		const msg = 'must include title, plot_summary, & duration';
		return handleFailure(req, res, status, msg, label, route);
	} else if (keys.length !== 3) {
		const msg = 'must only include title, plot_summary, & duration';
		return handleFailure(req, res, status, msg, label, route);
	} else next();
};

export const movieUpdateValidator: RequestHandler = (req, res, next) => {
	const { title, plot_summary, duration } = req.body;
	const keys = Object.keys(req.body);
	const { status, label } = statusCodes.get('BAD_REQUEST');
	const restrictedProperties = ['id', 'created_at', 'last_updated', 'created_by_user_id', 'last_updated_user_id'];

	if (!keys.length) {
		const msg = 'must contain a json body';
		return handleFailure(req, res, status, msg, label, route);
	} else if (!title && !plot_summary && !duration) {
		const msg = 'must include title, plot_summary, or duration';
		return handleFailure(req, res, status, msg, label, route);
	} else if (objectHasOne(req.body, restrictedProperties)) {
		const msg = `cannot change movie ${restrictedProperties.join(', ')}`;
		return handleFailure(req, res, status, msg, label, route);
	} else next();
};
