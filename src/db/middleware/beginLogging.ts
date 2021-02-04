import { Request, Response, NextFunction } from 'express';
import { HTTP_METHODS_VALUES } from '../../enums/HTTP_METHODS';
import { LoggerService } from '../../services/loggerService';
import { getLoggerRoute } from '../../utils/getLoggerRoute';

const beginLoggingMW = (req: Request, res: Response, next: NextFunction) => {
  const ROUTE = getLoggerRoute(req.originalUrl);

  const logger = new LoggerService(
    ROUTE,
    req.originalUrl,
    req.method as HTTP_METHODS_VALUES,
    req.headers.host,
    req.headers['user-agent']
  );

  logger.info(`BEGINNING ${req.method} - ${ROUTE}`, req.body);
  next();
};

export { beginLoggingMW };
