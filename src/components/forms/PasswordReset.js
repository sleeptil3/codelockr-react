import { useState } from "react"
import { editUser } from "../../common/api"
import ProfileField from "./ProfileField"

export default function PasswordReset({ setEditPassword, username }) {
	const [passwordData, setPasswordData] = useState({
		username: username,
		password: "",
		confirmPassword: "",
	})
	const [error, setError] = useState(false)

	const handlePassword = e => {
		const { id, value } = e.target
		setPasswordData({ ...passwordData, [id]: value })
	}

	const handleSubmit = async e => {
		e.preventDefault()
		if (passwordData.password === passwordData.confirmPassword) {
			const token = window.localStorage.getItem("token")
			await editUser(username, token, { password: passwordData.password })
			setPasswordData({
				username: username,
				password: "",
				confirmPassword: "",
			})
			setEditPassword(false)
		} else {
			setError(true)
			setPasswordData({
				username: username,
				password: "",
				confirmPassword: "",
			})
		}
	}

	const handleCancel = e => {
		setPasswordData({
			username: username,
			password: "",
			confirmPassword: "",
		})
		setEditPassword(false)
	}

	return (
		<div>
			<form noValidate onSubmit={handleSubmit} className="mt-2">
				<div>
					<h1 className="mb-6 text-base font-bold">Reset Password</h1>
					{error ? (
						<p className="text-red-700">
							<span className="font-bold">Error</span>: Password fields do not match
						</p>
					) : null}
				</div>
				<div className="space-y-8 sm:space-y-4">
					<input
						className="hidden"
						type="text"
						value={passwordData.username}
						readOnly
						name="username"
						id="username"
					/>
					<ProfileField
						editMode={true}
						type="password"
						autoComplete="new-password"
						field="New Password"
						id="password"
						handleChange={handlePassword}
						value={passwordData.password}
					/>
					<ProfileField
						editMode={true}
						type="password"
						autoComplete="new-password"
						field="Confirm Password"
						id="confirmPassword"
						handleChange={handlePassword}
						value={passwordData.confirmPassword}
					/>
				</div>
				<div className="mt-8 flex items-baseline justify-end">
					<p
						className="cursor-pointer btn-secondary py-2 sm:text-sm text-xs mr-4"
						onClick={handleCancel}
					>
						Cancel
					</p>
					<button className="btn-primary py-2 sm:text-sm text-xs" type="submit">
						Update
					</button>
				</div>
			</form>
		</div>
	)
}
