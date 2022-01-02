import { useReducer, createContext, useEffect } from "react"
import { Route, Routes } from "react-router-dom"

import { INITIAL_APP_STATE } from "./common/constants"
import { LOGIN } from "./state/App/actions"
import { appStateReducer } from "./state/App/reducer"

import Landing from "./Pages/Landing"
import Admin from "./Pages/Admin"
import User from "./Pages/User"

export const AppContext = createContext()

export default function App() {
	const [appState, dispatchAppState] = useReducer(appStateReducer, INITIAL_APP_STATE)
	const appContextValue = { appState, dispatchAppState }

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
