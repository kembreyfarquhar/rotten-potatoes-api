import { ControllerTypeValues } from './controllerTypes';
import { HTTPMethodValues } from './httpMethods';

type ServerRouteType = {
	method: HTTPMethodValues;
	route: string;
	controller: ControllerTypeValues;
	action: string;
	middleware: any;
};

export { ServerRouteType };
