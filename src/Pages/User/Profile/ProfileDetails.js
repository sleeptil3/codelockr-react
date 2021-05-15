import { useContext, useState } from 'react'
import { UserContext } from '../User'
import { DataContext } from '../../../App'
import { editUser } from '../../../API/apiData'
import ProfileField from '../../../Components/Forms/ProfileField'
import PasswordReset from './PasswordReset'

export default function ProfileDetails() {
	const { userData, refreshTrigger, setRefreshTrigger } = useContext(UserContext)
	const { BASE_URL } = useContext(DataContext)
	const [editMode, setEditMode] = useState(false)
	const [editPassword, setEditPassword] = useState(false)
	const [formData, setFormData] = useState({
		firstName: userData.firstName,
		lastName: userData.lastName,
		username: userData.username,
		email: userData.email
	})

	const handleChange = (e) => {
		const { id, value } = e.target
		setFormData({ ...formData, [id]: value })
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		const token = window.localStorage.getItem('token')
		const username = userData.username
		editUser(BASE_URL, username, token, formData)
		setRefreshTrigger(!refreshTrigger)
		setEditMode(false)
	}

	return (
		<div>
			{!editPassword ?
				<div>
					<form onSubmit={handleSubmit} className="border border-gray-500 rounded-lg p-5 shadow-lg">
						<div>
							<h1 className="mb-6 text-lg font-bold">Profile Details</h1>
						</div>
						<div className="space-y-4">
							<ProfileField editMode={editMode} field="Username" type="text" autoComplete="off" id="username" handleChange={handleChange} value={formData.username} data={userData.username} />
							<ProfileField editMode={editMode} field="First Name" type="text" autoComplete="off" id="firstName" handleChange={handleChange} value={formData.firstName} data={userData.firstName} />
							<ProfileField editMode={editMode} field="Last Name" type="text" autoComplete="off" id="lastName" handleChange={handleChange} value={formData.lastName} data={userData.lastName} />
							<ProfileField editMode={editMode} field="Email" type="text" autoComplete="off" id="email" handleChange={handleChange} value={formData.email} data={userData.email} />
						</div>
						{editMode ? <button className="btn-primary mt-8" type="submit">Save</button> : null}
					</form>
					<div className="flex space-x-4 mt-8 items-baseline">
						{!editMode ? <button onClick={() => setEditMode(true)} className="focus:outline-none btn-primary">Edit Profile</button>
							: <button onClick={() => setEditMode(false)} className="focus:outline-none btn-secondary">Cancel</button>
						}
						<p className="transform transition-transform hover:scale-105 cursor-pointer text-sm" onClick={() => setEditPassword(true)}>Reset Password</p>
					</div>
				</div>
				: <PasswordReset username={userData.username} setEditPassword={setEditPassword} BASE_URL={BASE_URL} />
			}
		</div>
	)
}
