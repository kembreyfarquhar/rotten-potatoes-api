import { loggerRoutes } from '../enums/loggerRouteTypes';

const getLoggerRoute = (path: string) => {
	const pathArr = path.split('/');
	let ROUTE: string;

	if (pathArr.includes('users')) ROUTE = loggerRoutes.get('USERS');
	else if (pathArr.includes('movies')) ROUTE = loggerRoutes.get('MOVIES');
	else ROUTE = loggerRoutes.get('BASE');

	return ROUTE;
};

export { getLoggerRoute };
