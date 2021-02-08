import { RequestHandler } from 'express';
import jsonwebtoken from 'jsonwebtoken';
import { loggerRoutes } from '../../enums/loggerRouteTypes';
import { HTTPMethodValues } from '../../enums/httpMethods';
import { statusCodes } from '../../enums/StatusCodes';
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
		loggerRoutes.TOKEN_AUTHENTICATION,
		req.originalUrl,
		req.method as HTTPMethodValues,
		req.headers['host'],
		req.headers['user-agent']
	);

	if (token) {
		jsonwebtoken.verify(token, secret, (err, decodedToken) => {
			if (err) {
				logger.statusCode = statusCodes.UNAUTHORIZED;
				logger.warn(`${getKeyByValue(statusCodes, statusCodes.UNAUTHORIZED)} - TOKEN INVALID`);
				res.status(statusCodes.UNAUTHORIZED).json({ message: 'Invalid token' });
			} else {
				logger.statusCode = null;
				logger.info(`TOKEN SUCCESSFULLY VALIDATED`);
				req.token = decodedToken as JWTToken;
				next();
			}
		});
	} else {
		logger.statusCode = statusCodes.UNAUTHORIZED;
		logger.warn(`${getKeyByValue(statusCodes, statusCodes.UNAUTHORIZED)} - NO TOKEN PROVIDED`);
		res.status(statusCodes.UNAUTHORIZED).json({ message: 'Please provide a token' });
	}
};

export { requireToken };
