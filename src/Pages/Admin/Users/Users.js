import { useContext } from 'react'
import { AdminDataContext } from '../Admin'
import { v4 as uuid } from 'uuid';

export default function Users() {
	const { allUsers } = useContext(AdminDataContext)
	return (
		<div className="">
			<h2>User Management</h2>
			<ul>
				{allUsers.map(user => {
					return (
						<li key={uuid()}>
							{user.firstName} {user.lastName}
						</li>
					)
				})}
			</ul>
		</div>
	)
}