import { LOG_TYPE_KEYS } from '../../enums/logTypes';
import { STATUS_CODES_VALUES } from '../../enums/StatusCodes';
import { HTTP_METHODS_VALUES } from '../../enums/httpMethods';

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
