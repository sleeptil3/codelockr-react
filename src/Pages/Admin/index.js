import React, { useEffect, useContext, useState, useCallback } from "react"
import { Link } from "react-router-dom"

import { getUserData } from "../../common/api"
import { AppContext } from "../../App"

import AdminDashboard from "./Dashboard"
import AdminHeader from "../../Components/AdminHeader"
import Footer from "../../Components/Footer"

import ellipse from "../../assets/ellipse-load.png"
import ellipse2 from "../../assets/ellipse-load@2x.png"
import ellipse3 from "../../assets/ellipse-load@3x.png"

export default function Admin() {
	const { appState } = useContext(AppContext)
	const { loggedIn, isAdmin } = appState

	const [userData, setUserData] = useState({})
	const [pageSelect, setPageSelect] = useState("dashboard")

	const setupUserCallback = useCallback(async () => {
		const data = await getUserData(
			window.localStorage.getItem("username"),
			window.localStorage.getItem("token")
		)
		setUserData({ ...data })
	}, [])

	useEffect(() => {
		setupUserCallback()
	}, [setupUserCallback])

	if (!loggedIn)
		return (
			<div className="h-screen flex justify-center items-center">
				<img
					className="animate-spin"
					src={ellipse}
					srcSet={`${ellipse2} 2x, ${ellipse3} 3x`}
					alt=""
				/>
			</div>
		)
	if (!isAdmin)
		return (
			<div className="h-screen flex flex-col justify-center items-center">
				<h1 className="text-2xl font-bold text-gray-50 uppercase">CODELOCKR</h1>
				<h1 className="text-lg font-bold text-gray-100 uppercase">NOT AUTHORIZED</h1>
				<Link to="/" className="text-base font-thin text-gray-200 hover:text-red-500">
					Back to login
				</Link>
			</div>
		)
	else {
		return (
			<div className="w-screen min-h-screen flex flex-col justify-between tracking-widest ">
				<div>
					<AdminHeader setPageSelect={setPageSelect} userData={userData} />
					<main className="relative z-0 mt-6 text-gray-50 ">
						<AdminDashboard pageSelect={pageSelect} setPageSelect={setPageSelect} />
					</main>
				</div>
				<Footer />
			</div>
		)
	}
}
