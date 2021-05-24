import { v4 as uuid } from 'uuid'
import { useContext, useState, useEffect } from 'react'
import Snippet from '../../../Components/Snippet'
import { getFriendSnippets } from '../../../API/apiData'
import { UserContext } from '../User'
import { DataContext } from '../../../App'

export default function View({ filter, setFilter }) {
	const { userData } = useContext(UserContext)
	const { BASE_URL } = useContext(DataContext)
	const [snippetData, setSnippetData] = useState([])
	const [search, setSearch] = useState("")

	const handleChange = (e) => {
		setSearch(e.target.value)
	}

	const handleClear = () => {
		setSearch('')
	}

	useEffect(() => {
		const token = window.localStorage.getItem('token')
		if (userData.friends.length) {
			const getSnippets = async () => {
				const data = await getFriendSnippets(BASE_URL, userData.username, token)
				if (data.length) setSnippetData([...data])
			}
			getSnippets()
		}
		window.scrollTo(0, 0)
	}, [userData])

	useEffect(() => {
		window.scrollTo(0, 0)
		setFilter('')
	}, [])

	return (
		<div className="mt-4 sm:mt-0 sm:ml-2">
			{userData.friends.length ? <><h1 className="ml-6 sm:ml-0 text-lg sm:text-2xl font-bold">{filter ? `${userData.friends.find(friend => friend._id === filter).firstName} 's Shared Snippets` : "All Shared Snippets"}</h1>
				<div className="ml-6 sm:ml-0 my-4 flex items-center">
					<svg className=" cursor-pointer inline mr-3" width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M27.9159 25.9874L18.8264 16.8979C20.2369 15.0744 20.9999 12.8449 20.9999 10.5C20.9999 7.69297 19.9044 5.06098 17.9234 3.07649C15.9424 1.09199 13.3034 0 10.5 0C7.69647 0 5.05748 1.09549 3.07649 3.07649C1.09199 5.05748 0 7.69297 0 10.5C0 13.3034 1.09549 15.9424 3.07649 17.9234C5.05748 19.9079 7.69297 20.9999 10.5 20.9999C12.8449 20.9999 15.0709 20.2369 16.8944 18.8299L25.9839 27.9159C26.0105 27.9425 26.0422 27.9637 26.077 27.9781C26.1118 27.9926 26.1492 28 26.1869 28C26.2246 28 26.2619 27.9926 26.2968 27.9781C26.3316 27.9637 26.3632 27.9425 26.3899 27.9159L27.9159 26.3934C27.9425 26.3667 27.9637 26.3351 27.9781 26.3003C27.9926 26.2654 28 26.2281 28 26.1904C28 26.1527 27.9926 26.1153 27.9781 26.0805C27.9637 26.0457 27.9425 26.014 27.9159 25.9874ZM16.0439 16.0439C14.5599 17.5244 12.5929 18.3399 10.5 18.3399C8.40696 18.3399 6.43997 17.5244 4.95598 16.0439C3.47549 14.5599 2.65999 12.5929 2.65999 10.5C2.65999 8.40696 3.47549 6.43647 4.95598 4.95598C6.43997 3.47549 8.40696 2.65999 10.5 2.65999C12.5929 2.65999 14.5634 3.47199 16.0439 4.95598C17.5244 6.43997 18.3399 8.40696 18.3399 10.5C18.3399 12.5929 17.5244 14.5634 16.0439 16.0439Z" fill="#F9FAFB" />
					</svg>
					<div>
						<input className="focus:ring-0 focus:outline-none bg-transparent border-2 border-gray-700 text-md px-1 py-1" type="text" onChange={handleChange} value={search} />
					</div>
					{search ? <span className="cursor-pointer ml-3" onClick={handleClear}>Clear</span> : null}
				</div>
			</>
				: <div><h1 className="text-2xl font-bold ml-8">Find Friends</h1> <h3 className="text-xl font-light mt-8 ml-8">Get started by adding a friend now!</h3></div>}
			<div className="grid gap-5 sm:gap-10 mt-6 sm:mt-8 sm:pr-8 grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3">
				{snippetData.filter(snippet => {
					return snippet.title.toUpperCase().includes(search.toUpperCase()) && snippet.owner._id.includes(filter)
				}).map(snippet => {
					return <Snippet key={uuid()} readOnly={true} owner={`${snippet.owner.firstName} ${snippet.owner.lastName}`} title={snippet.title} code={snippet.code} snippet_id={snippet._id} parentFolder={snippet.parentFolder} parseFormat={snippet.parseFormat} notes={snippet.notes} />
				})}
			</div>
		</div>
	)
}
