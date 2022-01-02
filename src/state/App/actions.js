export const LOGIN = payload => {
	return { type: "LOGIN", payload }
}

export const LOGOUT = () => {
	return { type: "LOGOUT" }
}

export const TOGGLE_REGISTRATION = value => {
	return { type: "TOGGLE_REGISTRATION", payload: value }
}
