import React, { useEffect, useContext, useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { DataContext } from '../../App'
import AdminDashboard from "./Dashboard/AdminDashboard"
import AdminHeader from '../../Components/AdminHeader'
import Footer from '../../Components/Footer'
import { getUserData } from '../../API/apiData'
import loading from '../../images/loading.gif'

export default function Admin() {
	const { loggedIn, handleLogout, BASE_URL } = useContext(DataContext)
	const [ userData, setUserData ] = useState({})
	const [ pageSelect, setPageSelect ] = useState('dashboard')

	const setupUserCallback = useCallback(
		async () => {
			const data = await getUserData(BASE_URL, window.localStorage.getItem("username"), window.localStorage.getItem("token"))
			setUserData({ ...data })
		},
		[ BASE_URL ],
	)

	useEffect(() => {
		setupUserCallback()
	}, [ setupUserCallback ])

	if (loggedIn.state === false) return (
		<div className="h-screen flex justify-center items-center">
			<img className="h-20" src={ loading } alt="animated loading graphic" />
		</div>
	)
	if (!loggedIn.isAdmin) return (
		<div className="h-screen flex flex-col justify-center items-center">
			<h1 className="text-3xl font-bold text-gray-50 uppercase">CODELOCKR</h1>
			<h1 className="text-xl font-bold text-gray-100 uppercase">NOT AUTHORIZED</h1>
			<Link to="/" className="text-lg font-thin text-gray-200 hover:text-red-500">Back to login</Link>

		</div>
	)
	else {
		return (
			<div className="w-screen min-h-screen flex flex-col justify-between tracking-widest ">
				<div>
					<AdminHeader setPageSelect={ setPageSelect } userData={ userData } handleLogout={ handleLogout } />
					<main className="relative z-0 mt-6 text-gray-50 ">
						<AdminDashboard pageSelect={ pageSelect } setPageSelect={ setPageSelect } />
					</main>
				</div>
				<Footer />
			</div>
		)
	}
}