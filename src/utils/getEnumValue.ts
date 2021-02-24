const getEnumValue = (e: object, k: string) => {
	const index = Object.keys(e).indexOf(k);
	const value = Object.values(e)[index];
	return value;
};

export { getEnumValue };
