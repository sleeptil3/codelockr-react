import { v4 as uuid } from 'uuid'
import { useContext, useState } from 'react'
import { UserContext } from '../User'
import View from './View'
import FriendRequest from '../../../Components/FriendRequest'
import AddFriend from '../../../Components/Forms/AddFriend'

export default function Dashboard() {
	const { userData } = useContext(UserContext)
	const [filter, setFilter] = useState('')
	const [showAddFriend, setShowAddFriend] = useState(false)

	const handleFilter = (e) => {
		if (e.target.type === 'select-one') setFilter(e.target.value)
		else setFilter(e.target.id)
	}

	return (
		<div className="flex sm:flex-row flex-col justify-start items-start w-screen">
			<div className="sm:ml-5 w-screen sm:w-auto">
				<div className="hidden sm:block bg-gray-900 w-full space-y-4 flex-col px-8 py-4 shadow-lg flex-shrink-0">
					<h2 className="cursor-pointer text-lg font-normal" onClick={() => setFilter('')}>View All</h2>
					{userData.friends.length ?
						<div>
							<h3 className="text-md font-normal">Friends</h3>
							<ul className="ml-2 text-sm space-y-1">
								{userData.friends.sort((a, b) => a.lastName.toUpperCase() < b.lastName.toUpperCase() ? -1 : 1).map(friend => {
									return <li className={`my-1 cursor-pointer py-1 px-2 w-max ${filter === friend._id ? 'bg-gradient-to-tr from-darkBlue to-red-800 text-gray-50 rounded-md' : 'hover:text-red-600 '}`} id={friend._id} onClick={handleFilter} key={uuid()}>{friend.firstName} {friend.lastName}</li>
								})}
							</ul>
						</div>
						: null}
				</div>
				<div className="sm:hidden bg-gray-900 -mt-4 w-full py-2 pt-3 shadow-lg flex justify-around items-center">
					<label className="hidden" htmlFor="friendFilter">Filter by friend</label>
					<select value={filter} name="friendFilter" onChange={handleFilter} className="form-select bg-transparent w-3/4 tracking-widest">
						<option value="">Show All</option>
						{userData.friends.sort((a, b) => a.lastName.toUpperCase() < b.lastName.toUpperCase() ? -1 : 1).map(friend => {
							return <option value={friend._id} key={uuid()}>{friend.firstName} {friend.lastName}</option>
						})}
					</select>
				</div>
				{userData.friendRequestsReceived.length ?
					<div className="bg-gray-900 sm:mt-4 w-full space-y-4 flex flex-col px-8 pt-2 pb-2 sm:py-4 shadow-lg flex-shrink-0">
						<h2 className="cursor-pointer text-md font-normal">Friend Requests</h2>
						<ul className="ml-2 text-sm space-y-1">
							{userData.friendRequestsReceived.map(request => {
								return <FriendRequest key={uuid()} username={userData.username} request={request} />
							})}
						</ul>
					</div>
					: null}
				<div className="bg-gray-900 sm:mt-4 w-full space-y-1 flex flex-col px-8 py-4 shadow-lg flex-shrink-0">
					<h2 onClick={() => setShowAddFriend(true)} className="cursor-pointer text-sm sm:text-md font-normal"><span className="sm:hidden">+ </span>Add a friend</h2>
					{showAddFriend ?
						<AddFriend username={userData.username} setShowAddFriend={setShowAddFriend} />
						: null}
					<div className="hidden sm:block">
						<AddFriend username={userData.username} />
					</div>
				</div>
			</div>
			<div className="sm:ml-6 sm:w-full w-full">
				<View filter={filter} setFilter={setFilter} />
			</div>
		</div>
	)
}