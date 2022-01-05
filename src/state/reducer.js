// APP STATE REDUCER

import { DEFAULT_SNIPPET_FORM } from "../common/constants"

export const appStateImmerReducer = (draft, action) => {
	switch (action.type) {
		case "LOGIN": {
			draft.loggedIn = true
			draft.isAdmin = action.payload.username === "admin" ? true : false
			draft.username = action.payload.username
			draft.token = action.payload.token
			break
		}
		case "LOGOUT": {
			draft.loggedIn = false
			draft.isAdmin = false
			draft.username = null
			draft.token = null
			break
		}
		case "TOGGLE_REGISTRATION": {
			draft.showRegistration = action.payload
			break
		}
		case "SET_SUBMIT_MODE": {
			draft.submitMode = action.payload
			break
		}
		case "SET_FOLDER_FILTER": {
			draft.folderFilter = action.payload
			break
		}
		case "CLEAR_FOLDER_FILTER": {
			draft.folderFilter = ""
			break
		}
		case "SET_SNIPPET_FORM": {
			draft.snippetForm = action.payload
			break
		}
		case "CLEAR_SNIPPET_FORM": {
			draft.snippetForm = DEFAULT_SNIPPET_FORM
			break
		}
		case "REFRESH_USER": {
			draft.refreshUser = !draft.refreshUser
			break
		}
		case "REFRESH_SNIPPETS": {
			draft.refreshSnippets = !draft.refreshSnippets
			break
		}
		case "SET_SNIPPETS": {
			draft.snippets = action.payload
			break
		}
		case "SET_FRIEND_SNIPPETS": {
			draft.friendSnippets = action.payload
			break
		}
		case "UPDATE_USER": {
			draft.userData = action.payload
			break
		}
		default:
			console.log("Unknown action received by appState reducer")
			break
	}
}
