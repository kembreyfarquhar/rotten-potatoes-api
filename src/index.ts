import { app } from './app';
import { AddressInfo } from 'net';
import { LoggerService } from './services/loggerService';
import { loggerRoutes } from './enums/loggerRouteTypes';

const server = app.listen(5000, '127.0.0.1', () => {
	const { port, address } = server.address() as AddressInfo;
	const logger = new LoggerService(loggerRoutes.get('BASE'));

	logger.info(`*** SERVER LISTENING ON: http://${address}:${port}\n`);
});
