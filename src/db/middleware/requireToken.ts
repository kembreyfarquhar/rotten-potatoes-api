import { RequestHandler } from 'express';
import jsonwebtoken from 'jsonwebtoken';
import { loggerRoutes } from '../../enums/loggerRouteTypes';
import { statusCodes } from '../../enums/statusCodes';
import { handleFailure } from '../../utils/handleMiddlewareFailure';
import { JWTToken } from '../../types/jwt';

const secret = process.env.JWT_SECRET || 'secret';

const requireToken: RequestHandler = (req, res, next) => {
	const token = req.headers.authorization;
	const status = statusCodes.get('UNAUTHORIZED').status;
	const label = statusCodes.get('UNAUTHORIZED').label;
	const route = loggerRoutes.get('TOKEN_AUTHENTICATION');

	if (token) {
		jsonwebtoken.verify(token, secret, (err, decodedToken) => {
			if (err) {
				return handleFailure(req, res, status, 'invalid token', label, route);
			} else {
				req.token = decodedToken as JWTToken;
				next();
			}
		});
	} else {
		return handleFailure(req, res, status, 'no token provided', label, route);
	}
};

export { requireToken };
