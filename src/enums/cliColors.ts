type COLOR_TYPE = {
	[key: string]: string;
};

const COLORS: COLOR_TYPE = {
	RESET: '\u001b[0m',
	BLACK: '\u001b[30m',
	RED: '\u001b[31m',
	GREEN: '\u001b[32m',
	YELLOW: '\u001b[33m',
	BLUE: '\u001b[34m',
	MAGENTA: '\u001b[35m',
	CYAN: '\u001b[36m',
	WHITE: '\u001b[37m',
	BRIGHT_BLACK: '\u001b[30;1m',
	BRIGHT_RED: '\u001b[31;1m',
	BRIGHT_GREEN: '\u001b[32;1m',
	BRIGHT_YELLOW: '\u001b[33;1m',
	BRIGHT_BLUE: '\u001b[34;1m',
	BRIGHT_MAGENTA: '\u001b[35;1m',
	BRIGHT_CYAN: '\u001b[36;1m',
	BRIGHT_WHITE: '\u001b[37;1m',
	BOLD: '\u001b[1m',
	ITALIC: '\u001b[3m',
	UNDERLINE: '\u001b[4m',
	REVERSED: '\u001b[7m',
};

type lower_color_keys =
	| 'black'
	| 'red'
	| 'green'
	| 'yellow'
	| 'blue'
	| 'magenta'
	| 'cyan'
	| 'white'
	| 'bright_black'
	| 'bright_red'
	| 'bright_green'
	| 'bright_yellow'
	| 'bright_blue'
	| 'bright_magenta'
	| 'bright_cyan'
	| 'bright_white'
	| 'bold'
	| 'italic'
	| 'underline'
	| 'reversed';

export { COLORS, lower_color_keys };
