import { useState, useEffect, useContext } from 'react'
import { DataContext } from '../../../App'
import { getAdminCounts } from '../../../API/apiData'

export default function AdminStats() {
	const { BASE_URL } = useContext(DataContext)
	const [countData, setCountData] = useState({})

	useEffect(() => {
		const token = window.localStorage.getItem('token')
		const fetchData = async () => {
			const data = await getAdminCounts(BASE_URL, token)
			setCountData({ ...countData, ...data })
		}
		fetchData()
	}, [])

	return (
		<div className="text-gray-50">
			<h2 className="text-3xl font-bold uppercase mb-6">Stats</h2>
			<div className="border-2 border-gray-50 bg-gray-900 rounded-3xl w-max px-8 py-4">
				<div className="flex space-x-5 items-baseline">
					<h3 className="text-2xl">User Count:</h3>
					<h4 className="text-4xl font-black">{countData.userCount}</h4>
				</div>
				<div className="flex space-x-5 items-baseline">
					<h3 className="text-2xl">Snippet Count:</h3>
					<h4 className="text-4xl font-black">{countData.snippetCount}</h4>
				</div>
				<div className="flex space-x-5 items-baseline">
					<h3 className="text-2xl">Folder Count:</h3>
					<h4 className="text-4xl font-black">{countData.folderCount}</h4>
				</div>
			</div>
		</div>
	)
}
