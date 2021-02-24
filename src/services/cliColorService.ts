import { Colors, ColorKeys } from '../enums/cliColors';
import { getEnumValue } from '../utils/getEnumValue';

type ColorType = {
	[key: string]: Function;
};

const colors: ColorType = {};

function init() {
	for (let key in Colors) {
		colors[key] = function (s: string) {
			if (typeof s !== 'string') {
				throw new TypeError('Expected a string');
			}
			const value = getEnumValue(Colors, key);
			return `${value}${s}${Colors.reset}`;
		};
	}
}

init();

colors.multiple = (arr: ColorKeys[], s: string) => {
	const values = arr.map(key => getEnumValue(Colors, key));
	return `${values.join('')}${s}${Colors.reset}`;
};

export { colors };
