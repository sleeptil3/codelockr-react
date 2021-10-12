import AdminStats from './AdminStats'
import UserList from './UserList'
import { Link, Switch, Route, useHistory } from 'react-router-dom'

export default function AdminDashboard({ pageSelect, setPageSelect }) {
	const history = useHistory()

	const handleChange = (e) => {
		const value = e.target.value
		setPageSelect(value)
		if (value === 'dashboard') history.push("/admin/dashboard")
		if (value === 'users') history.push("/admin/dashboard/userlist")
	}

	return (
		<div className="flex flex-col sm:flex-row justify-start items-center sm:items-start w-screen tracking-widest">
			<div className="hidden sm:flex bg-gray-900 ml-6 w-max space-y-2 flex-col rounded-xl px-8 py-4 shadow-lg flex-shrink-0">
				<Link to="/admin/dashboard" className="text-md font-bold uppercase">Dashboard</Link>
				<Link to="/admin/dashboard/userlist" className="text-xs font-thin">Manage Users</Link>
			</div>
			<div className="sm:hidden bg-gray-900 -mt-6 w-full py-2 shadow-lg flex justify-around items-center">
				<label className="hidden" htmlFor="pageSelect">Page Select</label>
				<select value={ pageSelect } name="pageSelect" onChange={ handleChange } className="bg-transparent w-3/4 tracking-widest">
					<option value="dashboard">Stats</option>
					<option value="users">Manage Users</option>
				</select>
			</div>
			<div className="sm:ml-8 w-full">
				<Switch>
					<Route path="/admin/dashboard/userlist" component={ UserList } />
					<Route path="/admin/dashboard/" component={ AdminStats } />
				</Switch>
			</div>
		</div>
	)
}