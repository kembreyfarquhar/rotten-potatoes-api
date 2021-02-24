import { ControllerTypeValues } from '../../enums/controllerTypes';

type ServerRouteType = {
	method: string;
	route: string;
	controller: ControllerTypeValues;
	action: string;
	middleware: any;
};

export { ServerRouteType };
