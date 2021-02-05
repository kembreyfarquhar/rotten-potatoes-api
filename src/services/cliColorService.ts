import { COLORS, lower_color_keys } from '../enums/cliColors';

type ColorType = {
	[key: string]: Function;
};

const colors: ColorType = {};

function init() {
	for (let key in COLORS) {
		// if (key === 'reset') continue;
		colors[key.toLowerCase()] = function (s: string) {
			if (typeof s !== 'string') {
				throw new TypeError('Expected a string');
			}
			return `${COLORS[key]}${s}${COLORS.RESET}`;
		};
	}
}

init();

colors.multiple = (arr: lower_color_keys[], s: string) => {
	const upper_keys = arr.map(key => key.toUpperCase());
	const values = upper_keys.map(key => COLORS[key]);
	return `${values.join('')}${s}${COLORS.RESET}`;
};

export { colors };
