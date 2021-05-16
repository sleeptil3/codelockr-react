import React, { useEffect, useContext, useState } from 'react'
import { DataContext } from '../../App'
import AdminDashboard from "./Dashboard/AdminDashboard"
import AdminHeader from '../../Components/AdminHeader'
import Footer from '../../Components/Footer'
import { getUserData } from '../../API/apiData'

export default function Admin() {
	const { loggedIn, handleLogout, BASE_URL } = useContext(DataContext)
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

	if (loggedIn.state === false) return <h1 className="text-2xl font-bold uppercase">LOADING</h1>
	if (!loggedIn.isAdmin) return <h1 className="text-2xl font-bold uppercase">NOT AUTHORIZED</h1>
	else {
		return (
			<div className="w-screen flex-col justify-start items-center tracking-widest min-h-screen">
				<AdminHeader userData={userData} handleLogout={handleLogout} />
				<div className="flex flex-col justify-between min-h-screen">
					<main className="relative z-0 pt-20 text-gray-50 ">
						<AdminDashboard />
					</main>
					<Footer />
				</div>
			</div>
		)
	}
}

// const [allUsers, setAllUsers] = useState([])

// const getAllUsers = async () => {
// 	try {
// 		const response = await fetch(`${BASE_URL}/admin/users`, {
// 			method: "GET",
// 			headers: {
// 				"Content-Type": "application/json",
// 				Authorization: `Bearer ${loggedIn.token}`
// 			}
// 		})
// 		const data = await response.json()
// 		setAllUsers(data)
// 	} catch (err) {
// 		console.error(err)
// 	}
// }

// useEffect(() => {
// 	getAllUsers()
// }, [])
