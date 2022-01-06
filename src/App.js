import { createContext, useEffect } from "react"
import { Route, Routes } from "react-router-dom"
import { useImmerReducer } from "use-immer"

import { INITIAL_APP_STATE } from "./common/constants"
import {
	ACTION_LOGIN,
	ACTION_REFRESH_SNIPPETS,
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
	const [appState, dispatch] = useImmerReducer(appStateImmerReducer, INITIAL_APP_STATE)
	const appContextValue = { appState, dispatch }
	const { username, token, userData } = appState

	// Get Previously Logged-In User, if applicable
	useEffect(() => {
		const currentLocalStorage = getLocalStorage(["username", "token"])
		if (currentLocalStorage) dispatch(ACTION_LOGIN(currentLocalStorage))
	}, [dispatch])

	// Init or refresh User Data
	useEffect(() => {
		console.log("INIT USER DATA RAN")
		const loadUserInfo = async (username, token) => {
			const userInfo = await getUserData(username, token)
			dispatch(APP_ACTION_UPDATE_USER(userInfo))
			dispatch(ACTION_REFRESH_SNIPPETS())
		}
		!!username && loadUserInfo(username, token)
	}, [appState.refreshUser, username, token, dispatch])

	// Init or Refresh Snippet Data (user and friends)
	useEffect(() => {
		const loadSnippets = async (username, token) => {
			const allUserSnippets = await getAllSnippets(username, token, userData._id)
			const allFriendSnippets = await getFriendSnippets(username, token)
			dispatch(APP_ACTION_SET_SNIPPETS(allUserSnippets))
			dispatch(APP_ACTION_SET_FRIEND_SNIPPETS(allFriendSnippets))
		}
		objectHasData(userData) && loadSnippets(username, token)
	}, [appState.refreshSnippets, dispatch, username, token, userData])

	useEffect(() => {
		const loadFriendSnippets = async (username, token) => {
			const allFriendSnippets = await getFriendSnippets(username, token)
			dispatch(APP_ACTION_SET_FRIEND_SNIPPETS(allFriendSnippets))
		}
		objectHasData(userData) && loadFriendSnippets(username, token)
	}, [appState.refreshFriendSnippets, dispatch, username, token, userData])

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
