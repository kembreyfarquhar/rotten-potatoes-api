import { loggerRoutes, LoggerRouteValues } from '../enums/loggerRouteTypes';

const getLoggerRoute = (path: string) => {
	const pathArr = path.split('/');
	let ROUTE: LoggerRouteValues;

	if (pathArr.includes('users')) ROUTE = loggerRoutes.USERS;
	else if (pathArr.includes('movies')) ROUTE = loggerRoutes.MOVIES;
	else ROUTE = loggerRoutes.BASE;

	return ROUTE;
};

export { getLoggerRoute };
