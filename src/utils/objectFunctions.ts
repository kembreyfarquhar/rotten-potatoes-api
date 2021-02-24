function objectHasOne(obj: object, arr: string[]) {
	let result = false;
	arr.forEach(element => {
		if (element in obj) result = true;
	});
	return result;
}

export { objectHasOne };
