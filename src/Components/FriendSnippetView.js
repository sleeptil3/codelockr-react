import { useContext, useState, useEffect, useLayoutEffect } from "react"
import { useNavigate } from "react-router-dom"
import hljs from "highlight.js"

import Snippet from "./Snippet"
import { objectHasData } from "../utils"
import LoadingRing from "./LoadingRing"

import { AppContext } from "../App"

export default function FriendSnippetView({ friendFilter, setFriendFilter }) {
	const { appState } = useContext(AppContext)
	const { userData, friendSnippets } = appState
	const { friends } = userData

	const [search, setSearch] = useState("")
	const navigate = useNavigate()

	const handleChange = e => setSearch(e.target.value)
	const handleClear = () => setSearch("")

	useEffect(() => {
		window.scrollTo(0, 0)
		setFriendFilter("")
	}, [navigate, setFriendFilter])

	useLayoutEffect(() => {
		hljs.highlightAll()
	})

	return objectHasData(userData) ? (
		<div className="mt-4 sm:mt-0 sm:ml-2">
			{!!friends.length ? (
				<>
					<h1 className="ml-6 sm:ml-0 text-base sm:text-xl font-bold">
						{friendFilter
							? `${
									friends.find(friend => friend._id === friendFilter).firstName
							  } 's Shared Snippets`
							: "All Shared Snippets"}
					</h1>
					<div className="relative ml-6 sm:ml-0 my-4 flex items-center">
						<svg
							className="absolute left-2 h-6 sm:h-auto cursor-pointer inline mr-2 sm:mr-4"
							width="29"
							height="29"
							viewBox="0 0 29 29"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								className="text-gray-600 fill-current"
								d="M14.3926 28.0742C22.0215 28.0742 28.3379 21.7441 28.3379 14.1289C28.3379 6.5 22.0078 0.183594 14.3789 0.183594C6.76367 0.183594 0.447266 6.5 0.447266 14.1289C0.447266 21.7441 6.77734 28.0742 14.3926 28.0742ZM14.3926 25.75C7.93945 25.75 2.78516 20.582 2.78516 14.1289C2.78516 7.67578 7.92578 2.50781 14.3789 2.50781C20.832 2.50781 26 7.67578 26.0137 14.1289C26.0273 20.582 20.8457 25.75 14.3926 25.75ZM12.9023 18.2441C14.0098 18.2441 15.0488 17.916 15.9238 17.3691L19.4238 20.8555C19.6973 21.1426 19.998 21.2656 20.3945 21.2656C21.0508 21.2656 21.502 20.7871 21.502 20.1035C21.502 19.7891 21.3516 19.502 21.1328 19.2695L17.6055 15.7285C18.2207 14.8262 18.5898 13.7324 18.5898 12.5566C18.5898 9.42578 16.0332 6.86914 12.9023 6.86914C9.77148 6.86914 7.21484 9.43945 7.21484 12.5566C7.21484 15.6738 9.77148 18.2441 12.9023 18.2441ZM12.9023 16.3848C10.8105 16.3848 9.07422 14.6484 9.07422 12.5566C9.07422 10.4648 10.8105 8.72852 12.9023 8.72852C14.9941 8.72852 16.7168 10.4512 16.7168 12.5566C16.7168 14.6484 14.9941 16.3848 12.9023 16.3848Z"
								fill="white"
							/>
						</svg>
						<div className="w-full pr-20 ml-4 sm:ml-0 sm:pr-0 sm:w-auto">
							<input
								placeholder="Filter by title"
								className="tracking-wider placeholder-gray-500 focus:ring-0 focus:outline-none bg-transparent border-2 border-gray-700 text-md pl-11 py-2 w-full"
								type="text"
								onChange={handleChange}
								value={search}
							/>
						</div>
						{search ? (
							<span className="cursor-pointer ml-3" onClick={handleClear}>
								Clear
							</span>
						) : null}
					</div>
				</>
			) : (
				<div>
					<h1 className="text-xl font-bold ml-8">Find Friends</h1>
					<h3 className="text-lg font-light mt-8 ml-8">Get started by adding a friend now!</h3>
				</div>
			)}
			<div className="grid gap-5 sm:gap-10 mt-6 sm:mt-8 sm:pr-8 grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3">
				{friendSnippets
					.filter(snippet => {
						return (
							snippet.title.toUpperCase().includes(search.toUpperCase()) &&
							snippet.owner._id.includes(friendFilter)
						)
					})
					.map(snippet => {
						return (
							<Snippet
								key={snippet._id}
								readOnly={true}
								owner={`${snippet.owner.firstName} ${snippet.owner.lastName}`}
								title={snippet.title}
								code={snippet.code}
								snippet_id={snippet._id}
								parentFolder={snippet.parentFolder}
								parseFormat={snippet.parseFormat}
								notes={snippet.notes}
							/>
						)
					})}
			</div>
		</div>
	) : (
		<LoadingRing />
	)
}
