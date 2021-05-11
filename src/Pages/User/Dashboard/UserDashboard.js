import { v4 as uuid } from 'uuid'
import { useContext, useEffect } from 'react'
import { DataContext } from '../../../App'
import { UserContext } from '../User'
import Snippet from '../../../Components/Snippet'

export default function UserDashboard() {
	const { userData } = useContext(UserContext)

	return (
		<div className="flex justify-start items-start h-screen w-screen">
			<div className="bg-gray-300 px-8 py-4 h-full space-y-4 flex-col shadow-lg">
				<h2 className="text-lg font-normal">All Snippets</h2>
				<div>
					<h3 className="text-md font-normal">Folders</h3>
					<ul className="ml-2 space-y-1">
						{userData.folders.map(folder => {
							return <li className="my-1" key={uuid()}>{folder.title}</li>
						})}
					</ul>
				</div>
				<div>
					<button className="bg-darkBlue tracking-widest rounded-md shadow-md px-3 py-1 text-sm text-gray-50 font-thin flex justify-center items-center">
						<svg className="mr-1" width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M8.47266 2.52344H9.52734C9.62109 2.52344 9.66797 2.56771 9.66797 2.65625V14.3438C9.66797 14.4323 9.62109 14.4766 9.52734 14.4766H8.47266C8.37891 14.4766 8.33203 14.4323 8.33203 14.3438V2.65625C8.33203 2.56771 8.37891 2.52344 8.47266 2.52344Z" fill="#D5D5D5" />
							<path d="M3.09375 7.86914H14.9062C15 7.86914 15.0469 7.91341 15.0469 8.00195V8.99805C15.0469 9.08659 15 9.13086 14.9062 9.13086H3.09375C3 9.13086 2.95312 9.08659 2.95312 8.99805V8.00195C2.95312 7.91341 3 7.86914 3.09375 7.86914Z" fill="#D5D5D5" />
						</svg>
						<p className="mr-2">Snippet</p>
					</button>
				</div>
			</div>
			<div className="p-4">
				<h1>Snippet View</h1>
			</div>
		</div>
	)
}