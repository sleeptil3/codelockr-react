export const getLocalStorage = keysArr => {
	const obj = {}
	for (const key of keysArr) {
		const value = localStorage.getItem(key)
		if (value) obj[key] = value
		else return null
	}
	return obj
}

export const setLocalStorage = obj => {
	for (const [key, value] of Object.entries(obj)) {
		localStorage.setItem(key, value)
	}
}

export const isEmptyObject = obj => {
	if (!obj) return undefined
	return !!Object.keys(obj).length
}

export const objectHasData = obj => {
	if (!obj || obj === null) return undefined
	return !!(Object.keys(obj).length > 0)
}
