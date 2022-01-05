import { useContext, useState } from "react"

import { AppContext } from "../../../App"

import FriendRequest from "../../../components/FriendRequest"
import AddFriend from "../../../components/forms/AddFriend"
import FriendSnippetView from "../../../components/FriendSnippetView"

export default function LockrRoomDashboard() {
	const { appState } = useContext(AppContext)
	const { userData } = appState
	const { friends, friendRequestsReceived } = userData

	const [friendFilter, setFriendFilter] = useState("")
	const [showAddFriend, setShowAddFriend] = useState(false)

	const handleFilter = e => {
		if (e.target.type === "select-one") setFriendFilter(e.target.value)
		else setFriendFilter(e.target.id)
	}

	return (
		<div className="flex sm:flex-row flex-col justify-start items-start w-screen">
			<div className="sm:ml-5 w-screen sm:w-auto">
				<div className="hidden sm:block bg-gray-900 w-full space-y-4 flex-col px-8 py-4 shadow-lg shrink-0">
					<h2 className="cursor-pointer text-base font-normal" onClick={() => setFriendFilter("")}>
						View All
					</h2>
					{!!friends.length ? (
						<div>
							<h3 className="text-md font-normal">Friends</h3>
							<ul className="ml-2 text-xs space-y-1">
								{[...friends]
									.sort((a, b) => (a.lastName.toUpperCase() < b.lastName.toUpperCase() ? -1 : 1))
									.map(friend => {
										return (
											<li
												className={`my-1 cursor-pointer py-1 px-2 w-max ${
													friendFilter === friend._id
														? "bg-gradient-to-tr from-darkBlue to-red-800 text-gray-50 rounded-md"
														: "hover:text-red-600 "
												}`}
												id={friend._id}
												onClick={handleFilter}
												key={friend._id}
											>
												{friend.firstName} {friend.lastName}
											</li>
										)
									})}
							</ul>
						</div>
					) : null}
				</div>
				<div className="sm:hidden bg-gray-900 -mt-4 w-full py-2 pt-3 shadow-lg flex justify-around items-center">
					<label className="hidden" htmlFor="friendFilter">
						Filter by friend
					</label>
					<select
						value={friendFilter}
						name="friendFilter"
						onChange={handleFilter}
						className="form-select bg-gray-900 w-3/4 tracking-widest"
					>
						<option value="">Show All</option>
						{[...friends]
							.sort((a, b) => (a.lastName.toUpperCase() < b.lastName.toUpperCase() ? -1 : 1))
							.map(friend => {
								return (
									<option value={friend._id} key={friend._id}>
										{friend.firstName} {friend.lastName}
									</option>
								)
							})}
					</select>
				</div>
				{!!friendRequestsReceived.length ? (
					<div className="bg-gray-900 sm:mt-4 w-full space-y-4 flex flex-col px-8 pt-2 pb-2 sm:py-4 shadow-lg shrink-0">
						<h2 className="cursor-pointer text-md font-normal">Friend Requests</h2>
						<ul className="ml-2 text-xs space-y-1">
							{friendRequestsReceived.map(request => {
								return (
									<FriendRequest
										key={userData._id}
										username={userData.username}
										request={request}
									/>
								)
							})}
						</ul>
					</div>
				) : null}
				<div className="bg-gray-900 sm:mt-4 w-full space-y-1 flex flex-col px-8 py-4 shadow-lg shrink-0">
					<h2
						onClick={() => setShowAddFriend(true)}
						className="cursor-pointer text-xs sm:text-md font-normal"
					>
						<span className="sm:hidden">+ </span>Add a friend
					</h2>
					{showAddFriend ? <AddFriend setShowAddFriend={setShowAddFriend} /> : null}
					<div className="hidden sm:block">
						<AddFriend />
					</div>
				</div>
			</div>
			<div className="sm:ml-6 sm:w-full w-full">
				<FriendSnippetView friendFilter={friendFilter} setFriendFilter={setFriendFilter} />
			</div>
		</div>
	)
}
