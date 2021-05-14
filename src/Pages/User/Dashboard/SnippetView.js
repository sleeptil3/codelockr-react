import { v4 as uuid } from 'uuid'
import { useContext, useState, useEffect } from 'react'
import Snippet from '../../../Components/Snippet'
import { getAllSnippets } from '../../../API/apiData'
import { UserContext } from '../User'
import { DataContext } from '../../../App'

export default function SnippetView() {
	const { userData, filter, setFilter } = useContext(UserContext)
	const { BASE_URL } = useContext(DataContext)
	const [snippetData, setSnippetData] = useState([])

	useEffect(() => {
		const token = window.localStorage.getItem('token')
		const getSnippets = async () => {
			const data = await getAllSnippets(BASE_URL, userData.username, token, userData._id)
			if (filter) setSnippetData([...data.filter(snippet => snippet.parentFolder === filter)])
			else setSnippetData([...data])
		}
		getSnippets()
		window.scrollTo(0, 0)
	}, [filter])

	useEffect(() => {
		window.scrollTo(0, 0)
		setFilter("")
	}, [])

	return (
		<div className="mt-20">
			{userData.folders.length ? <h1 className="text-2xl font-bold mt-8 ml-8">{filter ? userData.folders.find(folder => folder._id === filter).title : "All Snippets"}</h1>
				: <div><h1 className="text-2xl font-bold mt-8 ml-8">Welcome</h1> <h3 className="text-xl font-light mt-8 ml-8">Get started by creating your first snippet!</h3></div>}
			<div className="grid gap-10 p-5 w-full grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3">
				{snippetData.map(snippet => {
					return <Snippet key={uuid()} title={snippet.title} code={snippet.code} snippet_id={snippet._id} parentFolder={snippet.parentFolder} parseFormat={snippet.parseFormat} notes={snippet.notes} />
				})}
			</div>
		</div>
	)
}
