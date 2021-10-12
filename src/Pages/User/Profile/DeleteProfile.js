import { useContext } from 'react'
import { useHistory, Link } from 'react-router-dom'
import { DataContext } from '../../../App'
import { UserContext } from '../User'
import { deleteUser } from '../../../API/apiData'

export default function DeleteProfile() {
	const history = useHistory()
	const { userData } = useContext(UserContext)
	const { BASE_URL, setLoggedIn } = useContext(DataContext)

	const handleDelete = async () => {
		const token = window.localStorage.getItem('token')
		await deleteUser(BASE_URL, userData.username, token)
		window.localStorage.clear()
		setLoggedIn({
			state: false,
			isAdmin: false,
			username: "",
			firstName: "",
			lastName: ""
		})
		history.push('/')
	}

	return (
		<div className="space-y-8 tracking-wide mr-8">
			<h1 className="mb-6 text-base font-bold">Delete Profile</h1>
			<p><span className="text-red-500 font-bold">CAUTION</span>: <strong>THIS IS NOT REVERSABLE</strong> and your data cannot be retrieved after deletion.</p>
			<p>If there is anything we could have done better at <strong className="tracking-widest font-black">CODELOCKR</strong>, please <Link className="underline" to="#">let us know</Link>!</p>
			<div className="flex justify-between mt-4">
				<button className="focus:ring-0 btn-secondary px-4 flex-shrink-0 py-2" onClick={ () => history.push(`/user/${ userData.username }/dashboard`) }>No, take me back!</button>
				<button className="focus:ring-0 btn-primary px-2 py-1 flex-shrink-0 bg-none bg-red-600" onClick={ handleDelete }>Yes, I'm sure!</button>
			</div>
		</div>
	)
}
