import { useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { DataContext } from '../../App'
import loading from '../../images/loading.gif'

export default function LoginForm({ setSlide }) {
	const { BASE_URL, setLoggedIn } = useContext(DataContext)
	const history = useHistory()
	const [formData, setFormData] = useState({ username: "", password: "" })
	const [error, setError] = useState(false)
	const [logginIn, setLoggingIn] = useState(false)
	const [hideLogin, setHideLogin] = useState(false)

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.id]: e.target.value })
	}

	const handleLoading = () => {

	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		setLoggingIn(true)
		setHideLogin(true)
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
					setLoggingIn(false)
					setHideLogin(false)
					history.push('/admin/dashboard')
				} else {
					setLoggedIn({
						state: true,
						isAdmin: false,
						username: data.username
					})
					setLoggingIn(false)
					setHideLogin(false)
					history.push(`/user/${data.username}/dashboard`)
				}
			} else {
				console.error("login error")
				setError(true)
				setHideLogin(false)
				setLoggingIn(false)
			}
		} catch (err) {
			console.error(err)
			setHideLogin(false)
			setLoggingIn(false)
		}
	}

	return (
		<div>
			<div className={logginIn ? "ml-10 mt-4" : "hidden"}>
				<h1 className="text-lg mb-7">Signing In</h1>
				<img className="h-20" src={loading} alt="animated loading graphic" />
				<h1 className="text-md mb-7">Sit tight...</h1>
			</div>
			<form noValidate className={hideLogin ? "hidden" : null} onSubmit={handleSubmit}>
				<div className="flex flex-col items-start space-y-2 justify-center">
					{error ? <h3 className="font-bold text-red-600">Error: Username or Password incorrect</h3> : null}
					<label className="w-full text-gray-50">
						Username:
							<input autoCapitalize="off" className="focus:ring-0 w-full px-2 py-1 text-gray-900 text-sm sm:text-base" onChange={handleChange} value={formData.username} id="username" type="text" autoComplete="username" />
					</label>
					<label className="w-full text-gray-50">
						Password:
							<input className="focus:ring-0 w-full px-2 py-1 mb-2 text-gray-900 text-sm sm:text-base" onChange={handleChange} value={formData.password} id="password" type="password" autoComplete="current-password" />
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