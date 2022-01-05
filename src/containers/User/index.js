import { useContext, useEffect } from "react"
import { Routes, Route } from "react-router-dom"

import UserDashboard from "./Dashboard"
import UserProfile from "./Profile"
import LockrRoomDashboard from "./LockrRoom"
import Header from "../../components/Header"
import Footer from "../../components/Footer"

import { AppContext } from "../../App"
import LoadingRing from "../../components/LoadingRing"

export default function User() {
	const { appState } = useContext(AppContext)
	const { userData } = appState
	const { username, firstName, lastName } = userData

	useEffect(() => {
		window.scrollTo(0, 0)
	}, [])

	if (!!username) {
		return (
			<div className="flex flex-col justify-between tracking-widest min-h-screen">
				<div>
					<Header username={username} firstName={firstName} lastName={lastName} />
					<main className="relative mt-4 z-0 text-gray-50">
						<Routes>
							<Route path=":username/lockrroom/*" element={<LockrRoomDashboard />} />
							<Route path=":username/profile/*" element={<UserProfile />} />
							<Route path=":username/*" element={<UserDashboard />} />
						</Routes>
					</main>
				</div>
				<Footer />
			</div>
		)
	} else {
		return <LoadingRing />
	}
}
