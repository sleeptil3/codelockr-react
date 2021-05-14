import { useContext } from 'react'
import { Link, Switch, Route } from 'react-router-dom'
import ManageFolders from './ManageFolders'
import ProfileDetails from './ProfileDetails'
import DeleteProfile from './DeleteProfile'
import { UserContext } from '../User'

export default function UserProfile() {
	const userData = useContext(UserContext)

	return (
		<div className="flex justify-start items-start w-screen h-screen">
			<div className="relative top-20 left-5 flex-col flex-shrink-0 bg-gray-300 border border-gray-900 h-max rounded-xl px-6 py-4 shadow-md">
				<Link to={`/user/${userData.username}/profile`}><h1 className="mb-2 cursor-pointer text-lg font-normal">My Profile</h1></Link>
				<Link to={`/user/${userData.username}/profile/folders`}><h1 className="cursor-pointer text-md font-light">Manage Folders</h1></Link>
				<Link to={`/user/${userData.username}/profile/delete`}><h1 className="cursor-pointer text-md font-light">Delete Account</h1></Link>
			</div>
			<div className="mt-20 ml-14">
				<Switch>
					<Route path='/user/:username/profile/folders' component={ManageFolders} />
					<Route path='/user/:username/profile/delete' component={DeleteProfile} />
					<Route path='/user/:username/profile' component={ProfileDetails} />
				</Switch>
			</div>
		</div>
	)
}