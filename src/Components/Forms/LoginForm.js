import { useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { DataContext } from '../../App'

export default function LoginForm({ setSlide }) {
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
				else history.push(`/user/${data.username}/dashboard`)
			}
			setFormData({ username: "", password: "" })
		} catch (err) {
			console.error(err)
		}
	}

	return (
		<div className="absolute right-0">
			<form onSubmit={handleSubmit}>
				<div className="flex flex-col items-start h-96 justify-center mr-14 text-gray-900 lg:mr-24">
					<label className="w-full">
						Username:
							<input className="bg-gray-50 border border-gray-500 w-full px-2 py-1" onChange={handleChange} value={formData.username} id="username" type="text" autoComplete="username" />
					</label>
					<label className="w-full">
						Password:
							<input className="bg-gray-50 border border-gray-500 w-full px-2 py-1" onChange={handleChange} value={formData.password} id="password" type="password" autoComplete="current-password" />
					</label>
					<div className="flex mt-5">
						<button type="submit" className="bg-darkBlue tracking-widest rounded-md shadow-md px-8 py-2 mr-4 text-sm text-gray-50 font-thin">Login</button>
						<p onClick={() => setSlide('')} className="cursor-pointer bg-transparent tracking-widest rounded-md border border-darkBlue px-2 py-2 text-sm text-darkBlue font-thin">Cancel</p>
					</div>
				</div>
			</form>
		</div>


	)
}