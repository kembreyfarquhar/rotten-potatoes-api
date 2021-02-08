import { LOG_TYPE_KEYS } from '../../enums/logTypes';
import { STATUS_CODES_VALUES } from '../../enums/StatusCodes';
import { HTTPMethodValues } from '../../enums/httpMethods';

export type FormatParams = {
	logType: LOG_TYPE_KEYS;
	info: any;
	path: string;
	method: HTTPMethodValues;
	host: string;
	userAgent: string;
	statusCode: STATUS_CODES_VALUES;
	log_data: any;
};
