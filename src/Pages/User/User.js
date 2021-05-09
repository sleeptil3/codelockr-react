import { useContext } from 'react'
import { UserDataContext } from '../../App'
import { Switch, Route, Link } from 'react-router-dom'
import UserDashboard from "./Dashboard/UserDashboard"
import UserProfile from "./Profile/UserProfile"

export default function User() {
	const { loggedIn, handleLogout } = useContext(UserDataContext)

	return (
		<div className="w-screen h-screen bg-gray-800">
			<h2>User</h2>
			<ul className="p-4">
				<li className="cursor-pointer">
					<p onClick={handleLogout}>Logout</p>
				</li>
				<li className="">
					<Link to={`/user/${loggedIn.username}/dashboard`}>User Dashboard</Link>
				</li>
				<li>
					<Link to={`/user/${loggedIn.username}/profile`}>User Profile</Link>
				</li>
			</ul>
			<main>
				<Switch>
					<Route path="/user/:username/profile" component={UserProfile} />
					<Route path="/user/:username/dashboard" component={UserDashboard} />
				</Switch>
			</main>
		</div>
	)
}
