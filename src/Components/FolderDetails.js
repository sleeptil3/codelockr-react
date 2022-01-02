import { useState, useContext } from "react"
import { UserContext } from "../Pages/User"
import { editFolder, deleteFolder } from "../common/api"

export default function FolderDetails({ folder, username }) {
	const [editMode, setEditMode] = useState(false)
	const [deleteMode, setDeleteMode] = useState(false)
	const { setFilter, refreshTrigger, setRefreshTrigger } = useContext(UserContext)
	const [formData, setFormData] = useState({ title: "" })

	const handleChange = e => {
		const { id, value } = e.target
		setFormData({ ...formData, [id]: value })
	}

	// Handle adding the edited folder to the users data
	const handleSubmit = async e => {
		e.preventDefault()
		const token = window.localStorage.getItem("token")
		await editFolder(username, token, folder._id, formData)
		setRefreshTrigger(!refreshTrigger)
		setFormData({ title: "" })
		setEditMode(false)
	}

	// Handle removing the folder to the users data
	const handleDelete = async e => {
		const token = window.localStorage.getItem("token")
		await deleteFolder(username, token, folder._id)
		setFilter("")
		setRefreshTrigger(!refreshTrigger)
		setDeleteMode(false)
	}

	return (
		<div>
			<div
				className={`transition-transform transform hover:scale-105 bg-gradient-to-r from-darkBlue to-red-500 flex justify-between min-w-max font-normal rounded-lg shadow-sm px-2 py-1 space-x-4`}
			>
				<div className="flex justify-start items-baseline space-x-4">
					<svg
						className="self-center cursor-pointer"
						id="edit"
						onClick={() => setEditMode(true)}
						width="24"
						height="26"
						viewBox="0 0 24 26"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M4.371 20.0847C4.431 20.0847 4.491 20.0784 4.551 20.069L9.597 19.1432C9.657 19.1306 9.714 19.1024 9.756 19.0553L22.473 5.75237C22.5008 5.72334 22.5229 5.68885 22.5379 5.65089C22.553 5.61293 22.5607 5.57223 22.5607 5.53113C22.5607 5.49003 22.553 5.44933 22.5379 5.41136C22.5229 5.3734 22.5008 5.33891 22.473 5.30988L17.487 0.0910087C17.43 0.0313823 17.355 0 17.274 0C17.193 0 17.118 0.0313823 17.061 0.0910087L4.344 13.394C4.299 13.441 4.272 13.4975 4.26 13.5603L3.375 18.8388C3.34582 19.0069 3.35624 19.1799 3.40538 19.3429C3.45452 19.5058 3.54088 19.6538 3.657 19.774C3.855 19.9748 4.104 20.0847 4.371 20.0847ZM6.393 14.6116L17.274 3.23237L19.473 5.5327L8.592 16.9119L5.925 17.4046L6.393 14.6116ZM23.04 22.7208H0.96C0.429 22.7208 0 23.1695 0 23.725V24.8548C0 24.9928 0.108 25.1058 0.24 25.1058H23.76C23.892 25.1058 24 24.9928 24 24.8548V23.725C24 23.1695 23.571 22.7208 23.04 22.7208Z"
							fill="white"
						/>
					</svg>
					<h2 className="text-base text-white shadow-sm tracking-widest font-light">
						{folder.title}
					</h2>
					<h2 className="font-thin text-white">•</h2>
					<p className="font-thin text-white text-xs">
						{!folder.snippets.length ? "Empty" : `${folder.snippets.length} Snippet`}
					</p>
				</div>
				<div className="flex justify-start items-center space-x-4">
					<svg
						className="self-center cursor-pointer shadow-lg"
						id="delete"
						onClick={() => setDeleteMode(true)}
						width="30"
						height="24"
						viewBox="0 0 30 24"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M13.2071 18.7071L18.5 13.4142L23.793 18.7071L25.2071 17.2929L19.9142 12L25.2071 6.70706L23.793 5.29294L18.5 10.5858L13.2071 5.29294L11.793 6.70706L17.0858 12L11.793 17.2929L13.2071 18.7071Z"
							fill="#F9FAFB"
						/>
						<path
							d="M28.5 0H11.1652C10.9615 0.000337996 10.76 0.0420113 10.5729 0.122497C10.3857 0.202983 10.2169 0.320607 10.0765 0.46825L0 11.1014V12.8986L10.0765 23.5317C10.2169 23.6794 10.3857 23.797 10.5729 23.8775C10.76 23.958 10.9615 23.9997 11.1652 24H28.5C28.8977 23.9995 29.2789 23.8414 29.5601 23.5601C29.8414 23.2789 29.9995 22.8977 30 22.5V1.5C29.9995 1.10232 29.8414 0.721056 29.5601 0.439851C29.2789 0.158647 28.8977 0.000463153 28.5 0ZM28 22H11.3802L2 12.1014V11.8986L11.3802 2H28V22Z"
							fill="#F9FAFB"
						/>
					</svg>
				</div>
			</div>
			{editMode ? (
				<form
					className={`sm:ml-5 mt-5 flex pb-4 sm:pb-0 sm:flex-row space-y-4 sm:space-y-0 sm:mb-8 flex-col sm:items-end`}
					onSubmit={handleSubmit}
				>
					<label className="shrink-0 sm:mr-4">New Title:</label>
					<input
						className="focus:ring-0 mr-8 w-full sm:w-auto bg-transparent border-t-0 border-l-0 border-r-0 border-b-2 py-0 px-1 tracking-widest"
						type="text"
						autoComplete="off"
						id="title"
						value={formData.title}
						onChange={handleChange}
					/>
					<div className="sm:w-full space-x-6">
						<button className="btn-primary w-1/3 px-2 py-1" type="submit">
							Save
						</button>
						<button
							className="sm:ml-5 w-1/3 btn-secondary px-2 py-1"
							onClick={() => setEditMode(false)}
						>
							Cancel
						</button>
					</div>
				</form>
			) : null}
			{deleteMode ? (
				<div
					className="sm:ml-5 mt-5 space-y-4 sm:w-max p-5 flex-col items-baseline border-2 rounded-lg shadow border-red-600"
					onSubmit={handleSubmit}
				>
					<h1 className="sm:text-base font-bold sm:font-black">Are you sure?</h1>
					<p className="text-xs sm:text-xs">
						All snippets inside <span className="font-bold">"{folder.title}" </span>will be deleted!
					</p>
					<button
						className="focus:ring-0 btn-primary px-2 py-1 item-grow-0 mt-4 bg-red-600"
						id="edit"
						onClick={handleDelete}
					>
						Yes, I'm sure!
					</button>
					<button
						className="focus:ring-0 ml-5 btn-secondary px-2 py-1 item-grow-0"
						id="delete"
						onClick={() => setDeleteMode(false)}
					>
						No, cancel!
					</button>
				</div>
			) : null}
		</div>
	)
}
