import { UserController } from './controllers/User.controller';
import { MovieController } from './controllers/Movie.controller';
import { requireToken } from '../db/middleware/requireToken';
import { HTTPMethods } from '../enums/httpMethods';
import { beginLoggingMW } from '../db/middleware/beginLogging';
import { userValidator, userUpdateValidator, isUser, userTokenValidator } from '../db/middleware/users.middleware';
import { movieValidator, movieUpdateValidator, isMovie } from '../db/middleware/movies.middleware';
import { ServerRouteType } from '../types/serverRoute';

export const Routes: ServerRouteType[] = [
	{
		method: HTTPMethods.get('GET'),
		route: '/users/all',
		controller: UserController,
		action: 'all',
		middleware: [beginLoggingMW, requireToken],
	},
	{
		method: HTTPMethods.get('GET'),
		route: '/users/:id',
		controller: UserController,
		action: 'byID',
		middleware: [beginLoggingMW, requireToken, isUser],
	},
	{
		method: HTTPMethods.get('POST'),
		route: '/users/register',
		controller: UserController,
		action: 'register',
		middleware: [beginLoggingMW, userValidator],
	},
	{
		method: HTTPMethods.get('POST'),
		route: '/users/login',
		controller: UserController,
		action: 'login',
		middleware: [beginLoggingMW, userValidator, isUser],
	},
	{
		method: HTTPMethods.get('PUT'),
		route: '/users/:id',
		controller: UserController,
		action: 'update',
		middleware: [beginLoggingMW, requireToken, userUpdateValidator, isUser, userTokenValidator],
	},
	{
		method: HTTPMethods.get('DELETE'),
		route: '/users/:id',
		controller: UserController,
		action: 'remove',
		middleware: [beginLoggingMW, requireToken, isUser, userTokenValidator],
	},
	{
		method: HTTPMethods.get('GET'),
		route: '/movies/all',
		controller: MovieController,
		action: 'all',
		middleware: [beginLoggingMW],
	},
	{
		method: HTTPMethods.get('GET'),
		route: '/movies/find',
		controller: MovieController,
		action: 'findMovies',
		middleware: [beginLoggingMW, isMovie],
	},
	{
		method: HTTPMethods.get('POST'),
		route: '/movies',
		controller: MovieController,
		action: 'save',
		middleware: [beginLoggingMW, requireToken, movieValidator],
	},
	{
		method: HTTPMethods.get('PUT'),
		route: '/movies/:id',
		controller: MovieController,
		action: 'update',
		middleware: [beginLoggingMW, requireToken, isMovie, movieUpdateValidator],
	},
	{
		method: HTTPMethods.get('DELETE'),
		route: '/movies/:id',
		controller: MovieController,
		action: 'remove',
		middleware: [beginLoggingMW, requireToken, isMovie],
	},
];
