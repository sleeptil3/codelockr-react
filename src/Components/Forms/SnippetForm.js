import { useState, useEffect, useContext } from 'react'
import { useHistory, Link } from 'react-router-dom'
import { DataContext } from '../../App'
import { UserContext } from '../../Pages/User/User'
import { createSnippet, editSnippet, deleteSnippet } from '../../API/apiData'
import AddFolder from './AddFolder'
import { v4 as uuid } from 'uuid'
import { languages } from './data'

export default function SnippetForm() {
	const { BASE_URL } = useContext(DataContext)
	const { userData, refreshTrigger, setRefreshTrigger, setFilter, snippetForm, setSnippetForm, setSnippetSubmitMode, snippetSubmitMode } = useContext(UserContext)
	const [showAddFolder, setShowAddFolder] = useState(false)
	const [newFolder, setNewFolder] = useState()
	const history = useHistory()

	const handleChange = (e) => {
		const { id, value } = e.target
		setSnippetForm({ ...snippetForm, [id]: value })
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		const token = window.localStorage.getItem("token")
		if (snippetSubmitMode === "POST") {
			createSnippet(BASE_URL, userData.username, token, snippetForm, userData._id)
		}
		if (snippetSubmitMode === "PUT") {
			editSnippet(BASE_URL, userData.username, token, snippetForm)
		}
		setSnippetForm({
			title: '',
			parentFolder: '',
			parseFormat: '',
			code: '',
			notes: ''
		})
		setSnippetSubmitMode('POST')
		setRefreshTrigger(!refreshTrigger)
		setFilter(snippetForm.parentFolder)
		history.push(`/user/${userData.username}/dashboard`)
	}
	const handleDelete = (e) => {
		e.preventDefault()
		const token = window.localStorage.getItem("token")
		deleteSnippet(BASE_URL, userData.username, token, snippetForm.snippet_id)
		setSnippetForm({
			title: '',
			parentFolder: '',
			parseFormat: '',
			code: '',
			notes: ''
		})
		setSnippetSubmitMode('POST')
		setRefreshTrigger(!refreshTrigger)
		setFilter("")
		history.push(`/user/${userData.username}/dashboard`)
	}

	useEffect(() => {
		if (newFolder) setSnippetForm({ ...snippetForm, parentFolder: newFolder._id })
	}, [newFolder])

	return (
		<form noValidate className="ml-10 mt-6 mb-20 w-4/12 space-y-4" onSubmit={handleSubmit}>
			<h1 className="text-2xl font-bold">{snippetSubmitMode === "POST" ? "Create a New Snippet" : `Edit ${snippetForm.title}`}</h1>
			<div className="">
				<label className="block">Title
				<input
						className="block w-full py-1 px-2 border border-gray-500 rounded-md shadow-md"
						id="title"
						type="text"
						autoCorrect="off"
						spellCheck="false"
						autoFocus
						autoComplete="off"
						onChange={handleChange}
						value={snippetForm.title}
					/>
				</label>
			</div>
			{ snippetSubmitMode === "POST" ?
				<div className="">
					<label className="block">Folder
				<select
							className="w-1/2 block py-1 px-2 border border-gray-500 rounded-md shadow-md"
							id="parentFolder"
							onChange={handleChange}
							value={snippetForm.parentFolder}
						>
							{newFolder ? <option className="" value={newFolder._id}>{newFolder.title}</option> : <option className="" value=""></option>}
							{userData.folders.sort((a, b) => a.title.toUpperCase() < b.title.toUpperCase() ? -1 : 1).map(folder => {
								return <option className="" key={uuid()} value={folder._id}>{folder.title}</option>
							})}
						</select>
					</label>
					<h3 className="mt-2 cursor-pointer hover:text-darkBlue hover:underline" onClick={() => setShowAddFolder(!showAddFolder)}>{showAddFolder ? "" : "+ Add Folder"}</h3>
					{showAddFolder ?
						<AddFolder owner={userData._id} setShowAddFolder={setShowAddFolder} setNewFolder={setNewFolder} /> : ""}
				</div>
				: null}
			{ snippetSubmitMode === "POST" ?
				<div className="">
					<label className="block">Language
				<select
							className="w-1/2 block py-1 px-2 border border-gray-500 rounded-md shadow-md"
							id="parseFormat"
							onChange={handleChange}
							value={snippetForm.parseFormat}
						>
							<option className="" value=""></option>
							{languages.sort((a, b) => a.name.toUpperCase() < b.name.toUpperCase() ? -1 : 1).map(language => {
								return <option className="" key={uuid()} value={language.value}>{language.name}</option>
							})}
						</select>
					</label>
				</div>
				: null}
			<div className="">
				<label className="block">Code
				<textarea
						className="w-full block p-2 h-96 border border-gray-500 rounded-md"
						id="code"
						type="textArea"
						spellCheck="false"
						onChange={handleChange}
						value={snippetForm.code}
					>
					</textarea>
				</label>
			</div>
			<div className="">
				<label className="block">Notes
				<textarea
						className="w-full block p-2 h-48 border border-gray-500 rounded-md"
						id="notes"
						type="textArea"
						spellCheck="false"
						onChange={handleChange}
						value={snippetForm.notes}
					>
					</textarea>
				</label>
			</div>
			<div className="flex justify-between">
				<div className="mt-4">
					<button className="bg-darkBlue tracking-widest rounded-md shadow-md px-8 py-2 text-sm text-gray-50 font-thin">{snippetSubmitMode === "POST" ? "Create" : "Update"}</button>
					<Link className="ml-6 bg-transparent border border-darkBlue tracking-widest rounded-md shadow-md px-4 py-2 text-sm text-darkBlue font-thin" to={`/user/${userData.username}/dashboard/`}>Cancel</Link>
				</div>
				<div className="mt-4">
					{snippetSubmitMode === "PUT" ? <button onClick={handleDelete} className="bg-red-800 tracking-widest rounded-md shadow-md px-8 py-2 text-sm text-gray-50 font-thin">Delete</button> : null}
				</div>
			</div >
		</form >
	)
}
