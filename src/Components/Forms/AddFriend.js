import { useState, useContext } from 'react'
import { DataContext } from '../../App'
import { requestFriend } from '../../API/apiData'

export default function AddFriend({ username, setShowAddFriend }) {
	const [ formData, setFormData ] = useState({ username: '' })
	const { BASE_URL } = useContext(DataContext)
	const [ showConfirmation, setShowConfirmation ] = useState(false)
	const [ error, setError ] = useState(false)

	const handleChange = (e) => {
		setFormData({ ...formData, [ e.target.id ]: e.target.value })
	}

	// add friend to requests list
	const handleSubmit = async (e) => {
		e.preventDefault()
		const token = window.localStorage.getItem('token')
		const data = await requestFriend(BASE_URL, username, token, formData.username)
		if (data.error) {
			setError(true)
			setTimeout(() => setError(false), 3000)
		} else {
			setShowConfirmation(true)
			setTimeout(() => setShowConfirmation(false), 3000)
		}
		setFormData({ username: '' })
	}

	if (showConfirmation) {
		return <h2 className="text-sm text-green-500 w-48">Request Sent!</h2>
	} else if (error) {
		return <h2 className="text-sm text-red-500 w-48">User not found</h2>
	} else {
		return (
			<form noValidate onSubmit={ handleSubmit }>
				<div className="font-thin tracking-wider text-xs text-gray-50 flex items-baseline justify-evenly h-full sm:w-48">
					<label className="">
						<input onChange={ handleChange } value={ formData.username } className="p-0 m-0 mt-2 focus:ring-0 border-0 border-b border-gray-200 bg-transparent text-sm font-thin tracking-widest w-full" id="username" type="text" spellCheck={ false } autoComplete="off" />
						Username
					</label>
					<button className="btn-primary p-1 ml-4 text-xs" type="submit">Add</button>
					<button onClick={ () => setShowAddFriend(false) } className="sm:hidden btn-secondary p-1 ml-4 text-xs">Cancel</button>
				</div>
			</form>
		)
	}
}