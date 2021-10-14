import {useState, useContext, useRef} from "react"
import {useHistory, Link} from "react-router-dom"
import {DataContext} from "../../App"
import {UserContext} from "../../Pages/User/User"
import {createSnippet, editSnippet, deleteSnippet} from "../../API/apiData"
import AddFolder from "./AddFolder"
import {languages} from "./languageData"

export default function SnippetForm() {
	const {BASE_URL} = useContext(DataContext)
	const {userData, setFilter, snippetForm, setSnippetForm, setSnippetSubmitMode, snippetSubmitMode, refreshTrigger, setRefreshTrigger} = useContext(UserContext)
	const [showAddFolder, setShowAddFolder] = useState(false)
	const [newFolder, setNewFolder] = useState()
	const [showLangList, setShowLangList] = useState(false)
	const [error, setError] = useState(false)
	const history = useHistory()
	const codeText = useRef()

	const handleChange = (e) => {
		if (e.target.type === "checkbox") {
			setSnippetForm({...snippetForm, isPrivate: e.target.checked})
		} else {
			const {id, value} = e.target
			setSnippetForm({...snippetForm, [id]: value})
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
			} else if (!snippetForm.code) {
				setError(true)
			} else if (!snippetForm.parseFormat) {
				setError(true)
			} else if (!snippetForm.parentFolder) {
				setError(true)
			} else handleSubmit(e)
		}
	}

	//  handle adding the new snippet to the user's snippet data
	const handleSubmit = (e) => {
		const snippetData = {...snippetForm}
		snippetData.parseFormat = snippetData.parseFormat.toLowerCase()
		const token = window.localStorage.getItem("token")
		if (snippetSubmitMode === "POST") {
			createSnippet(BASE_URL, userData.username, token, snippetData, userData._id)
		}
		if (snippetSubmitMode === "PUT") {
			editSnippet(BASE_URL, userData.username, token, snippetData)
		}
		setSnippetForm({
			title: "",
			parentFolder: "",
			parseFormat: "",
			code: "",
			notes: "",
			isPrivate: false,
		})
		setRefreshTrigger(!refreshTrigger)
		setSnippetSubmitMode("POST")
		setFilter(snippetData.parentFolder)
		history.push(`/user/${userData.username}/dashboard`)
	}

	//  handle removing the snippet from the user's snippet data
	const handleDelete = (e) => {
		e.preventDefault()
		const token = window.localStorage.getItem("token")
		deleteSnippet(BASE_URL, userData.username, token, snippetForm.snippet_id)
		setSnippetForm({
			title: "",
			parentFolder: "",
			parseFormat: "",
			code: "",
			notes: "",
			isPrivate: false,
		})
		setRefreshTrigger(!refreshTrigger)
		setSnippetSubmitMode("POST")
		setFilter(snippetForm.parentFolder)
		history.push(`/user/${userData.username}/dashboard`)
	}

	return (
		<form noValidate className="max-w-4xl mx-4 sm:ml-10 mt-5 sm:mb-14 sm:w-3/4 space-y-4 text-xs sm:text-sm" onSubmit={handleErrors}>
			<h1 className="text-base sm:text-xl font-bold">{snippetSubmitMode === "POST" ? "Create a New Snippet" : `Edit ${snippetForm.title}`}</h1>
			{error ? <h1 className="text-md sm:text-base font-normal text-red-600">Please Complete Required Fields</h1> : null}
			<div className={error && !snippetForm.title ? "border-l-4 pl-4 border-red-600" : null}>
				<label className="block mt-6">
					<p className="text-lg">Title</p>
					<input
						className="w-full sm:w-1/2 block mb-2 py-1 px-2 border border-gray-400 rounded-md shadow-md bg-gray-800"
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
				<label htmlFor="parentFolder" className="block">
					<p className="text-lg">Folder</p>
				</label>
				<select
					className="form-select w-full sm:w-3/12 block mb-2 py-1 px-2 border border-gray-400 rounded-md shadow-md bg-gray-800"
					id="parentFolder"
					name="parentFolder"
					onChange={handleChange}
					value={snippetForm.parentFolder}
				>
					{newFolder ? (
						<option className="" value={newFolder._id}>
							{newFolder.title}
						</option>
					) : (
						<option className="" value=""></option>
					)}
					{userData.folders
						.sort((a, b) => (a.title.toUpperCase() < b.title.toUpperCase() ? -1 : 1))
						.map((folder) => {
							return (
								<option className="" key={folder._id} value={folder._id}>
									{folder.title}
								</option>
							)
						})}
				</select>
				<h3 className="inline cursor-pointer hover:text-red-500 text-xs sm:text-xs" onClick={() => setShowAddFolder(!showAddFolder)}>
					{showAddFolder ? "" : "+ Add Folder"}
				</h3>
				{showAddFolder ? <AddFolder owner={userData._id} setShowAddFolder={setShowAddFolder} setNewFolder={setNewFolder} newFolder={newFolder} /> : ""}
			</div>
			<div className={error && !snippetForm.parseFormat ? "border-l-4 pl-4 border-red-600" : null}>
				<label className="block relative">
					<p className="text-lg">Language</p>
					<p className="text-xs mb-1 text-gray-300">Start typing to filter list</p>
					<input
						className="w-full sm:w-3/12 block py-1 px-2 border border-gray-400 rounded-md shadow-md bg-gray-800"
						id="parseFormat"
						type="text"
						autoCorrect="off"
						spellCheck="false"
						autoComplete="off"
						onChange={handleChange}
						value={snippetForm.parseFormat}
						onFocus={() => setShowLangList(true)}
					/>
					{showLangList && (
						<select
							className="absolute left-0 top-20 w-full sm:w-3/12 bg-gray-900 p-2 border-gray-400 rounded-md border"
							id="parseFormat"
							size="12"
							// onChange={}
						>
							{languages
								.sort((a, b) => (a.name.toUpperCase() < b.name.toUpperCase() ? -1 : 1))
								.map((language) => {
									if (language.name.toUpperCase().includes(snippetForm.parseFormat.toUpperCase())) {
										return (
											<option
												className=""
												onClick={(e) => {
													setSnippetForm({...snippetForm, parseFormat: language.name})
													codeText.current.focus()
													setTimeout(() => setShowLangList(false), 0)
												}}
												key={language.value}
												value={language.name}
											>
												{language.name}
											</option>
										)
									} else return null
								})}
						</select>
					)}
				</label>
			</div>
			<div className={error && !snippetForm.code ? "border-l-4 pl-4 border-red-600" : null}>
				<label className="block">
					<p className="text-lg">Code</p>
					<p className="text-xs mb-1 text-gray-300">Use Tab to indent</p>
					<textarea
						ref={codeText}
						className="text-sm w-full block p-2 h-96 border border-gray-400 rounded-md bg-transparent"
						id="code"
						type="textArea"
						spellCheck="false"
						onChange={handleChange}
						value={snippetForm.code}
						onKeyDown={(e) => {
							if (e.key === "Tab") {
								e.preventDefault()
								const start = e.target.selectionStart
								if (e.shiftKey === false) {
									e.target.value = e.target.value.substring(0, start) + "\t" + e.target.value.substring(start)
									e.target.selectionStart = e.target.selectionEnd = start + 1
								} else {
									e.target.value = e.target.value.substring(0, start - 1) + e.target.value.substring(start)
									e.target.selectionStart = e.target.selectionEnd = start - 1
								}
							}
						}}
					></textarea>
				</label>
			</div>
			<div>
				<label className="block">
					<p className="text-lg">Notes</p>
					<p className="text-xs mb-1 text-gray-300">Optional</p>
					<textarea
						className="w-full block p-2 h-48 border border-gray-400 rounded-md bg-transparent"
						id="notes"
						type="textArea"
						spellCheck="false"
						onChange={handleChange}
						value={snippetForm.notes}
					></textarea>
				</label>
			</div>
			<div className="pt-4">
				<label className="font-normal block">
					Sharing Setting
					<p className="text-md font-thin my-3 text-gray-300">By default, Snippets are shared with your friends. If you wish to make this Snippet private, select the option below.</p>
					<div className="flex items-center pt-2">
						<input
							className="form-checkbox p-2 bg-transparent rounded-xl focus:ring-0 focus:outline-none text-red-600"
							id="isPrivate"
							type="checkbox"
							onChange={handleChange}
							defaultChecked={snippetForm.isPrivate}
						></input>
						<span className="ml-2 sm:ml-3">Private</span>
					</div>
				</label>
			</div>
			<div className="w-full pt-10">
				<div className="w-full flex flex-row justify-between items-center">
					<div className="justify-self-start">
						{snippetSubmitMode === "PUT" ? (
							<button onClick={handleDelete} className="bg-red-800 tracking-widest rounded-md shadow-md py-2 px-5 text-xs text-gray-50 font-thin">
								Delete
							</button>
						) : null}
					</div>
					<div>
						<Link
							onClick={() =>
								setSnippetForm({
									title: "",
									parentFolder: "",
									parseFormat: "",
									code: "",
									notes: "",
									isPrivate: false,
								})
							}
							className="mr-10 btn-secondary py-2 px-5"
							to={`/user/${userData.username}/dashboard/`}
						>
							Cancel
						</Link>
						<button className="btn-primary py-2 px-5">{snippetSubmitMode === "POST" ? "Create" : "Update"}</button>
					</div>
				</div>
			</div>
		</form>
	)
}
