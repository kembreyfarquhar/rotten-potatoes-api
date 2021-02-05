import { RequestHandler } from 'express';
import jsonwebtoken from 'jsonwebtoken';
import { LOGGER_ROUTES } from '../../enums/loggerRouteTypes';
import { HTTP_METHODS_VALUES } from '../../enums/httpMethods';
import { STATUS_CODES } from '../../enums/StatusCodes';
import { LoggerService } from '../../services/loggerService';
import { getKeyByValue } from '../../utils/getObjectKey';
const secret = process.env.JWT_SECRET || 'secret';

export type JWTToken = {
	subject: number;
	username: string;
	iat: number;
	exp: number;
};

const requireToken: RequestHandler = (req, res, next) => {
	const token = req.headers.authorization;

	const logger = new LoggerService(
		LOGGER_ROUTES.TOKEN_AUTHENTICATION,
		req.originalUrl,
		req.method as HTTP_METHODS_VALUES,
		req.headers['host'],
		req.headers['user-agent']
	);

	if (token) {
		jsonwebtoken.verify(token, secret, (err, decodedToken) => {
			if (err) {
				logger.statusCode = STATUS_CODES.UNAUTHORIZED;
				logger.warn(`${getKeyByValue(STATUS_CODES, STATUS_CODES.UNAUTHORIZED)} - TOKEN INVALID`);
				res.status(STATUS_CODES.UNAUTHORIZED).json({ message: 'Invalid token' });
			} else {
				logger.statusCode = null;
				logger.info(`TOKEN SUCCESSFULLY VALIDATED`);
				req.token = decodedToken as JWTToken;
				next();
			}
		});
	} else {
		logger.statusCode = STATUS_CODES.UNAUTHORIZED;
		logger.warn(`${getKeyByValue(STATUS_CODES, STATUS_CODES.UNAUTHORIZED)} - NO TOKEN PROVIDED`);
		res.status(STATUS_CODES.UNAUTHORIZED).json({ message: 'Please provide a token' });
	}
};

export { requireToken };
