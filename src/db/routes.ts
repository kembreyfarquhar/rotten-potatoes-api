import { UserController } from './controllers/User.controller';
import { MovieController } from './controllers/Movie.controller';
import { requireToken } from '../db/middleware/requireToken';
import { HTTP_METHODS } from '../enums/httpMethods';
import { beginLoggingMW } from '../db/middleware/beginLogging';
import {
	userValidator,
	userUpdateValidator,
	isUser,
	userTokenValidator,
} from '../db/middleware/users.middleware';
import { movieValidator, movieUpdateValidator, isMovie } from '../db/middleware/movies.middleware';
import { ServerRouteType } from '../enums/serverRouteType';

export const Routes: ServerRouteType[] = [
	{
		method: HTTP_METHODS.GET,
		route: '/users/all',
		controller: UserController,
		action: 'all',
		middleware: [beginLoggingMW, requireToken],
	},
	{
		method: HTTP_METHODS.GET,
		route: '/users/:id',
		controller: UserController,
		action: 'byID',
		middleware: [beginLoggingMW, requireToken, isUser],
	},
	{
		method: HTTP_METHODS.POST,
		route: '/users/register',
		controller: UserController,
		action: 'register',
		middleware: [beginLoggingMW, userValidator],
	},
	{
		method: HTTP_METHODS.POST,
		route: '/users/login',
		controller: UserController,
		action: 'login',
		middleware: [beginLoggingMW, userValidator, isUser],
	},
	{
		method: HTTP_METHODS.PUT,
		route: '/users/:id',
		controller: UserController,
		action: 'update',
		middleware: [beginLoggingMW, requireToken, userUpdateValidator, isUser, userTokenValidator],
	},
	{
		method: HTTP_METHODS.DELETE,
		route: '/users/:id',
		controller: UserController,
		action: 'remove',
		middleware: [beginLoggingMW, requireToken, isUser, userTokenValidator],
	},
	{
		method: HTTP_METHODS.GET,
		route: '/movies/all',
		controller: MovieController,
		action: 'all',
		middleware: [beginLoggingMW],
	},
	{
		method: HTTP_METHODS.GET,
		route: '/movies/find',
		controller: MovieController,
		action: 'findMovies',
		middleware: [beginLoggingMW, isMovie],
	},
	{
		method: HTTP_METHODS.POST,
		route: '/movies',
		controller: MovieController,
		action: 'save',
		middleware: [beginLoggingMW, requireToken, movieValidator],
	},
	{
		method: HTTP_METHODS.PUT,
		route: '/movies/:id',
		controller: MovieController,
		action: 'update',
		middleware: [beginLoggingMW, requireToken, isMovie, movieUpdateValidator],
	},
	{
		method: HTTP_METHODS.DELETE,
		route: '/movies/:id',
		controller: MovieController,
		action: 'remove',
		middleware: [beginLoggingMW, requireToken, isMovie],
	},
];
