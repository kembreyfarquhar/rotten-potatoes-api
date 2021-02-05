import { LOGGER_ROUTES, LOGGER_ROUTE_VALUES } from '../enums/loggerRouteTypes';

const getLoggerRoute = (path: string) => {
	const pathArr = path.split('/');
	let ROUTE: LOGGER_ROUTE_VALUES;

	if (pathArr.includes('users')) ROUTE = LOGGER_ROUTES.USERS;
	else if (pathArr.includes('movies')) ROUTE = LOGGER_ROUTES.MOVIES;
	else ROUTE = LOGGER_ROUTES.BASE;

	return ROUTE;
};

export { getLoggerRoute };
