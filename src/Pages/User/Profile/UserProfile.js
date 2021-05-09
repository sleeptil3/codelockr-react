import { useContext } from 'react'
import { UserDataContext } from '../../../App'

export default function UserProfile() {
	const { userData } = useContext(UserDataContext)
	return (
		<div className="">
			<h2>{userData.firstName}'s Profile</h2>
		</div>
	)
}