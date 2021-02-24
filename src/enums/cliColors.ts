enum Colors {
	reset = '\u001b[0m',
	black = '\u001b[30m',
	red = '\u001b[31m',
	green = '\u001b[32m',
	yellow = '\u001b[33m',
	blue = '\u001b[34m',
	magenta = '\u001b[35m',
	cyan = '\u001b[36m',
	white = '\u001b[37m',
	bright_black = '\u001b[30;1m',
	bright_red = '\u001b[31;1m',
	bright_green = '\u001b[32;1m',
	bright_yellow = '\u001b[33;1m',
	bright_blue = '\u001b[34;1m',
	bright_magenta = '\u001b[35;1m',
	bright_cyan = '\u001b[36;1m',
	bright_white = '\u001b[37;1m',
	bold = '\u001b[1m',
	italic = '\u001b[3m',
	underline = '\u001b[4m',
	reversed = '\u001b[7m',
}

type ColorKeys =
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

export { Colors, ColorKeys };
