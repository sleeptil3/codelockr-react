import { useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { UserDataContext } from '../../App'

export default function LoginForm() {
	const { BASE_URL, setLoggedIn } = useContext(UserDataContext)
	const history = useHistory()
	const [formData, setFormData] = useState({ username: "", password: "" })

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.id]: e.target.value })
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		try {
			const body = JSON.stringify({ ...formData })
			const response = await fetch(`${BASE_URL}/login`, {
				method: 'POST',
				headers: { "Content-Type": "application/json" },
				body: body
			})
			const data = await response.json()
			if (data.token && data.username) {
				window.localStorage.setItem("token", data.token)
				window.localStorage.setItem("username", data.username)
				setLoggedIn({ username: data.username, token: data.token, state: true })
				if (data.username === 'admin') history.push('/admin/dashboard')
				else history.push(`/user/${data.username}/dashboard`)
			}
			setFormData({ username: "", password: "" })
		} catch (err) {
			console.error(err)
		}
	}

	return (
		<div className="bg-gray-600 absolute right-4 top-4 w-1/4 px-1 py-2 shadow-lg ">
			<div>
				<form onSubmit={handleSubmit}>
					<div className="flex flex-col space-y-2">
						<label id="username" className="mx-4">
							Username:
							<input className="border border-gray-500 w-full px-2 py-1" onChange={handleChange} value={formData.username} id="username" type="text" autoComplete="username" />
						</label>
						<label id="password" className="mx-4">
							Password:
							<input className="border border-gray-500 w-full px-2 py-1" onChange={handleChange} value={formData.password} id="password" type="password" autoComplete="current-password" />
						</label>
						<label id="submit">
							<button className="p-1 mx-4 border border-gray-100 hover:bg-gray-50 hover:text-gray-800" type="submit">Login</button>
						</label>
					</div>
				</form>
			</div>
		</div>


	)
}