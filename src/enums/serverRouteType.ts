import { CONTROLLER_TYPES_VALUES } from './controllerTypes';
import { HTTPMethodValues } from './httpMethods';

type ServerRouteType = {
	method: HTTPMethodValues;
	route: string;
	controller: CONTROLLER_TYPES_VALUES;
	action: string;
	middleware: any;
};

export { ServerRouteType };
