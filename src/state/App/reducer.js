export const appStateImmerReducer = (draft, action) => {
	switch (action.type) {
		case "TOGGLE_REGISTRATION": {
			draft.showRegistration = action.payload
			break
		}
		case "LOGOUT": {
			draft.loggedIn = false
			draft.isAdmin = false
			draft.username = null
			draft.token = null
			break
		}
		case "LOGIN": {
			draft.loggedIn = true
			draft.isAdmin = action.payload.username === "admin" ? true : false
			draft.username = action.payload.username
			draft.token = action.payload.token
			break
		}
		default:
			break
	}
}
