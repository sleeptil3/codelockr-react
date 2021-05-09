import { useContext } from 'react'
import { UserContext } from '../User'

export default function UserProfile() {
	const { userData } = useContext(UserContext)

	return (
		<div className="">
			<h2>{userData.firstName}'s Profile</h2>
		</div>
	)
}