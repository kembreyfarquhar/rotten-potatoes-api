import { RequestHandler } from 'express';
import { LoggerService } from '../../services/loggerService';
import { getLoggerRoute } from '../../utils/getLoggerRoute';

const beginLoggingMW: RequestHandler = (req, _, next) => {
	const ROUTE = getLoggerRoute(req.originalUrl);

	const logger = new LoggerService(
		ROUTE,
		req.originalUrl,
		req.method,
		req.headers.host,
		req.headers['user-agent']
	);

	const body = { ...req.body };
	if (body.password) delete body.password;
	const params = req.params;

	logger.info(`BEGINNING ${req.method} - ${ROUTE}`, { body, params });
	next();
};

export { beginLoggingMW };
