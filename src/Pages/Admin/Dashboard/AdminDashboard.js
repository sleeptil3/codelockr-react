import { Switch, Route, Link } from 'react-router-dom'
import AdminStats from './AdminStats'
import UserList from './UserList'

export default function AdminDashboard() {
	return (
		<div className="flex justify-start items-start w-screen tracking-widest">
			<div className="bg-gray-900 ml-6 w-max space-y-2 flex flex-col rounded-xl px-8 py-4 shadow-lg flex-shrink-0">
				<Link to="/admin/dashboard" className="text-md font-bold uppercase">Dashboard</Link>
				<Link to="/admin/dashboard/userlist" className="text-sm font-thin">Manage Users</Link>
			</div>
			<div className="ml-8 w-full">
				<Switch>
					<Route path="/admin/dashboard/userlist" component={UserList} />
					<Route path="/admin/dashboard/" component={AdminStats} />
				</Switch>
			</div>
		</div>
	)
}