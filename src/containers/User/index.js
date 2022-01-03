import { useState, useContext, useEffect, createContext } from "react"
import { Routes, Route } from "react-router-dom"

import { AppContext } from "../../App"

import UserDashboard from "./Dashboard"
import UserProfile from "./Profile"
import LockrRoomDashboard from "./LockrRoom"
import { getUserData, getAllSnippets } from "../../common/api"

import Header from "../../components/Header"
import Footer from "../../components/Footer"
import ellipse2 from "../../assets/ellipse-load@2x.png"
import ellipse3 from "../../assets/ellipse-load@3x.png"
import ellipse from "../../assets/ellipse-load.png"

export const UserContext = createContext()

export default function User() {
	const [userData, setUserData] = useState({})
	const [snippetData, setSnippetData] = useState([])
	const [friendsList, setFriendsList] = useState([])
	const [filter, setFilter] = useState("")
	const [refreshTrigger, setRefreshTrigger] = useState(false)
	const [snippetSubmitMode, setSnippetSubmitMode] = useState("POST")
	const [snippetForm, setSnippetForm] = useState({
		title: "",
		parentFolder: "",
		parseFormat: "",
		code: "",
		notes: "",
		isPrivate: false,
	})

	const { appState } = useContext(AppContext)
	const { username, token } = appState

	useEffect(() => {
		const setData = async () => {
			const userInfo = await getUserData(username, token)
			setUserData({ ...userInfo })
			const snippetInfo = await getAllSnippets(username, token, userInfo._id)
			setSnippetData([...snippetInfo])
			setFriendsList([...userInfo.friends])
		}
		setData()
		window.scrollTo(0, 0)
	}, [username, token])

	const userContextValues = {
		refreshTrigger,
		setRefreshTrigger,
		snippetData,
		setSnippetData,
		userData,
		filter,
		setFilter,
		snippetSubmitMode,
		setSnippetSubmitMode,
		snippetForm,
		setSnippetForm,
		friendsList,
		setFriendsList,
	}

	if (userData.username === undefined) {
		return (
			<div className="h-screen w-screen flex justify-center items-center">
				<img
					className="animate-spin"
					src={ellipse}
					srcSet={`${ellipse2} 2x, ${ellipse3} 3x`}
					alt=""
				/>
			</div>
		)
	} else {
		return (
			<div className="flex flex-col justify-between tracking-widest min-h-screen">
				<div>
					<Header userData={userData} />
					<main className="relative mt-4 z-0 text-gray-50">
						<UserContext.Provider value={userContextValues}>
							<Routes>
								<Route path=":username/lockrroom/*" element={<LockrRoomDashboard />} />
								<Route path=":username/profile/*" element={<UserProfile />} />
								<Route path=":username/*" element={<UserDashboard />} />
							</Routes>
						</UserContext.Provider>
					</main>
				</div>
				<Footer />
			</div>
		)
	}
}
