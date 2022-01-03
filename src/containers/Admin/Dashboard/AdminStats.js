import { useState, useEffect } from "react"
import { getAdminCounts } from "../../../common/api"

export default function AdminStats() {
	const [countData, setCountData] = useState({})

	useEffect(() => {
		const fetchData = async () => {
			const data = await getAdminCounts(window.localStorage.getItem("token"))
			setCountData({ ...data })
		}
		fetchData()
	}, [])

	return (
		<div className="text-gray-50 mt-8 sm:mt-0">
			<div className="flex flex-col sm:flex-flow">
				<div className="w-screen sm:w-auto">
					<div className="flex flex-col space-y-2 sm:border-2≈ border-t-4 border-green-700 bg-gray-900 sm:rounded-xl sm:w-max sm:px-4 py-4 shadow-md">
						<h2 className="px-12 sm:px-6 text-xl sm:text-2xl font-bold uppercase sm:mt-0">Stats</h2>
						<div className="px-12 flex space-x-5 justify-between items-baseline">
							<h3 className="text-lg sm:text-xl">User Count:</h3>
							<h4 className="text-lg sm:text-xl font-black">{countData.userCount}</h4>
						</div>
						<div className="px-12 flex space-x-5 justify-between items-baseline">
							<h3 className="text-lg sm:text-xl">Snippet Count:</h3>
							<h4 className="text-lg sm:text-xl font-black">{countData.snippetCount}</h4>
						</div>
						<div className="px-12 flex space-x-5 justify-between items-baseline">
							<h3 className="text-lg sm:text-xl">Folder Count:</h3>
							<h4 className="text-lg sm:text-xl font-black">{countData.folderCount}</h4>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
