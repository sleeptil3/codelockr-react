import { useContext } from 'react'
import { UserDataContext } from '../../../App'

export default function UserDashboard() {
	const { userData } = useContext(UserDataContext)
	return (
		<div className="">
			<h2>{userData.firstName}'s Dashboard</h2>
		</div>
	)
}