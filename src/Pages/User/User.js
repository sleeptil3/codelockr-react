import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import UserDashboard from "./UserDashboard"
import UserProfile from "./UserProfile"

export default function User() {
	return (
		<div className="">
			<h2>User</h2>
			<ul className="p-4">
				<li className="">
					<Link to="/">Logout</Link>
				</li>
				<li className="">
					<Link to="/user/dashboard">User Dashboard</Link>
				</li>
				<li>
					<Link to="/user/profile">User Profile</Link>
				</li>
			</ul>
			<main>
				<Switch>
					<Route path="/user/dashboard" component={UserDashboard} />
					<Route path="/user/profile" component={UserProfile} />
				</Switch>
			</main>
		</div>
	)
}
