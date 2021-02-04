import colors from 'colors';

const LOG_COLORS = {
  DATE: colors.bold,
  INFO: colors.cyan,
  DEBUG: colors.magenta,
  WARN: colors.yellow,
  ERROR: colors.red,
  ROUTE: colors.bold,
  METHOD: colors.yellow,
  SUCCESS: colors.green,
  MESSAGE: colors.italic,
} as const;

export { LOG_COLORS };
