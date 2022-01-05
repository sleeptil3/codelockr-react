// APP STATE ACTION CREATORS

export const APP_ACTION_LOGIN = payload => {
	return { type: "LOGIN", payload }
}

export const APP_ACTION_LOGOUT = () => {
	return { type: "LOGOUT" }
}

export const APP_ACTION_TOGGLE_REGISTRATION = value => {
	return { type: "TOGGLE_REGISTRATION", payload: value }
}

export const APP_ACTION_SET_SUBMIT_MODE = value => {
	return { type: "SET_SUBMIT_MODE", payload: value }
}

export const APP_ACTION_SET_FOLDER_FILTER = value => {
	return { type: "SET_FOLDER_FILTER", payload: value }
}

export const APP_ACTION_CLEAR_FOLDER_FILTER = () => {
	return { type: "SET_FOLDER_FILTER", payload: "" }
}

export const APP_ACTION_SET_SNIPPET_FORM = snippetData => {
	return { type: "SET_SNIPPET_FORM", payload: snippetData }
}

export const APP_ACTION_CLEAR_SNIPPET_FORM = () => {
	return { type: "SET_SNIPPET_FORM" }
}

export const APP_ACTION_REFRESH_USER = () => {
	return { type: "REFRESH_USER" }
}

export const APP_ACTION_REFRESH_SNIPPETS = () => {
	return { type: "REFRESH_SNIPPETS" }
}

export const APP_ACTION_SET_SNIPPETS = userSnippets => {
	return { type: "SET_SNIPPETS", payload: userSnippets }
}

export const APP_ACTION_SET_FRIEND_SNIPPETS = friendSnippets => {
	return { type: "SET_FRIEND_SNIPPETS", payload: friendSnippets }
}

export const APP_ACTION_UPDATE_USER = userData => {
	return { type: "UPDATE_USER", payload: userData }
}
