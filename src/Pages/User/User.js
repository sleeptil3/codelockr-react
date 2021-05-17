import React, { useState, useContext, useEffect } from 'react'
import { DataContext } from '../../App'
import { Switch, Route } from 'react-router-dom'
import { getUserData } from '../../API/apiData'
import UserDashboard from "./Dashboard/UserDashboard"
import UserProfile from "./Profile/UserProfile"
import Dashboard from './LockrRoom/Dashboard'
import Header from '../../Components/Header'
import Footer from '../../Components/Footer'
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
			<div className="w-screen flex flex-col justify-between tracking-widest min-h-screen">
				<div>
					<Header userData={userData} handleLogout={handleLogout} />
					<main className="relative mt-4 z-0 text-gray-50">
						<UserContext.Provider value={{ userData, filter, setFilter, refreshTrigger, setRefreshTrigger, snippetSubmitMode, setSnippetSubmitMode, snippetForm, setSnippetForm }}>
							<Switch>
								<Route path="/user/:username/lockrroom" component={Dashboard} />
								<Route path="/user/:username/profile" component={UserProfile} />
								<Route path="/user/:username/" component={UserDashboard} />
							</Switch>
						</UserContext.Provider>
					</main>
				</div>
				<Footer />
			</div>
		)
	}
}