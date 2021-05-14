import { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { DataContext } from '../../../App'
import { UserContext } from '../User'
import { deleteUser } from '../../../API/apiData'

export default function DeleteProfile() {
	const history = useHistory()
	const { userData } = useContext(UserContext)
	const { BASE_URL } = useContext(DataContext)

	const handleDelete = async () => {
		const token = window.localStorage.getItem('token')
		const res = await deleteUser(BASE_URL, userData.username, token)
		console.log(res)
		history.push('/')
	}
	return (
		<div>
			<h1 className="mb-6 text-lg font-bold">DELETE PROFILE</h1>
			<p className=""><span className="text-red-700 font-bold">CAUTION</span>: THIS IS NOT REVERSABLE and your data will not be retrieved after deletion.</p>
			<p>I am very sorry to see you go, and I hope you enjoyed your time here at Codelockrs, even though you are, it seems.  a quitter....</p>
			<button className="focus:ring-0 btn-primary px-2 py-1 item-grow-0 mt-4 bg-red-600" onClick={handleDelete}>Yes, I'm sure!</button>
			<button className="ml-10 focus:ring-0 btn-primary px-2 py-1 item-grow-0 mt-4 bg-darkBlue" onClick={() => history.push('/')}>No, take me back!</button>
		</div >
	)
}
