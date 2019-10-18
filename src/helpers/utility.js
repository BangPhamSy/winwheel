export const arrayToObject = (array, keyField) =>
	array.reduce((obj, item) => {
		obj[item[keyField]] = item
		return obj
	}, {})

export const objectToArray = (obj) => Object.keys(obj).map((i) => obj[i])

export const removeProperty = (obj, property) => {
	return Object.keys(obj).reduce((acc, key) => {
		if (key !== property) {
			return { ...acc, [key]: obj[key] }
		}
		return acc
	}, {})
}

export const stringToBoolean = (string) => {
	if (string == null || string === "") return false

	switch (string.toLowerCase().trim()) {
		case "true":
		case "yes":
		case "1":
			return true
		case "false":
		case "no":
		case "0":
		case null:
			return false
		default:
			return Boolean(string)
	}
}
