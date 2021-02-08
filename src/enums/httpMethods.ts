enum HTTPMethods {
	GET = 'get',
	POST = 'post',
	PUT = 'put',
	DELETE = 'delete',
}

type HTTPMethodTypes = {
	GET: 'get';
	POST: 'post';
	PUT: 'put';
	DELETE: 'delete';
};

type HTTPMethodKeys = keyof HTTPMethodTypes;
type HTTPMethodValues = HTTPMethodTypes[HTTPMethodKeys];

export { HTTPMethods, HTTPMethodKeys, HTTPMethodValues };
