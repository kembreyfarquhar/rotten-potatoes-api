import { colors } from '../services/cliColorService';

const logColors = {
	DATE(s: string) {
		return colors.multiple(['bold', 'underline'], s);
	},
	INFO: colors.green,
	DEBUG: colors.cyan,
	WARN: colors.bright_yellow,
	ERROR: colors.bright_red,
	ROUTE: colors.bold,
	METHOD: colors.blue,
	SUCCESS: colors.bright_green,
	MESSAGE: colors.italic,
	BLACK: colors.black,
} as const;

export { logColors };
