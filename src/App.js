import React, { useState, useEffect } from 'react'
import { Route, Switch, useHistory } from 'react-router-dom'
import Landing from './Pages/Landing/Landing'
import Admin from './Pages/Admin/Admin'
import User from './Pages/User/User'
export const UserDataContext = React.createContext()

export default function App() {
	const history = useHistory()
	const [userData, setUserData] = useState({})
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

	const getUserData = async () => {
		try {
			const response = await fetch(`${BASE_URL}/user/${loggedIn.username}`, {
				method: 'GET',
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${loggedIn.token}`
				}
			})
			const data = await response.json()
			setUserData({ ...data })
		} catch (err) {
			console.error(err)
		}
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

	// getUserData if user is logged in
	useEffect(() => {
		if (loggedIn.state) {
			getUserData()
		}
	})

	return (
		<UserDataContext.Provider value={{ userData, setUserData, loggedIn, setLoggedIn, BASE_URL, handleLogout }}>
			<div className="App">
				<Switch>
					<Route path="/admin" component={Admin} />
					<Route path="/user" component={User} />
					<Route path="/" component={Landing} />
				</Switch>
			</div>
		</UserDataContext.Provider>
	);
}
