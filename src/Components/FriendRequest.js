import { useContext } from 'react'
import { DataContext } from '../App'
import { UserContext } from '../Pages/User/User'
import { approveFriend, denyFriend } from '../API/apiData'

export default function FriendRequest({ username, request }) {
	const { BASE_URL } = useContext(DataContext)
	const { refreshTrigger, setRefreshTrigger } = useContext(UserContext)

	const handleApprove = () => {
		const token = window.localStorage.getItem('token')
		approveFriend(BASE_URL, username, token, request._id)
		setRefreshTrigger(!refreshTrigger)
	}

	const handleDeny = () => {
		const token = window.localStorage.getItem('token')
		denyFriend(BASE_URL, username, token, request._id)
		setRefreshTrigger(!refreshTrigger)
	}

	return (
		<li>
			<div className="flex space-x-2">
				<h2>{request.firstName} {request.lastName}</h2>
				<p className="cursor-pointer hover:text-red-600" onClick={handleApprove}>+</p>
				<p className="cursor-pointer hover:text-red-600" onClick={handleDeny}>-</p>
			</div>
		</li>
	)
}
