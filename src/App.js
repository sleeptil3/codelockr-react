import { createContext, useEffect } from "react"
import { Route, Routes } from "react-router-dom"
import { useImmerReducer } from "use-immer"

import { INITIAL_APP_STATE } from "./common/constants"
import { LOGIN } from "./state/App/actions"
import { appStateImmerReducer } from "./state/App/reducer"
import { getLocalStorage } from "./utils"

import Landing from "./containers/Landing"
import Admin from "./containers/Admin"
import User from "./containers/User"

export const AppContext = createContext()

export default function App() {
	const [appState, dispatchAppState] = useImmerReducer(appStateImmerReducer, INITIAL_APP_STATE)
	const appContextValue = { appState, dispatchAppState }

	/** Get Previously Logged-In User, if applicable */
	useEffect(() => {
		const currentLocalStorage = getLocalStorage(["username", "token"])
		if (currentLocalStorage) dispatchAppState(LOGIN(currentLocalStorage))
	}, [dispatchAppState])

	console.log(JSON.stringify(appState, null, "\b"))
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
