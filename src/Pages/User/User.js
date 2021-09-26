import { useState, useContext, useEffect, createContext } from 'react'
import { DataContext } from '../../App'
import { Switch, Route } from 'react-router-dom'
import { getUserData, getAllSnippets } from '../../API/apiData'
import UserDashboard from "./Dashboard/UserDashboard"
import UserProfile from "./Profile/UserProfile"
import Dashboard from './LockrRoom/Dashboard'
import Header from '../../Components/Header'
import Footer from '../../Components/Footer'
import loading from '../../images/loading.gif'
export const UserContext = createContext()

export default function User() {
	const { handleLogout, BASE_URL } = useContext(DataContext)
	const [ userData, setUserData ] = useState({})
	const [ snippetData, setSnippetData ] = useState([])
	const [ friendsList, setFriendsList ] = useState([])
	const [ filter, setFilter ] = useState('')
	const [ refreshTrigger, setRefreshTrigger ] = useState(false)
	const [ snippetSubmitMode, setSnippetSubmitMode ] = useState('POST')
	const [ snippetForm, setSnippetForm ] = useState({
		title: '',
		parentFolder: '',
		parseFormat: '',
		code: '',
		notes: '',
		isPrivate: false
	})

	useEffect(() => {
		const setData = async () => {
			const userInfo = await getUserData(BASE_URL, window.localStorage.getItem("username"), window.localStorage.getItem("token"))
			setUserData({ ...userInfo })
			const snippetInfo = await getAllSnippets(BASE_URL, window.localStorage.getItem("username"), window.localStorage.getItem('token'), userInfo._id)
			setSnippetData([ ...snippetInfo ])
			setFriendsList([ ...userInfo.friends ])
		}
		setData()
		window.scrollTo(0, 0)
	}, [ BASE_URL, refreshTrigger ])

	if (userData.username === undefined) {
		return <div className="h-screen flex justify-center items-center"><img className="h-20" src={ loading } alt="animated loading graphic" /></div>
	} else {
		return (
			<div className="flex flex-col justify-between tracking-widest min-h-screen">
				<div>
					<Header userData={ userData } handleLogout={ handleLogout } />
					<main className="relative mt-4 z-0 text-gray-50">
						<UserContext.Provider value={ { refreshTrigger, setRefreshTrigger, snippetData, setSnippetData, userData, filter, setFilter, snippetSubmitMode, setSnippetSubmitMode, snippetForm, setSnippetForm, friendsList, setFriendsList } }>
							<Switch>
								<Route path="/user/:username/lockrroom" component={ Dashboard } />
								<Route path="/user/:username/profile" component={ UserProfile } />
								<Route path="/user/:username/" component={ UserDashboard } />
							</Switch>
						</UserContext.Provider>
					</main>
				</div>
				<Footer />
			</div>
		)
	}
}
