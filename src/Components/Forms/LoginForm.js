import { useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { DataContext } from '../../App'

export default function LoginForm({ setSlide }) {
	const { BASE_URL, setLoggedIn } = useContext(DataContext)
	const history = useHistory()
	const [formData, setFormData] = useState({ username: "", password: "" })
	const [error, setError] = useState(false)
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
			setFormData({ username: "", password: "" })
			if (data.token && data.username) {
				window.localStorage.setItem("token", data.token)
				window.localStorage.setItem("username", data.username)
				if (data.username === 'admin') {
					setLoggedIn({
						state: true,
						isAdmin: true,
						username: "admin",
						firstName: "Admin",
						lastName: "Account"
					})
					history.push('/admin/dashboard')
				} else {
					setLoggedIn({
						state: true,
						isAdmin: false,
						username: data.username
					})
					history.push(`/user/${data.username}/dashboard`)
				}
			} else {
				console.error("login error")
				setError(true)
			}
		} catch (err) {
			console.error(err)
		}
	}

	return (
		<div className="absolute right-0">
			<form noValidate onSubmit={handleSubmit}>
				<div className="flex flex-col items-start space-y-3 h-96 mr-14 justify-center lg:mr-28">
					{error ? <h3 className="font-bold text-red-600">Error: Username or Password incorrect</h3> : null}
					<label className="w-full text-gray-50">
						Username:
							<input className="focus:ring-0 w-full px-2 py-1 text-gray-900" onChange={handleChange} value={formData.username} id="username" type="text" autoComplete="username" />
					</label>
					<label className="w-full text-gray-50">
						Password:
							<input className="focus:ring-0 w-full px-2 py-1 mb-4 text-gray-900" onChange={handleChange} value={formData.password} id="password" type="password" autoComplete="current-password" />
					</label>
					<div className="flex space-x-6">
						<button type="submit" className="btn-primary">Login</button>
						<p onClick={() => setSlide('')} className="btn-secondary">Cancel</p>
					</div>
				</div>
			</form>
		</div>
	)
}