import { Logger, QueryRunner } from 'typeorm';
import { createLogger, Logger as WinstonLogger, transports, format } from 'winston';
import { LOG_COLORS } from '../enums/LOG_COLORS';
import colors from 'colors';

const dateFormat = () => {
  return new Date(Date.now()).toUTCString();
};

export class QueryLogger implements Logger {
  private readonly queryLogger: WinstonLogger;
  private readonly schemaLogger: WinstonLogger;
  private readonly basicLogger: WinstonLogger;
  private readonly customFormat: any;
  constructor() {
    this.customFormat = format.printf(({ level, message, label, timestamp }) => {
      let levelColor;
      if (level === 'log' || level === 'debug') levelColor = LOG_COLORS.DEBUG;
      else if (level === 'info') levelColor = LOG_COLORS.INFO;
      else if (level === 'warn') levelColor = LOG_COLORS.ERROR;
      else levelColor = colors.black;
      return (
        '\n\n' +
        LOG_COLORS.DATE(`${timestamp}`) +
        `[${label}] ` +
        levelColor(`${level}`) +
        ':' +
        LOG_COLORS.MESSAGE(`${message}`)
      );
    });
    const options = (filename: string) => ({
      transports: [
        new transports.Console(),
        new transports.File({
          filename,
          level: 'debug',
        }),
      ],
      format: this.customFormat,
    });
    this.queryLogger = createLogger(options('./logs/query.log'));
    this.schemaLogger = createLogger(options('./logs/schema.log'));
    this.basicLogger = createLogger(options('./logs/basic.log'));
  }
  logQuery(query: string, parameters?: any[], queryRunner?: QueryRunner) {
    this.queryLogger.log({
      level: 'debug',
      message: `${query} - ${JSON.stringify(parameters)}`,
      timestamp: dateFormat(),
      label: 'query',
    });
  }

  logQueryError(error: string, query: string, parameters?: any[], queryRunner?: QueryRunner) {
    this.queryLogger.log({
      level: 'warn',
      message: `${query} - ${JSON.stringify(parameters)}\nERROR: ${error}`,
      timestamp: dateFormat(),
      label: 'queryError',
    });
  }

  logQuerySlow(time: number, query: string, parameters?: any[], queryRunner?: QueryRunner) {
    throw new Error('Method not implemented.');
  }

  logSchemaBuild(message: string, queryRunner?: QueryRunner) {
    this.schemaLogger.log({
      level: 'debug',
      message,
      timestamp: dateFormat(),
      label: 'schema',
    });
  }

  logMigration(message: string, queryRunner?: QueryRunner) {
    throw new Error('Method not implemented.');
  }

  log(level: 'log' | 'info' | 'warn', message: any, queryRunner?: QueryRunner) {
    this.basicLogger.log({
      level,
      message,
      timestamp: dateFormat(),
      label: 'basic',
    });
  }
}
