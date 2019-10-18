export const isEmpty = (value) => value === undefined || value === null || value === ""
export const isObject = (obj) =>
	obj !== undefined &&
	obj !== null &&
	Object.keys(obj).length > 0 &&
	obj.constructor === Object
export const isEmptyObj = (obj) =>
	obj === undefined ||
	obj === null ||
	(Object.keys(obj).length === 0 && obj.constructor === Object)
const join = (rules) => (value, data) =>
	rules.map((rule) => rule(value, data)).filter((error) => !!error)[0 /* first error */]

export function email(value) {
	if (!isEmpty(value) && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
		return "_shared.form.validate._emailIsNotValid"
	}
}

export function validAddress(value) {
	if (isEmptyObj(value)) return true
	if (!isEmpty(value.address1)) return noVnChars(value.address1)
	return true
}

export function password(value) {
	if (!isEmpty(value) && !/^(?=.*[a-zA-Z])(?=.*\d).{8,}$/.test(value)) {
		return "_shared.form.validate._passwordIsNotValid"
	}
}

export function noSpecialChars(value) {
	if (!isEmpty(value) && !/^[a-zA-Z0-9 ]*$/.test(value)) {
		return "_shared.form.validate._noSpecialChars"
	}
}

export function noVnChars(value) {
	if (!isEmpty(value) && !/^[\u0000-\u007F ]*$/.test(value)) {
		return "_shared.form.validate._noVnChars"
	}
}

export function required(value) {
	if (typeof value === typeof true && !value) {
		return "_shared.form.validate._required"
	}
	if (isEmpty(value)) {
		return "_shared.form.validate._required"
	}
}

export function minLength(min) {
	return (value) => {
		if (!isEmpty(value) && value.length < min) {
			return "_shared.form.validate._minLength"
		}
	}
}

export function maxLength(max) {
	return (value) => {
		if (!isEmpty(value) && value.length > max) {
			return "_shared.form.validate._maxLength"
		}
	}
}

export function fixedLength(fxlen) {
	return (value) => {
		if (!isEmpty(value) && value.length !== fxlen) {
			return "_shared.form.validate._fixedLength"
		}
	}
}

export function integer(value) {
	if (!Number.isInteger(Number(value))) {
		return "_shared.form.validate._integer"
	}
}

export function oneOf(enumeration) {
	return (value) => {
		if (!~enumeration.indexOf(value)) {
			return `Must be one of: ${enumeration.join(", ")}`
		}
	}
}

export function match(field) {
	return (value, data) => {
		if (data) {
			if (value !== data[field]) {
				return "_shared.form.validate._notMatch"
			}
		}
	}
}

export function allowedFileExtensions(fileExtensions) {
	return (value) => {
		if (!isValidFileExtension(value, fileExtensions))
			return "_shared.form.validate._allowFileExtensions"
	}
}

export function isValidFileExtension(value, allowedFileExtensions) {
	if (!value || !value.name) return true

	const fileExt = value.name
		.split(".")
		.pop()
		.toLowerCase()

	if (!allowedFileExtensions.includes(fileExt)) {
		return false
	}
	return true
}

export function maxFileSize(sizeInMB) {
	return (value) => {
		if (isMaxFileSize(value, sizeInMB)) {
			return "_shared.form.validate._moreThanMaxFileSize"
		}
	}
}

export function isMaxFileSize(value, sizeInMB) {
	if (!value || !value.size) return false

	const maxSizeInBytes = sizeInMB * 1000000

	if (value.size > maxSizeInBytes) {
		return true
	}
	return false
}

// Validates that the input string is a valid date formatted as "dd/mm/yyyy"
export function isValidDate(dateString) {
	// First check for the pattern
	if (!/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(dateString))
		return "_shared.form.validate._invalidDate"

	// Parse the date parts to integers
	var parts = dateString.split("/")
	var day = parseInt(parts[0], 10)
	var month = parseInt(parts[1], 10)
	var year = parseInt(parts[2], 10)

	// Check the ranges of month and year
	if (year < 1000 || year > 3000 || month === 0 || month > 12)
		return "_shared.form.validate._invalidDate"

	var monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

	// Adjust for leap years
	if (year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0)) monthLength[1] = 29

	// Check the range of the day
	if (!(day > 0 && day <= monthLength[month - 1]))
		return "_shared.form.validate._invalidDate"
}

export function transformToFormErrors(errors) {
	if (!errors || !errors.length === 0) return

	return errors.reduce((result, error, index) => {
		if (error.fieldName.includes(".")) {
			const parts = error.fieldName.split(".")
			if (!result[parts[0]]) result[parts[0]] = {}
			result[parts[0]] = { ...result[parts[0]], [parts[1]]: error.errorMessage }
		} else {
			result[error.fieldName] = error.errorMessage
		}
		return result
	}, {})
}

export function createValidator(rules) {
	return (data = {}) => {
		const errors = {}
		Object.keys(rules).forEach((key) => {
			if (isObject(rules[key])) {
				const _rules = rules[key]
				Object.keys(_rules).forEach((_key) => {
					const rule = join([].concat(_rules[_key]))
					const error = data[key] && rule(data[key][_key], data)

					if (error) {
						if (!errors[key]) errors[key] = {}
						errors[key] = { ...errors[key], [_key]: error }
					}
				})
			} else {
				const rule = join([].concat(rules[key])) // concat enables both functions and arrays of functions
				const error = rule(data[key], data)

				if (error) {
					errors[key] = error
				}
			}
		})
		return errors
	}
}
