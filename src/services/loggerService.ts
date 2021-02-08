import { Logger, createLogger, format, transports } from 'winston';
import { logColors } from '../enums/logColors';
import { HTTPMethodValues } from '../enums/httpMethods';
import { STATUS_CODES_VALUES } from '../enums/StatusCodes';
import { LOGGER_ROUTE_VALUES } from '../enums/loggerRouteTypes';
import { FormatParams } from '../types/logger';

const { combine, printf } = format;

const dateFormat = () => {
	return new Date().toLocaleString();
};

const formatObject = (param: any) => {
	if (typeof param === 'string') {
		return param;
	}

	if (param instanceof Error || typeof param === 'object') {
		return param.stack ? param.stack : JSON.stringify(param, null, 2);
	}

	return JSON.stringify(param, null, 2);
};

function logFormat(params: FormatParams) {
	let {
		info,
		logType,
		path = null,
		method = null,
		host = null,
		userAgent = null,
		statusCode = null,
		log_data = null,
	} = params;

	const infoLevel = info.level.toUpperCase();

	const obj = info.stack ? formatObject(info.stack) : info.obj ? formatObject(info.obj) : null;

	let infoColor;
	if (infoLevel === 'INFO') infoColor = logColors.INFO;
	else if (infoLevel === 'DEBUG') infoColor = logColors.DEBUG;
	else if (infoLevel === 'WARN') infoColor = logColors.WARN;
	else if (infoLevel === 'ERROR') infoColor = logColors.ERROR;
	else infoColor = logColors.BLACK;

	let statusColor;
	if (statusCode && statusCode < 300) statusColor = logColors.SUCCESS;
	else if (statusCode && statusCode < 500 && statusCode > 399) statusColor = logColors.WARN;
	else if (statusCode && statusCode > 499) statusColor = logColors.ERROR;
	else statusColor = logColors.BLACK;

	const dateMsg = logType === 'console' ? logColors.DATE(`[${dateFormat()}]`) : `[${dateFormat()}]`;

	const levelMsg = logType === 'console' ? infoColor(`${infoLevel}`) : `${infoLevel}`;

	const agentMsg = userAgent ? `${userAgent}` : undefined;

	const hostMsg = host ? `${host}` : undefined;

	const methodMsg =
		method && logType === 'console'
			? logColors.METHOD(`${method.toUpperCase()}`)
			: method
			? `${method.toUpperCase()}`
			: undefined;

	const pathMsg =
		path && logType === 'console'
			? logColors.ROUTE(`endpoint: "${path}"`)
			: path
			? `endpoint: "${path}"`
			: undefined;

	const statusMsg =
		statusCode && logType === 'console'
			? statusColor(`status: ${statusCode}`)
			: statusCode
			? `status: ${statusCode}`
			: undefined;

	const messageMsg =
		logType === 'console' ? logColors.MESSAGE(`${info.message}`) : `${info.message}`;

	const objMsg = info.obj && Object.keys(info.obj).length > 0 ? `\ndata: ${obj}` : undefined;

	const dataMsg = log_data ? `\nlog_data: ${formatObject(log_data)}` : undefined;

	const messageArr = [
		dateMsg,
		levelMsg,
		agentMsg,
		hostMsg,
		methodMsg,
		pathMsg,
		statusMsg,
		messageMsg,
		objMsg,
		dataMsg,
	];

	const filteredMsgs = messageArr.filter(msg => typeof msg != 'undefined');

	const message = filteredMsgs.join(' | ');

	return `\n${message}\n`;
}

export class LoggerService {
	log_data: any;
	route: LOGGER_ROUTE_VALUES;
	path: string;
	logger: Logger;
	method: HTTPMethodValues;
	host: string;
	userAgent: string;
	statusCode: STATUS_CODES_VALUES;

	constructor(
		route: LOGGER_ROUTE_VALUES,
		path: string = null,
		method: HTTPMethodValues = null,
		host: string = null,
		userAgent: string = null,
		statusCode: STATUS_CODES_VALUES = null
	) {
		this.log_data = null;
		this.route = route;
		this.path = path;
		this.method = method;
		this.host = host;
		this.userAgent = userAgent;
		this.statusCode = statusCode;

		const logger = createLogger({
			transports: [
				new transports.Console({
					format: combine(
						printf(info => {
							return logFormat({
								info,
								logType: 'console',
								path,
								method,
								host,
								userAgent,
								statusCode: this.statusCode,
								log_data: this.log_data,
							});
						})
					),
				}),
				new transports.File({
					filename: `./logs/${this.route}.log`,
					format: combine(
						printf(info => {
							return logFormat({
								info,
								logType: 'file',
								path,
								method,
								host,
								userAgent,
								statusCode: this.statusCode,
								log_data: this.log_data,
							});
						})
					),
				}),
			],
		});
		this.logger = logger;
	}

	setLogData(log_data: any) {
		this.log_data = log_data;
	}

	setStatusCode(statusCode: STATUS_CODES_VALUES) {
		this.statusCode = statusCode;
	}

	async info(message: any, obj: any = null) {
		if (!obj) this.logger.log('info', message);
		else {
			this.logger.log('info', message, {
				obj,
			});
		}
	}

	async debug(message: any, obj: any = null) {
		if (!obj) this.logger.log('debug', message);
		else {
			this.logger.log('debug', message, { obj });
		}
	}

	async warn(message: any, obj: any = null) {
		if (!obj) this.logger.log('warn', message);
		else {
			this.logger.log('warn', message, { obj });
		}
	}

	async error(message: any, obj: any = null) {
		if (!obj) this.logger.log('error', message);
		else {
			this.logger.log('error', message, { obj });
		}
	}
}
