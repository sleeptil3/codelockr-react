import { useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { DataContext } from '../../App'

export default function LoginForm({ setShowLogin }) {
	const { BASE_URL, setLoggedIn } = useContext(DataContext)
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
				else history.push(`/user/${data.username}`)
			}
			setFormData({ username: "", password: "" })
		} catch (err) {
			console.error(err)
		}
	}

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<div className="flex flex-row justify-end items-end">
					<div className="flex flex-col">
						<label id="username" className="mx-4">
							Username:
							<input className="border border-gray-500 w-full px-2 py-1" onChange={handleChange} value={formData.username} id="username" type="text" autoComplete="username" />
						</label>
					</div>
					<div className="flex flex-col">
						<label id="password" className="mx-4">
							Password:
							<input className="border border-gray-500 w-full px-2 py-1" onChange={handleChange} value={formData.password} id="password" type="password" autoComplete="current-password" />
						</label>
					</div>
					<div className="flex flex-col">
						<label id="submit">
							<button className="p-1 mx-4 border border-gray-100 hover:bg-gray-50 hover:text-gray-800" type="submit">Login</button>
						</label>
					</div>
					<div className="p-1 mx-2 mr-10 cursor-pointer border border-gray-100 hover:bg-gray-50 hover:text-gray-800">
						<p onClick={() => setShowLogin(false)}>Cancel</p>
					</div>
				</div>
			</form>
		</div>


	)
}