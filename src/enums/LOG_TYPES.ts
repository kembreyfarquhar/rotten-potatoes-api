type LOG_TYPE = {
  console: 'console';
  file: 'file';
};

const LOG_TYPES = {
  console: 'console',
  file: 'file',
} as const;

type LOG_TYPE_KEYS = keyof LOG_TYPE;
type LOG_TYPE_VALUES = LOG_TYPE[LOG_TYPE_KEYS];

export { LOG_TYPES, LOG_TYPE_KEYS, LOG_TYPE_VALUES };
