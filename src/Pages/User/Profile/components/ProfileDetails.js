import { useContext, useState } from "react"
import { UserContext } from "../.."
import { editUser } from "../../../../common/api"
import ProfileField from "../../../../Components/Forms/ProfileField"
import PasswordReset from "./PasswordReset"

export default function ProfileDetails() {
	const { userData } = useContext(UserContext)
	const [editMode, setEditMode] = useState(false)
	const [editPassword, setEditPassword] = useState(false)
	const [formData, setFormData] = useState({
		firstName: userData.firstName,
		lastName: userData.lastName,
		username: userData.username,
		email: userData.email,
	})

	const handleChange = e => {
		const { id, value } = e.target
		setFormData({ ...formData, [id]: value })
	}

	// check if anything needs handled after changing user data - MAY have to refetch because of username change in the URL
	const handleSubmit = async e => {
		e.preventDefault()
		const token = window.localStorage.getItem("token")
		const username = userData.username
		const data = await editUser(username, token, formData)
		if (formData.username !== username) {
			window.localStorage.setItem("token", data.token)
			window.localStorage.setItem("username", formData.username)
		}
		setEditMode(false)
	}

	return (
		<div>
			{!editPassword ? (
				<div>
					<form onSubmit={handleSubmit} className="rounded-lg">
						<div>
							<h1 className="mb-6 text-lg font-bold">Profile Details</h1>
						</div>
						<div className="space-y-4">
							<ProfileField
								editMode={editMode}
								field="Username"
								type="text"
								autoComplete="off"
								id="username"
								handleChange={handleChange}
								value={formData.username}
								data={userData.username}
							/>
							<ProfileField
								editMode={editMode}
								field="First Name"
								type="text"
								autoComplete="off"
								id="firstName"
								handleChange={handleChange}
								value={formData.firstName}
								data={userData.firstName}
							/>
							<ProfileField
								editMode={editMode}
								field="Last Name"
								type="text"
								autoComplete="off"
								id="lastName"
								handleChange={handleChange}
								value={formData.lastName}
								data={userData.lastName}
							/>
							<ProfileField
								editMode={editMode}
								field="Email"
								type="text"
								autoComplete="off"
								id="email"
								handleChange={handleChange}
								value={formData.email}
								data={userData.email}
							/>
						</div>
						{editMode ? (
							<div className="text-right space-x-4">
								<button
									onClick={() => setEditMode(false)}
									className="btn-secondary py-2 sm:text-sm text-xs"
								>
									Cancel
								</button>
								<button className="btn-primary mt-8" type="submit">
									Save
								</button>
							</div>
						) : null}
					</form>
					<div className="flex space-x-7 mt-8 justify-between items-baseline">
						{!editMode ? (
							<>
								<p
									className="transition hover:text-red-500 cursor-pointer py-2 sm:text-sm text-xs"
									onClick={() => setEditPassword(true)}
								>
									Reset Password
								</p>
								<button onClick={() => setEditMode(true)} className="btn-primary py-2">
									Edit Profile
								</button>
							</>
						) : null}
					</div>
				</div>
			) : (
				<PasswordReset username={userData.username} setEditPassword={setEditPassword} />
			)}
		</div>
	)
}
