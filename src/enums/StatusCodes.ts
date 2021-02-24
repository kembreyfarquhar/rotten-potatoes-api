import { Map } from 'immutable';

const statusCodes = Map({
	OK: { status: 200, label: 'OK' },
	CREATED: { status: 201, label: 'CREATED' },
	BAD_REQUEST: { status: 400, label: 'BAD REQUEST' },
	UNAUTHORIZED: { status: 401, label: 'UNAUTHORIZED' },
	NOT_FOUND: { status: 404, label: 'NOT FOUND' },
	SERVER_ERROR: { status: 500, label: 'SERVER ERROR' },
});

export { statusCodes };
