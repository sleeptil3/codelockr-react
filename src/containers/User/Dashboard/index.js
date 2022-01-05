import { useContext } from "react"
import { Route, Routes, Link } from "react-router-dom"

import SnippetForm from "../../../components/forms/SnippetForm"
import SnippetView from "../../../components/SnippetView"

import { AppContext } from "../../../App"
import {
	APP_ACTION_CLEAR_FOLDER_FILTER,
	APP_ACTION_SET_FOLDER_FILTER,
	APP_ACTION_SET_SNIPPET_FORM,
	APP_ACTION_SET_SUBMIT_MODE,
} from "../../../state/actions"
import LoadingRing from "../../../components/LoadingRing"
import { DEFAULT_SNIPPET_FORM } from "../../../common/constants"

export default function UserDashboard() {
	const { appState, dispatchAppState } = useContext(AppContext)
	const { userData, searchFilter } = appState

	const handleFilter = e => {
		e.preventDefault()
		if (e.target.type === "select-one")
			dispatchAppState(APP_ACTION_SET_FOLDER_FILTER(e.target.value))
		else dispatchAppState(APP_ACTION_SET_FOLDER_FILTER(e.target.id))
	}

	const handleAddSnippet = () => {
		dispatchAppState(APP_ACTION_SET_SNIPPET_FORM(DEFAULT_SNIPPET_FORM))
		dispatchAppState(APP_ACTION_SET_SUBMIT_MODE("POST"))
		dispatchAppState(APP_ACTION_CLEAR_FOLDER_FILTER())
	}

	return !!userData.username ? (
		<div className="flex flex-col sm:flex-row justify-start items-center sm:items-start">
			<div className="sm:ml-5 w-full sm:w-max h-max ">
				<div className="hidden sm:block bg-gray-900 mt-0 w-min space-y-4 px-6 py-3 shadow-lg shrink-0">
					<Link
						to={`/user/${userData.username}/dashboard`}
						className="cursor-pointer text-base font-normal"
						onClick={() => dispatchAppState(APP_ACTION_CLEAR_FOLDER_FILTER())}
					>
						All Snippets
					</Link>
					{!!userData.folders.length ? (
						<div>
							<h3 className="text-md font-normal">Folders</h3>
							<ul className="ml-2 text-xs space-y-1">
								{[...userData.folders]
									.sort((a, b) => (a.title.toUpperCase() < b.title.toUpperCase() ? -1 : 1))
									.map(folder => {
										return (
											<li
												className={`my-1 cursor-pointer py-1 px-2 w-max ${
													searchFilter === folder._id
														? "hover:text-gray-50 bg-gradient-to-tr from-darkBlue to-red-800 text-gray-50 rounded-md"
														: "hover:text-red-600"
												}`}
												id={folder._id}
												onClick={handleFilter}
												key={folder._id}
											>
												{folder.title}
											</li>
										)
									})}
							</ul>
						</div>
					) : null}
				</div>
				<div className="sm:hidden bg-gray-900 -mt-4 w-full py-2 shadow-lg flex justify-evenly items-center">
					<label className="hidden" htmlFor="snippetFilter">
						Filter by folder
					</label>
					<select
						value={searchFilter}
						name="snippetFilter"
						onChange={handleFilter}
						className="form-select bg-gray-900 w-3/4 tracking-widest"
					>
						<option value="">All Snippets</option>
						{[...userData.folders]
							.sort((a, b) => (a.title.toUpperCase() < b.title.toUpperCase() ? -1 : 1))
							.map(folder => {
								return (
									<option value={folder._id} key={folder._id}>
										{folder.title}
									</option>
								)
							})}
					</select>
					<div className="sm:hidden">
						<Link
							to={`/user/${userData.username}/dashboard/addsnippet`}
							onClick={handleAddSnippet}
							className="btn-primary flex justify-center items-center px-2 py-2"
						>
							<svg
								width="17"
								height="17"
								viewBox="0 0 17 17"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M8.47266 2.52344H9.52734C9.62109 2.52344 9.66797 2.56771 9.66797 2.65625V14.3438C9.66797 14.4323 9.62109 14.4766 9.52734 14.4766H8.47266C8.37891 14.4766 8.33203 14.4323 8.33203 14.3438V2.65625C8.33203 2.56771 8.37891 2.52344 8.47266 2.52344Z"
									fill="#D5D5D5"
								/>
								<path
									d="M3.09375 7.86914H14.9062C15 7.86914 15.0469 7.91341 15.0469 8.00195V8.99805C15.0469 9.08659 15 9.13086 14.9062 9.13086H3.09375C3 9.13086 2.95312 9.08659 2.95312 8.99805V8.00195C2.95312 7.91341 3 7.86914 3.09375 7.86914Z"
									fill="#D5D5D5"
								/>
							</svg>
						</Link>
					</div>
				</div>
				<div className="hidden sm:flex mt-4 justify-center">
					<Link
						to={`/user/${userData.username}/dashboard/addsnippet`}
						onClick={handleAddSnippet}
						className="btn-primary w-4/6 p-2"
					>
						<div className="flex justify-center items-center">
							<svg
								className="mr-2"
								width={"15"}
								height={"16"}
								viewBox="0 0 15 16"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M13.9463 1.89453C13.1494 1.09766 12.0244 0.972656 10.6885 0.972656H4.60254C3.29004 0.972656 2.16504 1.09766 1.36816 1.89453C0.571289 2.69141 0.454102 3.80859 0.454102 5.11328V11.1445C0.454102 12.4805 0.571289 13.5898 1.36816 14.3867C2.16504 15.1836 3.29004 15.3086 4.61816 15.3086H10.6885C12.0244 15.3086 13.1494 15.1836 13.9463 14.3867C14.7432 13.5898 14.8604 12.4805 14.8604 11.1445V5.13672C14.8604 3.80078 14.7432 2.68359 13.9463 1.89453ZM13.6025 4.91797V11.3555C13.6025 12.168 13.501 12.9961 13.0244 13.4727C12.5557 13.9414 11.7119 14.0508 10.9072 14.0508H4.40723C3.60254 14.0508 2.75879 13.9414 2.28223 13.4727C1.81348 12.9961 1.71191 12.168 1.71191 11.3555V4.94141C1.71191 4.12109 1.81348 3.27734 2.28223 2.80859C2.75879 2.33203 3.61035 2.23047 4.43066 2.23047H10.9072C11.7119 2.23047 12.5557 2.33984 13.0244 2.80859C13.501 3.28516 13.6025 4.11328 13.6025 4.91797ZM4.21973 8.13672C4.21973 8.51953 4.48535 8.77734 4.88379 8.77734H7.00879V10.9102C7.00879 11.3008 7.2666 11.5664 7.64941 11.5664C8.04004 11.5664 8.31348 11.3008 8.31348 10.9102V8.77734H10.4385C10.8291 8.77734 11.1025 8.51953 11.1025 8.13672C11.1025 7.74609 10.8369 7.47266 10.4385 7.47266H8.31348V5.35547C8.31348 4.94922 8.04004 4.68359 7.64941 4.68359C7.2666 4.68359 7.00879 4.95703 7.00879 5.35547V7.47266H4.88379C4.48535 7.47266 4.21973 7.74609 4.21973 8.13672Z"
									fill="white"
								/>
							</svg>
							<p className="">Snippet</p>
						</div>
					</Link>
				</div>
			</div>
			<div className="sm:ml-3 w-full">
				<Routes>
					<Route path="dashboard/addsnippet" element={<SnippetForm />} />
					<Route path="dashboard" element={<SnippetView />} />
				</Routes>
			</div>
		</div>
	) : (
		<LoadingRing classes={"w-max h-max"} />
	)
}
