export const appStateReducer = (state, action) => {
	switch (action.type) {
		case "TOGGLE_REGISTRATION": {
			return { ...state, showRegistration: action.payload }
		}
		case "LOGOUT": {
			return {
				...state,
				loggedIn: false,
				isAdmin: false,
				username: null,
				firstName: "",
				lastName: "",
				token: null,
			}
		}
		case "LOGIN": {
			return {
				...state,
				loggedIn: true,
				isAdmin: action.payload.username === "admin" ? true : false,
				username: action.payload.username,
				token: action.payload.token,
				firstName: action.payload.firstName || state.firstName,
				lastName: action.payload.lastName || state.firstName,
			}
		}
		default:
			return { ...state }
	}
}
