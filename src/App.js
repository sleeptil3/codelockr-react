import { useState, useEffect, createContext } from "react"
import { Route, Routes, useNavigate } from "react-router-dom"

import { BASE_URL } from "./common/constants"

import Landing from "./Pages/Landing"
import Admin from "./Pages/Admin"
import User from "./Pages/User"

export const DataContext = createContext()

export default function App() {
	const navigate = useNavigate()

	const INITIAL_APP_STATE = {
		showRegistration: false,
		loggedIn: {
			state: false,
			isAdmin: false,
			username: "",
			firstName: "",
			lastName: "",
		},
	}

	const appStateReducer = (state, action) => {
		switch (action.type) {
			case "SHOW_REGISTRATION": {
				return { ...state, loggedIn: { ...state.loggedIn }, showRegistration: action.payload }
			}
			case "LOGOUT": {
				return {
					...state,
					state: false,
					isAdmin: false,
					username: "",
					firstName: "",
					lastName: "",
				}
			}
			default:
				return state
		}
	}

	const [showRegistration, setShowRegistration] = useState(false)
	const [loggedIn, setLoggedIn] = useState({
		state: false,
		isAdmin: false,
		username: "",
		firstName: "",
		lastName: "",
	})

	const handleLogout = () => {
		window.localStorage.clear()
		setLoggedIn({
			state: false,
			isAdmin: false,
			username: "",
			firstName: "",
			lastName: "",
		})
		navigate("/")
	}

	/** IF on page load, there is a token in LS, set loggedIn data */

	useEffect(() => {
		if (
			window.localStorage.getItem("token") &&
			window.localStorage.getItem("username") === "admin"
		) {
			setLoggedIn({
				state: true,
				isAdmin: true,
				username: window.localStorage.getItem("username"),
				firstName: "",
				lastName: "",
			})
		} else if (window.localStorage.getItem("token")) {
			setLoggedIn({
				state: true,
				isAdmin: false,
				username: window.localStorage.getItem("username"),
				firstName: "",
				lastName: "",
			})
		} else {
			setLoggedIn({
				state: false,
				isAdmin: false,
				username: "",
				firstName: "",
				lastName: "",
			})
		}
	}, [])

	const AppContextValue = {
		setShowRegistration,
		showRegistration,
		loggedIn,
		setLoggedIn,
		BASE_URL,
		handleLogout,
	}

	return (
		<div>
			<DataContext.Provider value={AppContextValue}>
				<Routes>
					<Route path="/admin/*" element={<Admin />} />
					<Route path="/user/*" element={<User />} />
					<Route index path="/" element={<Landing />} />
				</Routes>
			</DataContext.Provider>
		</div>
	)
}
