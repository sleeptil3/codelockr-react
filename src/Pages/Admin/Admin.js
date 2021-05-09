import React, { useEffect, useContext, useState } from 'react'
import { UserDataContext } from '../../App'
import { Switch, Route, Link } from 'react-router-dom'
import AdminDashboard from "./Dashboard/AdminDashboard"
import Users from "./Users/Users"
export const AdminDataContext = React.createContext()

export default function Admin() {
	const { loggedIn, handleLogout, BASE_URL } = useContext(UserDataContext)
	const [allUsers, setAllUsers] = useState([])

	const getAllUsers = async () => {
		try {
			const response = await fetch(`${BASE_URL}/admin/users`, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${loggedIn.token}`
				}
			})
			const data = await response.json()
			setAllUsers(data)
		} catch (err) {
			console.error(err)
		}
	}

	useEffect(() => {
		getAllUsers()
	}, [])

	return (
		<div className="w-screen h-screen bg-gray-800">
			<header>
				<h2>Admin</h2>
				<ul className="p-4">
					<li className="cursor-pointer">
						<p onClick={handleLogout}>Logout</p>
					</li>
					<li className="">
						<Link to="/admin/dashboard">Admin Dashboard</Link>
					</li>
					<li>
						<Link to="/admin/dashboard/users">User Management</Link>
					</li>
				</ul>
			</header>
			<main>
				<AdminDataContext.Provider value={{ allUsers }}>
					<Switch>
						<Route path="/admin/dashboard/users" exact component={Users} />
						<Route path="/admin/dashboard" exact component={AdminDashboard} />
					</Switch>
				</AdminDataContext.Provider>
			</main>
		</div>
	)
}