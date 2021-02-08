import { LogTypeKeys } from '../../enums/logTypes';
import { StatusCodeValues } from '../../enums/StatusCodes';
import { HTTPMethodValues } from '../../enums/httpMethods';

export type FormatParams = {
	logType: LogTypeKeys;
	info: any;
	path: string;
	method: HTTPMethodValues;
	host: string;
	userAgent: string;
	statusCode: StatusCodeValues;
	log_data: any;
};
