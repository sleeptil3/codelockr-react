import { v4 as uuid } from 'uuid'
import { useContext } from 'react'
import { Route, Switch, Link } from 'react-router-dom'
import { UserContext } from '../User'
import SnippetView from './SnippetView'
import SnippetForm from '../../../Components/Forms/SnippetForm'

export default function UserDashboard() {
	const { userData, filter, setFilter } = useContext(UserContext)
	const handleFilter = (e) => {
		setFilter(e.target.id)
	}

	return (
		<div className="flex justify-start items-start w-screen">
			<div className="ml-5 w-max h-max ">
				<div className="bg-gray-900 w-max space-y-4 flex-col px-8 py-4 shadow-lg flex-shrink-0">
					<Link to={`/user/${userData.username}/dashboard`} className="cursor-pointer text-lg font-normal" onClick={() => setFilter('')}>All Snippets</Link>
					{userData.folders.length ? <div>
						<h3 className="text-md font-normal">Folders</h3>
						<ul className="ml-2 text-sm space-y-1">
							{userData.folders.sort((a, b) => a.title.toUpperCase() < b.title.toUpperCase() ? -1 : 1).map(folder => {
								return <li className={`hover:text-red-600 my-1 cursor-pointer py-1 px-2 w-max ${filter === folder._id ? 'hover:text-gray-50 bg-gradient-to-tr from-darkBlue to-red-800 text-gray-50 rounded-md' : ''}`} id={folder._id} onClick={handleFilter} key={uuid()}>{folder.title}</li>
							})}
						</ul>
					</div>
						: null}
				</div>
				<div className="flex mt-4 justify-center">
					<Link to={`/user/${userData.username}/dashboard/addsnippet`} onClick={() => setFilter("")} className="btn-primary flex justify-center items-center">
						<svg className="mr-1" width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M8.47266 2.52344H9.52734C9.62109 2.52344 9.66797 2.56771 9.66797 2.65625V14.3438C9.66797 14.4323 9.62109 14.4766 9.52734 14.4766H8.47266C8.37891 14.4766 8.33203 14.4323 8.33203 14.3438V2.65625C8.33203 2.56771 8.37891 2.52344 8.47266 2.52344Z" fill="#D5D5D5" />
							<path d="M3.09375 7.86914H14.9062C15 7.86914 15.0469 7.91341 15.0469 8.00195V8.99805C15.0469 9.08659 15 9.13086 14.9062 9.13086H3.09375C3 9.13086 2.95312 9.08659 2.95312 8.99805V8.00195C2.95312 7.91341 3 7.86914 3.09375 7.86914Z" fill="#D5D5D5" />
						</svg>
						<p className="mr-2">Snippet</p>
					</Link>
				</div>
			</div>
			<div className="ml-3 w-full">
				<Switch>
					<Route path="/user/:username/dashboard/addsnippet" component={SnippetForm} />
					<Route path="/user/:username/dashboard/" component={SnippetView} />
				</Switch>
			</div>
		</div>
	)
}