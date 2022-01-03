import { useContext, useState } from "react"
import { UserContext } from "../../containers/User"
import { addFolder } from "../../common/api"

export default function AddFolder({ owner, setShowAddFolder, setNewFolder, newFolder }) {
	const { setSnippetForm, snippetForm, setRefreshTrigger, refreshTrigger } = useContext(UserContext)
	const [formData, setFormData] = useState({
		title: "",
		owner: owner,
	})

	const handleChange = e => {
		setFormData({ ...formData, [e.target.id]: e.target.value })
	}

	// handle adding folder to userData
	const handleSubmit = async e => {
		e.preventDefault()
		const token = window.localStorage.getItem("token")
		const username = window.localStorage.getItem("username")
		const newFolder = await addFolder(username, token, formData)
		setFormData({
			title: "",
			owner: owner,
		})
		setNewFolder({ ...newFolder })
		setSnippetForm({ ...snippetForm, parentFolder: newFolder._id })
		setRefreshTrigger(!refreshTrigger)
		setShowAddFolder(false)
	}

	return (
		<div>
			<div className="ml-8 mt-4 space-y-4">
				<label htmlFor="title" className="">
					New Folder Title
				</label>
				<div className="flex flex-wrap space-y-4 sm:space-y-0 space-x-4 relative bottom-2">
					<input
						className="block py-1 px-2 w-96 border border-gray-500 rounded-md bg-transparent"
						name="title"
						id="title"
						type="text"
						spellCheck="false"
						autoComplete="off"
						onChange={handleChange}
						value={formData.title}
					></input>
					<button onClick={handleSubmit} className="btn-primary">
						Add
					</button>
					<button onClick={() => setShowAddFolder(false)} className="btn-secondary">
						Cancel
					</button>
				</div>
			</div>
		</div>
	)
}
