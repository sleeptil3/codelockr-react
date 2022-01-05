import { handleLogin } from "../common/api"

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

export const handleGetLoginData = async formData => {
	const res = await handleLogin({ ...formData })
	if (res.error) {
		console.error("cannot find server", { error: res.error })
		return { error: res.error }
	} else {
		if (res.token && res.username) {
			const { username, token } = res
			setLocalStorage({ username, token })
			return { username, token }
		} else if (res.problem || res.msg) {
			console.error({ problem: res.problem, msg: res.msg })
			return { problem: res.problem, msg: res.msg }
		} else {
			console.error("Unknown error in handleGetLoginData")
			return undefined
		}
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
