const HTTP_METHODS = {
	GET: 'get',
	POST: 'post',
	PUT: 'put',
	DELETE: 'delete',
} as const;

type HttpMethodTypes = {
	GET: typeof HTTP_METHODS.GET;
	POST: typeof HTTP_METHODS.POST;
	PUT: typeof HTTP_METHODS.PUT;
	DELETE: typeof HTTP_METHODS.DELETE;
};

type HTTP_METHODS_KEYS = keyof HttpMethodTypes;
type HTTP_METHODS_VALUES = HttpMethodTypes[HTTP_METHODS_KEYS];

export { HTTP_METHODS, HTTP_METHODS_KEYS, HTTP_METHODS_VALUES };
