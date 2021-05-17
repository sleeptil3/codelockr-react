import { useContext } from 'react'
import { Link, Switch, Route } from 'react-router-dom'
import ManageFolders from './ManageFolders'
import ProfileDetails from './ProfileDetails'
import DeleteProfile from './DeleteProfile'
import { UserContext } from '../User'

export default function UserProfile() {
	const userData = useContext(UserContext)

	return (
		<div className="flex justify-start items-start w-screen">
			<div className="ml-5 flex-col flex-shrink-0 bg-gray-900 h-max px-6 py-4 shadow-md">
				<Link to={`/user/${userData.username}/profile`}><h1 className="mb-2 cursor-pointer text-lg font-normal">My Profile</h1></Link>
				<Link to={`/user/${userData.username}/profile/folders`}><h1 className="cursor-pointer text-sm mb-2 font-light">Manage Folders</h1></Link>
				<Link to={`/user/${userData.username}/profile/delete`}><h1 className="cursor-pointer text-sm font-light">Delete Account</h1></Link>
			</div>
			<div className="ml-8">
				<Switch>
					<Route path='/user/:username/profile/folders' component={ManageFolders} />
					<Route path='/user/:username/profile/delete' component={DeleteProfile} />
					<Route path='/user/:username/profile' component={ProfileDetails} />
				</Switch>
			</div>
		</div>
	)
}