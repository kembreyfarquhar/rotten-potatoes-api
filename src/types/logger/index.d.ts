import { LOG_TYPE_KEYS } from '../../enums/LOG_TYPES';
import { STATUS_CODES_VALUES } from '../../enums/STATUS_CODES';
import { HTTP_METHODS_VALUES } from '../../enums/HTTP_METHODS';

export type FormatParams = {
  logType: LOG_TYPE_KEYS;
  info: any;
  path: string;
  method: HTTP_METHODS_VALUES;
  host: string;
  userAgent: string;
  statusCode: STATUS_CODES_VALUES;
  log_data: any;
};
