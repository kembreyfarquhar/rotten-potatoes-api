import { CONTROLLER_TYPES_VALUES } from './controllerTypes';
import { HTTP_METHODS_VALUES } from './httpMethods';

type ServerRouteType = {
	method: HTTP_METHODS_VALUES;
	route: string;
	controller: CONTROLLER_TYPES_VALUES;
	action: string;
	middleware: any;
};

export { ServerRouteType };
