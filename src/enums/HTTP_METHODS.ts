type HTTP_METHODS_TYPE = {
  GET: 'get';
  POST: 'post';
  PUT: 'put';
  DELETE: 'delete';
};

const HTTP_METHODS: HTTP_METHODS_TYPE = {
  GET: 'get',
  POST: 'post',
  PUT: 'put',
  DELETE: 'delete',
} as const;

type HTTP_METHODS_KEYS = keyof HTTP_METHODS_TYPE;
type HTTP_METHODS_VALUES = HTTP_METHODS_TYPE[HTTP_METHODS_KEYS];

export { HTTP_METHODS, HTTP_METHODS_KEYS, HTTP_METHODS_VALUES };
