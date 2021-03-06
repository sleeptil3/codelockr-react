import { useContext } from "react"
import { AppContext } from "../App"
import FolderDetails from "./FolderDetails"

export default function ManageFolders() {
	const { appState } = useContext(AppContext)
	const { userData } = appState

	return (
		<div>
			<div className="mr-4">
				<h1 className="mb-6 text-2xl">Manage Folders</h1>
				<p className="">
					<span className="text-red-700 font-bold">CAUTION</span>: Deleting a folder will delete{" "}
					<strong>all</strong> of the Snippets it contains!
				</p>
			</div>
			<div className="mt-8 space-y-4 mr-6">
				{[...userData.folders]
					.sort((a, b) => (a.title.toUpperCase() < b.title.toUpperCase() ? -1 : 1))
					.map(folder => {
						return <FolderDetails key={folder._id} folder={folder} />
					})}
			</div>
		</div>
	)
}
