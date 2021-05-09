import { useContext, useEffect } from 'react'
import { DataContext } from '../../../App'
import { UserContext } from '../User'

export default function UserDashboard() {
	const { userData } = useContext(UserContext)

	return (
		<div className="flex justify-start w-screen h-full">
			<div className="w-1/6">
				<h1>Folders</h1>
			</div>
			<div className="w-1/6">
				<h1>Snippets</h1>
			</div>
			<div className="w-full">
				<h1>Snippet View</h1>
			</div>
		</div>
	)
}