import { Logger, createLogger, format, transports } from 'winston';
import colors from 'colors';
import { LOG_COLORS } from '../enums/LOG_COLORS';
import { HTTP_METHODS_VALUES } from '../enums/HTTP_METHODS';
import { STATUS_CODES_VALUES } from '../enums/STATUS_CODES';
import { LOGGER_ROUTE_VALUES } from '../enums/LOGGER_ROUTE_TYPES';
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
  if (infoLevel === 'INFO') infoColor = LOG_COLORS.INFO;
  else if (infoLevel === 'DEBUG') infoColor = LOG_COLORS.DEBUG;
  else if (infoLevel === 'WARN') infoColor = LOG_COLORS.WARN;
  else if (infoLevel === 'ERROR') infoColor = LOG_COLORS.ERROR;
  else infoColor = colors.black;

  let statusColor;
  if (statusCode && statusCode < 300) statusColor = LOG_COLORS.SUCCESS;
  else if (statusCode && statusCode < 500 && statusCode > 399) statusColor = LOG_COLORS.WARN;
  else if (statusCode && statusCode > 499) statusColor = LOG_COLORS.ERROR;
  else statusColor = colors.black;

  const dateMsg =
    logType === 'console' ? LOG_COLORS.DATE(`[${dateFormat()}]`) : `[${dateFormat()}]`;

  const levelMsg = logType === 'console' ? infoColor(`${infoLevel}`) : `${infoLevel}`;

  const agentMsg = userAgent ? `${userAgent}` : '';

  const hostMsg = host ? `${host}` : '';

  const methodMsg =
    method && logType === 'console' ? LOG_COLORS.METHOD(`${method}`) : method ? `${method}` : '';

  const pathMsg =
    path && logType === 'console'
      ? LOG_COLORS.ROUTE(`endpoint: "${path}"`)
      : path
      ? `endpoint: "${path}"`
      : '';

  const statusMsg =
    statusCode && logType === 'console'
      ? statusColor(`status: ${statusCode}`)
      : statusCode
      ? `status: ${statusCode}`
      : '';

  const messageMsg =
    logType === 'console' ? LOG_COLORS.MESSAGE(`${info.message}`) : `${info.message}`;

  const objMsg = info.obj && Object.keys(info.obj).length > 0 ? `data: ${obj}` : '';

  const dataMsg = log_data ? `log_data: ${formatObject(log_data)}` : '';

  const message = [
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
  ].join(' | ');

  return message;
}

export class LoggerService {
  log_data: any;
  route: LOGGER_ROUTE_VALUES;
  path: string;
  logger: Logger;
  method: HTTP_METHODS_VALUES;
  host: string;
  userAgent: string;
  statusCode: STATUS_CODES_VALUES;

  constructor(
    route: LOGGER_ROUTE_VALUES,
    path: string = null,
    method: HTTP_METHODS_VALUES = null,
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

  async error(message: any, obj: any = null) {
    if (!obj) this.logger.log('error', message);
    else {
      this.logger.log('error', message, { obj });
    }
  }
}
