import React, { useState, useContext, useEffect } from 'react'
import { DataContext } from '../../App'
import { Switch, Route } from 'react-router-dom'
import { getUserData } from '../../API/apiData'
import UserDashboard from "./Dashboard/UserDashboard"
import UserProfile from "./Profile/UserProfile"
import Header from '../../Components/Header'
export const UserContext = React.createContext()

export default function User() {
	const { handleLogout, BASE_URL } = useContext(DataContext)
	const [userData, setUserData] = useState({})
	const [filter, setFilter] = useState('')
	const [refreshTrigger, setRefreshTrigger] = useState(false)
	const [snippetSubmitMode, setSnippetSubmitMode] = useState('POST')
	const [snippetForm, setSnippetForm] = useState({
		title: '',
		parentFolder: '',
		parseFormat: '',
		code: '',
		notes: ''
	})

	useEffect(() => {
		const username = window.localStorage.getItem("username")
		const token = window.localStorage.getItem("token")
		const setData = async () => {
			const data = await getUserData(BASE_URL, username, token)
			setUserData({ ...data })
		}
		setData()
	}, [refreshTrigger])

	if (userData.username === undefined) {
		return <h2>Loading</h2>
	} else {
		return (
			<div className="w-screen flex-col justify-start items-center tracking-widest">
				<Header userData={userData} handleLogout={handleLogout} />
				<main className="text-gray-900 h-full">
					<UserContext.Provider value={{ userData, filter, setFilter, refreshTrigger, setRefreshTrigger, snippetSubmitMode, setSnippetSubmitMode, snippetForm, setSnippetForm }}>
						<Switch>
							<Route path="/user/:username/profile" component={UserProfile} />
							<Route path="/user/:username/" component={UserDashboard} />
						</Switch>
					</UserContext.Provider>
				</main>
			</div>
		)
	}
}