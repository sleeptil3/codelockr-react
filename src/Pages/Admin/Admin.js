import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import AdminDashboard from "./AdminDashboard"
import Users from "./Users"

export default function Admin() {
	return (
		<Router>
			<div className="">
				<h2>Admin</h2>
				<ul className="p-4">
					<li className="">
						<Link to="/">Logout</Link>
					</li>
					<li className="">
						<Link to="/admin/dashboard">Admin Dashboard</Link>
					</li>
					<li>
						<Link to="/admin/users">User Management</Link>
					</li>
				</ul>
				<main>
					<Switch>
						<Route path="/admin/dashboard" component={AdminDashboard} />
						<Route path="/admin/users" exact component={Users} />
					</Switch>
				</main>
			</div>
		</Router>
	)
}