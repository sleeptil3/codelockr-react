import { useContext, useState } from 'react'
import { DataContext } from '../../App'
import { addFolder } from '../../API/apiData'

export default function AddFolder({ owner, setShowAddFolder, setNewFolder }) {
	const { BASE_URL } = useContext(DataContext)
	const [formData, setFormData] = useState({
		title: '',
		owner: owner
	})

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.id]: e.target.value })
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		const token = window.localStorage.getItem('token')
		const username = window.localStorage.getItem('username')
		const newFolder = await addFolder(BASE_URL, username, token, formData)
		setFormData({
			title: '',
			owner: owner
		})
		setNewFolder({ ...newFolder })
		setShowAddFolder(false)
	}

	return (
		<div>
			<div className="ml-8 mt-4 space-y-4">
				<label htmlFor="title" className="">New Folder Title</label>
				<div className="flex space-x-4 relative bottom-2">
					<input
						className="block py-1 px-2 w-96 border border-gray-500 rounded-md bg-transparent"
						name="title"
						id="title"
						type="text"
						spellCheck="false"
						autoComplete="off"
						onChange={handleChange}
						value={formData.title}
					>
					</input>
					<button onClick={handleSubmit} className="inline btn-primary">Add</button>
					<button onClick={() => setShowAddFolder(false)} className="inline btn-secondary">Cancel</button>
				</div>
			</div>
		</div>
	)
}
