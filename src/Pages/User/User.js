import React, { useState, useContext, useEffect } from 'react'
import { DataContext } from '../../App'
import { Switch, Route, Link } from 'react-router-dom'
import { getUserData } from '../../API/apiData'
import UserDashboard from "./Dashboard/UserDashboard"
import UserProfile from "./Profile/UserProfile"
export const UserContext = React.createContext()

export default function User() {
	const { handleLogout, BASE_URL } = useContext(DataContext)
	const [userData, setUserData] = useState({})


	useEffect(() => {
		const username = window.localStorage.getItem("username")
		const token = window.localStorage.getItem("token")
		const setData = async () => {
			const data = await getUserData(BASE_URL, username, token)
			setUserData({ ...data })
		}
		setData()
	}, [])

	if (userData.username === undefined) {
		return <h2>Loading</h2>
	} else {
		return (
			<div className="container-max h-full w-full bg-gray-800 flex-col justify-start items-center">
				<div className="m-5 rounded-xl bg-black text-gray-50 flex justify-between items-center">
					<div>
						<h2 className="ml-5 text-4xl">Codelockr</h2>
					</div>
					<div>
						<ul className="p-4 text-gray-50 flex space-x-10">
							<li className="">
								<Link to={`/user/${userData.username}/dashboard`}>User Dashboard</Link>
							</li>
							<li>
								<Link to={`/user/${userData.username}/profile`}>User Profile</Link>
							</li>
							<li className="cursor-pointer">
								<p onClick={handleLogout}>Logout</p>
							</li>
						</ul>
					</div>
				</div>
				<main className="text-gray-50 border m-5 rounded-xl flex p-10">
					<UserContext.Provider value={{ userData }}>
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