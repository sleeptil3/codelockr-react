import { useState, useContext } from 'react'
import { DataContext } from '../../App'
import { UserContext } from '../../Pages/User/User'
import { createSnippet } from '../../API/apiData'
import { v4 as uuid } from 'uuid'

export default function SnippetForm() {
	const [formData, setFormData] = useState({
	})
	const { BASE_URL } = useContext(DataContext)
	const { userData } = useContext(UserContext)


	const handleChange = (e) => {
		const { id, value } = e.target
		setFormData({ ...formData, [id]: value })
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		const token = window.localStorage.getItem("token")
		console.log(BASE_URL, userData.username, token, formData)
		// createSnippet(BASE_URL, userData.username, token, formData)
		// setFormData({ "": "" })
	}

	return (
		<form noValidate className="ml-10 mt-6 w-7/12 space-y-4" onSubmit={handleSubmit}>
			<div className="">
				<label className="block">Title
				<input
						className="w-full block py-1 px-2 border border-gray-500 rounded-md shadow-md"
						id="title"
						type="text"
						autoCorrect="off"
						spellCheck="false"
						autoFocus
						autoComplete="none"
						onChange={handleChange}
						value={formData.title}
					/>
				</label>
			</div>
			<div className="">
				<label className="block">Folder
				<select
						className="w-full block py-1 px-2 border border-gray-500 rounded-md shadow-md"
						id="folder_id"
						onChange={handleChange}
						value={formData.folder_id}
					>
						{userData.folders.map(folder => {
							return <option className="" key={uuid()} value={folder._id}>{folder.title}</option>
						})}
					</select>
				</label>
			</div>
			<div className="">
				<label className="block">Code
				<textarea
						className="block p-2 w-full h-96 border border-gray-500 rounded-md"
						id="code"
						type="textArea"
						spellCheck="false"
						onChange={handleChange}
						value={formData.code}
					>
					</textarea>
				</label>
			</div>
			<div className="">
				<label className="block">Notes
				<textarea
						className="block p-2 w-full h-48 border border-gray-500 rounded-md"
						id="notes"
						type="textArea"
						spellCheck="false"
						onChange={handleChange}
						value={formData.notes}
					>
					</textarea>
				</label>
			</div>
			<button className="bg-darkBlue tracking-widest rounded-md shadow-md px-4 py-2 text-sm text-gray-50 font-thin flex justify-center items-center">Create</button>
		</form>
	)
}