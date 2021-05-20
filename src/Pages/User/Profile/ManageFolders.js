import { useContext } from 'react'
import { UserContext } from '../User'
import FolderDetails from './FolderDetails'
import { v4 as uuid } from 'uuid'

export default function ManageFolders() {
	const { userData } = useContext(UserContext)

	return (
		<div>
			<div className="mr-4">
				<h1 className="mb-6 text-lg font-bold">Manage Folders</h1>
				<p className=""><span className="text-red-700 font-bold">CAUTION</span>: Deleting a folder will delete <strong>all</strong> of the Snippets it contains!</p>
			</div>
			<div className="mt-8 space-y-4 mr-6">
				{userData.folders.sort((a, b) => (a.title.toUpperCase() < b.title.toUpperCase()) ? -1 : 1).map(folder => {
					return <FolderDetails key={uuid()} folder={folder} username={userData.username} />
				})}
			</div>
		</div>
	)
}
