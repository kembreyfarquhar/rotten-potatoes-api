const LOG_TYPES = {
	console: 'console',
	file: 'file',
} as const;

type LogType = {
	console: typeof LOG_TYPES.console;
	file: typeof LOG_TYPES.file;
};

type LOG_TYPE_KEYS = keyof LogType;
type LOG_TYPE_VALUES = LogType[LOG_TYPE_KEYS];

export { LOG_TYPES, LOG_TYPE_KEYS, LOG_TYPE_VALUES };
