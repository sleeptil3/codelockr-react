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
