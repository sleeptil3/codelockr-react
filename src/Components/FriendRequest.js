import { useContext } from "react"

import { UserContext } from "../Pages/User"

import { approveFriend, denyFriend } from "../common/api"

export default function FriendRequest({ username, request }) {
	const { refreshTrigger, setRefreshTrigger } = useContext(UserContext)

	// handle moving the friend from requests to friends
	const handleApprove = () => {
		const token = window.localStorage.getItem("token")
		approveFriend(username, token, request._id)
		setRefreshTrigger(!refreshTrigger)
	}

	// handle removing the request
	const handleDeny = () => {
		const token = window.localStorage.getItem("token")
		denyFriend(username, token, request._id)
		setRefreshTrigger(!refreshTrigger)
	}

	return (
		<li>
			<div className="flex items-center space-x-6 sm:space-x-3">
				<h2 className="text-xs">
					{request.firstName} {request.lastName}
				</h2>
				<svg
					className="cursor-pointer"
					onClick={handleApprove}
					width="18"
					height="14"
					viewBox="0 0 18 14"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M1 7L7 13L17 1"
						stroke="#10B981"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
				</svg>
				<svg
					className="cursor-pointer"
					onClick={handleDeny}
					width="14"
					height="14"
					viewBox="0 0 14 14"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M0.293723 0.293723C0.386594 0.200617 0.496921 0.126747 0.618385 0.076345C0.739849 0.0259431 0.870063 0 1.00157 0C1.13307 0 1.26329 0.0259431 1.38475 0.076345C1.50622 0.126747 1.61654 0.200617 1.70941 0.293723L7.00026 5.58657L12.2911 0.293723C12.3841 0.200767 12.4944 0.127031 12.6159 0.0767236C12.7373 0.0264163 12.8675 0.000523453 12.999 0.000523453C13.1304 0.000523453 13.2606 0.0264163 13.382 0.0767236C13.5035 0.127031 13.6138 0.200767 13.7068 0.293723C13.7998 0.386679 13.8735 0.497033 13.9238 0.618485C13.9741 0.739938 14 0.87011 14 1.00157C14 1.13303 13.9741 1.2632 13.9238 1.38465C13.8735 1.50611 13.7998 1.61646 13.7068 1.70941L8.41395 7.00026L13.7068 12.2911C13.7998 12.3841 13.8735 12.4944 13.9238 12.6159C13.9741 12.7373 14 12.8675 14 12.999C14 13.1304 13.9741 13.2606 13.9238 13.382C13.8735 13.5035 13.7998 13.6138 13.7068 13.7068C13.6138 13.7998 13.5035 13.8735 13.382 13.9238C13.2606 13.9741 13.1304 14 12.999 14C12.8675 14 12.7373 13.9741 12.6159 13.9238C12.4944 13.8735 12.3841 13.7998 12.2911 13.7068L7.00026 8.41395L1.70941 13.7068C1.61646 13.7998 1.50611 13.8735 1.38465 13.9238C1.2632 13.9741 1.13303 14 1.00157 14C0.87011 14 0.739938 13.9741 0.618485 13.9238C0.497033 13.8735 0.386679 13.7998 0.293723 13.7068C0.200767 13.6138 0.127031 13.5035 0.0767236 13.382C0.0264163 13.2606 0.000523453 13.1304 0.000523453 12.999C0.000523453 12.8675 0.0264163 12.7373 0.0767236 12.6159C0.127031 12.4944 0.200767 12.3841 0.293723 12.2911L5.58657 7.00026L0.293723 1.70941C0.200617 1.61654 0.126747 1.50622 0.076345 1.38475C0.0259431 1.26329 0 1.13307 0 1.00157C0 0.870063 0.0259431 0.739849 0.076345 0.618385C0.126747 0.496921 0.200617 0.386594 0.293723 0.293723Z"
						fill="#DC2626"
					/>
				</svg>
			</div>
		</li>
	)
}
