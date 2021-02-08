const logTypes = {
	console: 'console',
	file: 'file',
} as const;

type LogType = {
	console: 'console';
	file: 'file';
};

type LogTypeKeys = keyof LogType;
type LogTypeValues = LogType[LogTypeKeys];

export { logTypes, LogTypeKeys, LogTypeValues };
