const loggerRoutes = {
	BASE: 'BASE',
	USERS: 'USERS',
	MOVIES: 'MOVIES',
	TOKEN_AUTHENTICATION: 'TOKEN AUTHENTICATION',
} as const;

type LoggerRoutTypes = {
	BASE: 'BASE';
	USERS: 'USERS';
	MOVIES: 'MOVIES';
	TOKEN_AUTHENTICATION: 'TOKEN AUTHENTICATION';
};

type LoggerRouteKeys = keyof LoggerRoutTypes;
type LoggerRouteValues = LoggerRoutTypes[LoggerRouteKeys];

export { loggerRoutes, LoggerRouteKeys, LoggerRouteValues };
