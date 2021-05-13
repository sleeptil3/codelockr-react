import React, { useState, useEffect } from 'react'
import { Route, Switch, useHistory } from 'react-router-dom'
import Landing from './Pages/Landing/Landing'
import Admin from './Pages/Admin/Admin'
import User from './Pages/User/User'
export const DataContext = React.createContext()

export default function App() {
	const [showRegistration, setShowRegistration] = useState(false)
	const history = useHistory()
	const [loggedIn, setLoggedIn] = useState({
		state: false,
		username: "",
		token: ""
	})
	const BASE_URL = 'https://codelockr-api.herokuapp.com'
	// const BASE_URL = 'http://localhost:3030'

	const handleLogout = () => {
		window.localStorage.clear()
		setLoggedIn({
			state: false,
			username: "",
			token: ""
		})
		history.push('/')
	}

	// IF on page load, there is a token in LS, set loggedIn data
	useEffect(() => {
		if (window.localStorage.getItem("token")) {
			setLoggedIn({
				state: true,
				username: window.localStorage.getItem("username"),
				token: window.localStorage.getItem("token")
			})
		}
	}, [])

	return (
		<DataContext.Provider value={{ setShowRegistration, showRegistration, loggedIn, setLoggedIn, BASE_URL, handleLogout }}>
			<Switch>
				<Route path="/admin" component={Admin} />
				<Route path="/user" component={User} />
				<Route path="/" component={Landing} />
			</Switch>
		</DataContext.Provider>
	);
}
