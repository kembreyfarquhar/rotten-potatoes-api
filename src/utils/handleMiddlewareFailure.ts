import { Request, Response } from 'express';
import { LoggerService } from '../services/loggerService';

const handleFailure = (req: Request, res: Response, status: number, msg: string | { [type: string]: string }[], label: string, route: string) => {
	const logger = new LoggerService(route, req.originalUrl, req.method, req.headers['host'], req.headers['user-agent'], status);
	logger.warn(`${label} - ${typeof msg === 'string' ? msg.toUpperCase() : msg}`);
	res.status(status).json({ msg });
};

export { handleFailure };
