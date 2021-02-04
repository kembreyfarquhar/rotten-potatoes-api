import { CONTROLLER_TYPES_VALUES } from './CONTROLLER_TYPES';
import { HTTP_METHODS_VALUES } from './HTTP_METHODS';

type ROUTE_TYPE = {
  method: HTTP_METHODS_VALUES;
  route: string;
  controller: CONTROLLER_TYPES_VALUES;
  action: string;
  middleware: any;
};

export { ROUTE_TYPE };
