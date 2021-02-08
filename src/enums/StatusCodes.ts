const statusCodes = {
	OK: 200,
	CREATED: 201,
	BAD_REQUEST: 400,
	UNAUTHORIZED: 401,
	NOT_FOUND: 404,
	SERVER_ERROR: 500,
} as const;

type StatusCodeTypes = {
	OK: 200;
	CREATED: 201;
	BAD_REQUEST: 400;
	UNAUTHORIZED: 401;
	NOT_FOUND: 404;
	SERVER_ERROR: 500;
};

type StatusCodeKeys = keyof StatusCodeTypes;
type StatusCodeValues = StatusCodeTypes[StatusCodeKeys];

export { statusCodes, StatusCodeKeys, StatusCodeValues };
