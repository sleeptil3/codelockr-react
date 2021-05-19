import { v4 as uuid } from 'uuid'
import { useContext, useState } from 'react'
import { UserContext } from '../User'
import View from './View'
import FriendRequest from '../../../Components/FriendRequest'
import AddFriend from '../../../Components/Forms/AddFriend'

export default function Dashboard() {
	const { userData } = useContext(UserContext)
	const [filter, setFilter] = useState('')

	const handleFilter = (e) => {
		setFilter(e.target.id)
		console.log(filter)
	}

	return (
		<div className="flex justify-start items-start w-screen">
			<div className="ml-5 w-max h-max ">
				<div className="bg-gray-900 w-full space-y-4 flex-col px-8 py-4 shadow-lg flex-shrink-0">
					<h2 className="cursor-pointer text-lg font-normal" onClick={() => setFilter('')}>View All</h2>
					{userData.friends.length ? <div>
						<h3 className="text-md font-normal">Friends</h3>
						<ul className="ml-2 text-sm space-y-1">
							{userData.friends.sort((a, b) => a.lastName.toUpperCase() < b.lastName.toUpperCase() ? -1 : 1).map(friend => {
								return <li className={`my-1 cursor-pointer py-1 px-2 w-max ${filter === friend._id ? 'bg-gradient-to-tr from-darkBlue to-red-800 text-gray-50 rounded-md' : 'hover:text-red-600 '}`} id={friend._id} onClick={handleFilter} key={uuid()}>{friend.firstName} {friend.lastName}</li>
							})}
						</ul>
					</div>
						: null}
				</div>
				{userData.friendRequestsReceived.length ?
					<div className="bg-gray-900 mt-4 w-full space-y-4 flex flex-col px-8 py-4 shadow-lg flex-shrink-0">
						<h2 className="cursor-pointer text-md font-normal">Friend Requests</h2>
						<ul className="ml-2 text-sm space-y-1">
							{userData.friendRequestsReceived.map(request => {
								return <FriendRequest key={uuid()} username={userData.username} request={request} />
							})}
						</ul>
					</div>
					: null}
				<div className="bg-gray-900 mt-4 w-full space-y-1 flex flex-col px-8 py-4 shadow-lg flex-shrink-0">
					<h2 className="cursor-pointer text-md font-normal">Add Friend</h2>
					<AddFriend username={userData.username} />
				</div>
			</div>
			<div className="ml-6 w-full">
				<View filter={filter} setFilter={setFilter} />
			</div>
		</div>
	)
}