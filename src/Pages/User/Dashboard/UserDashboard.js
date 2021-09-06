import { useContext } from 'react'
import { Route, Switch, Link } from 'react-router-dom'
import { UserContext } from '../User'
import SnippetView from './SnippetView'
import SnippetForm from '../../../Components/Forms/SnippetForm'

export default function UserDashboard() {
	const { userData, filter, setFilter, setSnippetSubmitMode } = useContext(UserContext)

	const handleFilter = (e) => {
		e.preventDefault()
		if (e.target.type === "select-one") setFilter(e.target.value)
		else setFilter(e.target.id)
	}

	const handleAddSnippet = () => {
		setSnippetSubmitMode('POST')
		setFilter("")
	}

	return (
		<div className="flex flex-col sm:flex-row justify-start items-center sm:items-start">
			<div className="sm:ml-5 w-full sm:w-max h-max ">
				<div className="hidden sm:block bg-gray-900 mt-0 w-max space-y-4 px-8 py-4 shadow-lg flex-shrink-0">
					<p to={ `/user/${ userData.username }/dashboard` } className="cursor-pointer text-lg font-normal" onClick={ () => setFilter('') }>All Snippets</p>
					{ userData.folders.length ? <div>
						<h3 className="text-md font-normal">Folders</h3>
						<ul className="ml-2 text-sm space-y-1">
							{ userData.folders.sort((a, b) => a.title.toUpperCase() < b.title.toUpperCase() ? -1 : 1).map(folder => {
								return <li className={ `my-1 cursor-pointer py-1 px-2 w-max ${ filter === folder._id ? 'hover:text-gray-50 bg-gradient-to-tr from-darkBlue to-red-800 text-gray-50 rounded-md' : 'hover:text-red-600' }` } id={ folder._id } onClick={ handleFilter } key={ folder._id }>{ folder.title }</li>
							}) }
						</ul>
					</div>
						: null }
				</div>
				<div className="sm:hidden bg-gray-900 -mt-4 w-full py-2 shadow-lg flex justify-evenly items-center">
					<label className="hidden" htmlFor="snippetFilter">Filter by folder</label>
					<select value={ filter } name="snippetFilter" onChange={ handleFilter } className="form-select bg-gray-900 w-3/4 tracking-widest">
						<option value="">All Snippets</option>
						{ userData.folders.sort((a, b) => a.title.toUpperCase() < b.title.toUpperCase() ? -1 : 1).map(folder => {
							return <option value={ folder._id } key={ folder._id }>{ folder.title }</option>
						}) }
					</select>
					<div className="sm:hidden">
						<Link to={ `/user/${ userData.username }/dashboard/addsnippet` } onClick={ handleAddSnippet } className="btn-primary flex justify-center items-center px-2 py-2">
							<svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M8.47266 2.52344H9.52734C9.62109 2.52344 9.66797 2.56771 9.66797 2.65625V14.3438C9.66797 14.4323 9.62109 14.4766 9.52734 14.4766H8.47266C8.37891 14.4766 8.33203 14.4323 8.33203 14.3438V2.65625C8.33203 2.56771 8.37891 2.52344 8.47266 2.52344Z" fill="#D5D5D5" />
								<path d="M3.09375 7.86914H14.9062C15 7.86914 15.0469 7.91341 15.0469 8.00195V8.99805C15.0469 9.08659 15 9.13086 14.9062 9.13086H3.09375C3 9.13086 2.95312 9.08659 2.95312 8.99805V8.00195C2.95312 7.91341 3 7.86914 3.09375 7.86914Z" fill="#D5D5D5" />
							</svg>
						</Link>
					</div>
				</div>
				<div className="hidden sm:flex mt-4 justify-center">
					<Link to={ `/user/${ userData.username }/dashboard/addsnippet` } onClick={ handleAddSnippet } className="btn-primary flex justify-center items-center">
						<svg className="mr-1" width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M8.47266 2.52344H9.52734C9.62109 2.52344 9.66797 2.56771 9.66797 2.65625V14.3438C9.66797 14.4323 9.62109 14.4766 9.52734 14.4766H8.47266C8.37891 14.4766 8.33203 14.4323 8.33203 14.3438V2.65625C8.33203 2.56771 8.37891 2.52344 8.47266 2.52344Z" fill="#D5D5D5" />
							<path d="M3.09375 7.86914H14.9062C15 7.86914 15.0469 7.91341 15.0469 8.00195V8.99805C15.0469 9.08659 15 9.13086 14.9062 9.13086H3.09375C3 9.13086 2.95312 9.08659 2.95312 8.99805V8.00195C2.95312 7.91341 3 7.86914 3.09375 7.86914Z" fill="#D5D5D5" />
						</svg>
						<p className="mr-2">Snippet</p>
					</Link>
				</div>
			</div>
			<div className="sm:ml-3 w-full">
				<Switch>
					<Route path="/user/:username/dashboard/addsnippet" component={ SnippetForm } />
					<Route path="/user/:username/dashboard/" component={ SnippetView } />
				</Switch>
			</div>
		</div>
	)
}