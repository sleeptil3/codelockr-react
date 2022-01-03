import AdminStats from "./AdminStats"
import UserList from "./UserList"
import { Link, Routes, Route, useNavigate } from "react-router-dom"

export default function AdminDashboard({ pageSelect, setPageSelect }) {
	const navigate = useNavigate()

	const handleChange = e => {
		const value = e.target.value
		setPageSelect(value)
		if (value === "dashboard") navigate("/admin/dashboard")
		if (value === "users") navigate("/admin/dashboard/userlist")
	}

	return (
		<div className="flex flex-col sm:flex-row justify-start items-center sm:items-start w-screen tracking-widest">
			<div className="hidden sm:flex bg-gray-900 ml-6 w-max space-y-2 flex-col rounded-xl px-8 py-4 shadow-lg shrink-0">
				<Link to="/admin/dashboard" className="text-md font-bold uppercase">
					Dashboard
				</Link>
				<Link to="/admin/dashboard/userlist" className="text-xs font-thin">
					Manage Users
				</Link>
			</div>
			<div className="sm:hidden bg-gray-900 -mt-6 w-full py-2 shadow-lg flex justify-around items-center">
				<label className="hidden" htmlFor="pageSelect">
					Page Select
				</label>
				<select
					value={pageSelect}
					name="pageSelect"
					onChange={handleChange}
					className="bg-transparent w-3/4 tracking-widest"
				>
					<option value="dashboard">Stats</option>
					<option value="users">Manage Users</option>
				</select>
			</div>
			<div className="sm:ml-8 w-full">
				<Routes>
					<Route path="/dashboard/userlist" element={<UserList />} />
					<Route path="/dashboard/" element={<AdminStats />} />
				</Routes>
			</div>
		</div>
	)
}
