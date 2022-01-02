import { useContext } from "react"
import { Link, Routes, Route, useNavigate } from "react-router-dom"
import ManageFolders from "./components/ManageFolders"
import ProfileDetails from "./components/ProfileDetails"
import DeleteProfile from "./components/DeleteProfile"
import { UserContext } from ".."

export default function UserProfile() {
	const { userData } = useContext(UserContext)
	const navigate = useNavigate()

	const handleChange = e => {
		const value = e.target.value
		if (value === "profile") navigate(`/user/${userData.username}/profile`)
		if (value === "folders") navigate(`/user/${userData.username}/profile/folders`)
		if (value === "delete-account") navigate(`/user/${userData.username}/profile/delete`)
	}

	return (
		<div className="flex sm:flex-row flex-col justify-start items-start w-screen">
			<div className="hidden sm:block ml-5 shrink-0 bg-gray-900 h-max px-6 py-4 shadow-md">
				<h1 className="cursor-pointer mb-2 text-base font-normal">Settings</h1>
				<Link to={`/user/${userData.username}/profile`}>
					<h1 className="my-2 ml-2 text-xs font-light hover:text-red-600">My Profile</h1>
				</Link>
				<Link to={`/user/${userData.username}/profile/folders`}>
					<h1 className="cursor-pointer my-2 ml-2 text-xs font-light hover:text-red-600">
						Manage Folders
					</h1>
				</Link>
				<Link to={`/user/${userData.username}/profile/delete`}>
					<h1 className="cursor-pointer my-2 ml-2 text-xs font-light hover:text-red-600">
						Delete Account
					</h1>
				</Link>
				<Link to={`/user/${userData.username}/dashboard`}>
					<h1 className="cursor-pointer my-4 text-xs font-normal hover:text-red-600">
						Back to Dashboard
					</h1>
				</Link>
			</div>
			<div className="sm:hidden bg-gray-900 -mt-4 w-full py-2 shadow-lg flex flex-col justify-around items-center">
				<h1 className="mb-2 text-md font-normal">Settings</h1>
				<label className="hidden" htmlFor="pageSelect">
					Page Select
				</label>
				<select
					name="pageSelect"
					onChange={handleChange}
					className="form-select bg-transparent w-3/4 py-2 mb-2 tracking-widest"
				>
					<option value="profile">Profile Details</option>
					<option value="folders">Manage Folders</option>
					<option value="delete-account">Delete Account</option>
				</select>
			</div>
			<div className="ml-8 mt-4 sm:mt-0">
				<Routes>
					<Route path="folders" element={<ManageFolders />} />
					<Route path="delete" element={<DeleteProfile />} />
					<Route index element={<ProfileDetails />} />
				</Routes>
			</div>
		</div>
	)
}
