import { useState, useEffect, useContext } from 'react'
import { useHistory, Link } from 'react-router-dom'
import { DataContext } from '../../App'
import { UserContext } from '../../Pages/User/User'
import { createSnippet, editSnippet, deleteSnippet } from '../../API/apiData'
import AddFolder from './AddFolder'
import { v4 as uuid } from 'uuid'
import { languages } from './languageData'

export default function SnippetForm() {
	const { BASE_URL } = useContext(DataContext)
	const { userData, refreshTrigger, setRefreshTrigger, setFilter, snippetForm, setSnippetForm, setSnippetSubmitMode, snippetSubmitMode } = useContext(UserContext)
	const [showAddFolder, setShowAddFolder] = useState(false)
	const [newFolder, setNewFolder] = useState()
	const [error, setError] = useState(false)
	const history = useHistory()

	const handleChange = (e) => {
		if (e.target.type === 'checkbox') {
			setSnippetForm({ ...snippetForm, isPrivate: e.target.checked })
		} else {
			const { id, value } = e.target
			setSnippetForm({ ...snippetForm, [id]: value })
		}
	}

	const handleErrors = (e) => {
		e.preventDefault()
		window.scrollTo(0, 0)
		if (snippetSubmitMode === "PUT") handleSubmit()
		else {
			setError(false)
			if (!snippetForm.title) {
				setError(true)
			}
			else if (!snippetForm.code) {
				setError(true)
			}
			else if (!snippetForm.parseFormat) {
				setError(true)
			}
			else if (!snippetForm.parentFolder) {
				setError(true)
			} else handleSubmit(e)
		}
	}

	const handleSubmit = (e) => {
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
			notes: '',
			isPrivate: false
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
			notes: '',
			isPrivate: false
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
		<form noValidate className="mx-4 sm:ml-10 mt-5 sm:mb-14 sm:w-3/4 space-y-4 text-sm sm:text-base" onSubmit={handleErrors}>
			<h1 className="text-lg sm:text-2xl font-bold">{snippetSubmitMode === "POST" ? "Create a New Snippet" : `Edit ${snippetForm.title}`}</h1>
			{error ? <h1 className="text-md sm:text-lg font-normal text-red-600">Please Complete Required Fields</h1> : null}
			<div className={error && !snippetForm.title ? "border-l-4 pl-4 border-red-600" : null}>
				<label className="block">Title
				<input
						className="block w-full py-1 px-2 border border-gray-400 rounded-md shadow-md bg-transparent"
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
			<div className={error && !snippetForm.parentFolder ? "border-l-4 pl-4 border-red-600" : null}>
				<label htmlFor="parentFolder" className="block">Folder</label>
				<select
					className="form-select w-full sm:w-1/2 block mb-2 py-1 px-2 border border-gray-400 rounded-md shadow-md bg-gray-800"
					id="parentFolder"
					name="parentFolder"
					onChange={handleChange}
					value={snippetForm.parentFolder}
				>
					{newFolder ? <option className="" value={newFolder._id}>{newFolder.title}</option> : <option className="" value=""></option>}
					{userData.folders.sort((a, b) => a.title.toUpperCase() < b.title.toUpperCase() ? -1 : 1).map(folder => {
						return <option className="" key={uuid()} value={folder._id}>{folder.title}</option>
					})}
				</select>
				<h3 className="inline cursor-pointer hover:text-red-500 text-xs sm:text-sm" onClick={() => setShowAddFolder(!showAddFolder)}>{showAddFolder ? "" : "+ Add Folder"}</h3>
				{showAddFolder ?
					<AddFolder owner={userData._id} setShowAddFolder={setShowAddFolder} setNewFolder={setNewFolder} /> : ""}
			</div>
			<div className={error && !snippetForm.parseFormat ? "border-l-4 pl-4 border-red-600" : null}>
				<label className="block">Language
				<select
						className="form-select w-full sm:w-1/2 block py-1 px-2 border border-gray-400 rounded-md shadow-md bg-gray-800"
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
			<div className={error && !snippetForm.code ? "border-l-4 pl-4 border-red-600" : null}>
				<label className="block">Code
				<textarea
						className="text-sm w-full block p-2 h-96 border border-gray-400 rounded-md bg-transparent"
						id="code"
						type="textArea"
						spellCheck="false"
						onChange={handleChange}
						value={snippetForm.code}
					>
					</textarea>
				</label>
			</div>
			<div>
				<label className="block">Notes
				<p className="text-xs mb-1 text-gray-300">(Optional)</p>
					<textarea
						className="w-full block p-2 h-48 border border-gray-400 rounded-md bg-transparent"
						id="notes"
						type="textArea"
						spellCheck="false"
						onChange={handleChange}
						value={snippetForm.notes}
					>
					</textarea>
				</label>
			</div>
			<div className="pt-4">
				<label className="font-normal block">Sharing Setting
				<p className="text-md font-thin my-3 text-gray-300">By default, Snippets are shared with your friends. If you wish to make this Snippet private, select the option below.</p>
					<div className="flex items-center">
						<input
							className="form-checkbox p-2 bg-transparent rounded-xl focus:ring-0 focus:outline-none text-red-600"
							id="isPrivate"
							type="checkbox"
							onChange={handleChange}
							defaultChecked={snippetForm.isPrivate}
						>
						</input>
						<span className="ml-2 sm:ml-3">Private</span>
					</div>
				</label>
			</div>
			<div className="flex justify-between">
				<div className="mt-4">
					<button className="btn-primary py-2 px-5">{snippetSubmitMode === "POST" ? "Create" : "Update"}</button>
					<Link onClick={() => setSnippetForm({
						title: '',
						parentFolder: '',
						parseFormat: '',
						code: '',
						notes: '',
						isPrivate: false
					})} className="ml-6 btn-secondary py-2" to={`/user/${userData.username}/dashboard/`}>Cancel</Link>
				</div>
				<div className="mt-4">
					{snippetSubmitMode === "PUT" ? <button onClick={handleDelete} className="bg-red-800 tracking-widest rounded-md shadow-md px-8 py-2 text-sm text-gray-50 font-thin">Delete</button> : null}
				</div>
			</div>
		</form>
	)
}
