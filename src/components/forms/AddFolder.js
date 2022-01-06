import { useContext, useState } from "react"
import { AppContext } from "../../App"
import { addFolder } from "../../common/api"
import { ACTION_REFRESH_USER, ACTION_SET_SNIPPET_FORM } from "../../state/actions"

export default function AddFolder({ owner, setShowAddFolder, setNewFolder }) {
	const { appState, dispatch } = useContext(AppContext)
	const { token, username, snippetForm } = appState

	const [formData, setFormData] = useState({
		title: "",
		owner: owner,
	})

	const handleChange = e => {
		setFormData({ ...formData, [e.target.id]: e.target.value })
	}

	const handleSubmit = async e => {
		e.preventDefault()
		const newFolder = await addFolder(username, token, formData)
		setFormData({
			title: "",
			owner: owner,
		})
		setNewFolder({ ...newFolder })
		dispatch(ACTION_SET_SNIPPET_FORM({ ...snippetForm, parentFolder: newFolder._id }))
		dispatch(ACTION_REFRESH_USER())
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
