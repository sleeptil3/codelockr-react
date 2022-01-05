import { createContext, useEffect } from "react"
import { Route, Routes } from "react-router-dom"
import { useImmerReducer } from "use-immer"

import { INITIAL_APP_STATE } from "./common/constants"
import {
	APP_ACTION_LOGIN,
	APP_ACTION_REFRESH_SNIPPETS,
	APP_ACTION_SET_FRIEND_SNIPPETS,
	APP_ACTION_SET_SNIPPETS,
	APP_ACTION_UPDATE_USER,
} from "./state/actions"

import { appStateImmerReducer } from "./state/reducer"
import { getLocalStorage, objectHasData } from "./utils"

import Landing from "./containers/Landing"
import Admin from "./containers/Admin"
import User from "./containers/User"
import { getAllSnippets, getFriendSnippets, getUserData } from "./common/api"

export const AppContext = createContext()

export default function App() {
	// App State Setup
	const [appState, dispatchAppState] = useImmerReducer(appStateImmerReducer, INITIAL_APP_STATE)
	const appContextValue = { appState, dispatchAppState }
	const { username, token, userData } = appState

	// Get Previously Logged-In User, if applicable
	useEffect(() => {
		console.log("CURRENT LOCAL STORAGE RAN")
		const currentLocalStorage = getLocalStorage(["username", "token"])
		if (currentLocalStorage) dispatchAppState(APP_ACTION_LOGIN(currentLocalStorage))
	}, [dispatchAppState])

	// Init or refresh User Data
	useEffect(() => {
		console.log("INIT USER DATA RAN")
		const loadUserInfo = async (username, token) => {
			const userInfo = await getUserData(username, token)
			dispatchAppState(APP_ACTION_UPDATE_USER(userInfo))
			dispatchAppState(APP_ACTION_REFRESH_SNIPPETS())
		}
		!!username && loadUserInfo(username, token)
	}, [appState.refreshUser, username, token])

	// Init or Refresh Snippet Data (user and friends)
	useEffect(() => {
		console.log("INIT SNIPPET DATA RAN")
		const loadSnippets = async (username, token) => {
			const allUserSnippets = await getAllSnippets(username, token, userData._id)
			const allFriendSnippets = await getFriendSnippets(username, token)
			dispatchAppState(APP_ACTION_SET_SNIPPETS(allUserSnippets))
			dispatchAppState(APP_ACTION_SET_FRIEND_SNIPPETS(allFriendSnippets))
		}
		objectHasData(userData) && loadSnippets(username, token)
	}, [appState.refreshSnippets])

	console.log("AppState", appState)
	return (
		<div>
			<AppContext.Provider value={appContextValue}>
				<Routes>
					<Route path="/admin/*" element={<Admin />} />
					<Route path="/user/*" element={<User />} />
					<Route index path="/" element={<Landing />} />
				</Routes>
			</AppContext.Provider>
		</div>
	)
}
