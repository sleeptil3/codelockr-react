import { useState, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { DataContext } from '../../App'
import { createUser } from '../../API/apiData'
import { v4 as uuid } from 'uuid'

export default function RegistrationForm() {
	const history = useHistory()
	const { setShowRegistration, showRegistration, BASE_URL, setLoggedIn } = useContext(DataContext)
	const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
	const passwordRegex = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/
	const [emailError, setEmailError] = useState(false)
	const [passwordError, setPasswordError] = useState(false)
	const [displayErrors, setDisplayErrors] = useState(null)
	const [formData, setFormData] = useState({
		firstName: "",
		lastName: "",
		email: "",
		username: "",
		password: "",
		confirmPassword: ""
	})

	const handleErrors = (e) => {
		e.preventDefault()
		setDisplayErrors(null)
		setEmailError(false)
		setPasswordError(false)
		const errors = []
		if (formData.password !== formData.confirmPassword) {
			errors.push("Passwords do not match")
			setPasswordError(true)
		}
		if (!passwordRegex.test(formData.password)) {
			errors.push("Password must be at least 8 characters long and contain at least one lowercase letter, capital letter, number, and a special character (!@#$%^&*)")
			setPasswordError(true)
		}
		if (!emailRegex.test(formData.email)) {
			errors.push('Email must be formatted "example@example.com"')
			setEmailError(true)
		}
		if (Object.values(formData).includes("")) {
			Object.entries(formData).forEach(entry => {
				const [field, value] = entry
				if (!value) {
					errors.push(`${field} is required`)
				}
			})
		}
		if (errors.length === 0) handleSubmit()
		else setDisplayErrors([...errors])
	}

	const handleSubmit = async () => {
		const newUser = await createUser(BASE_URL, formData)
		if (newUser.error) {
			setDisplayErrors([`That ${newUser.error} is already taken`])
		}
		else {
			const { token, createdUser } = newUser
			window.localStorage.setItem("token", token)
			window.localStorage.setItem("username", createdUser.username)
			setLoggedIn({
				state: true,
				isAdmin: false,
				username: createdUser.username,
				firstName: createdUser.firstName,
				lastName: createdUser.lastName
			})
			setFormData({
				firstName: "",
				lastName: "",
				email: "",
				username: "",
				password: "",
				confirmPassword: ""
			})
			setShowRegistration(false)
			history.push(`/user/${createdUser.username}/dashboard`)
		}
	}

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.id]: e.target.value })
	}

	const handleCancel = (e) => {
		e.preventDefault()
		setFormData({
			firstName: "",
			lastName: "",
			email: "",
			username: "",
			password: "",
			confirmPassword: ""
		})
		setDisplayErrors(null)
		setShowRegistration(false)
	}

	if (!showRegistration) return null
	return (
		<div className="absolute z-30 top-0 right-0 left-0 bottom-0 flex justify-center items-center">
			<div className="fixed top-0 right-0 left-0 bottom-0 bg-black bg-opacity-50 backdrop-filter backdrop-blur-md"></div>
			<div className="absolute top-4 sm:static bg-gray-100 flex-grow z-40 w-11/12 max-w-4xl h-full sm:h-auto sm:flex rounded-2xl rounded-r-3xl">
				<div className="w-full p-3 sm:p-0 sm:w-1/2 sm:ml-10 sm:mt-10 sm:pr-10 sm:h-full space-y-4">
					<h1 className="text-xl sm:text-2xl text-black">Create an account</h1>
					<p className="text-sm sm:text-md text-gray-700">Welcome to the CodeLockr family! You're just minutes away from having a space to store all of your most used (and often forgot) coding stuff.</p>
					<p className="text-sm sm:text-md text-gray-700">Don't forget to tell your friends so you can take advantage of Snippet Sharing in your <strong>LockrRoom</strong>. Sharing is caring!</p>
					{displayErrors ?
						<div>
							<p className="text-red-500 font-normal">Please correct the errors below</p>
							<ul className="mt-1">
								{displayErrors.map(error => {
									return <li className="text-red-500 text-sm list-item list-disc list-inside" key={uuid()}>{error}</li>
								})}
							</ul>
						</div>
						: null}
				</div>
				<div className="sm:w-1/2 bg-gradient-to-br from-darkBlue to-black rounded-2xl">
					<form noValidate className="my-5 pt-4" onSubmit={handleErrors}>
						<div className="font-thin tracking-wider text-xs sm:text-sm text-gray-50 flex flex-col items-center justify-evenly w-full px-4 sm:px-8">
							<label className={`w-full ${displayErrors && !formData.firstName ? "border-l-2 pl-4 border-red-600" : null}`}>
								<input onChange={handleChange} value={formData.firstName} className="p-0 m-0 mt-4 focus:ring-0 border-0 border-b border-gray-200 bg-transparent text-lg font-thin tracking-widest w-full" id="firstName" type="text" autoComplete="first-name" />
									First Name
									</label>
							<label className={`w-full ${displayErrors && !formData.lastName ? "border-l-2 pl-4 border-red-600" : null}`}>
								<input onChange={handleChange} value={formData.lastName} className="p-0 m-0 mt-4 focus:ring-0 outline-none border-0 border-b border-gray-200 bg-transparent text-lg font-thin tracking-widest w-full" id="lastName" type="text" autoComplete="family-name" />
									Last Name
									</label>
							<label className={`w-full ${displayErrors && (!formData.email || emailError || displayErrors[0].includes('email')) ? "border-l-2 pl-4 border-red-600" : null}`}>
								<input onChange={handleChange} value={formData.email} className="p-0 m-0 mt-4 focus:ring-0 outline-none border-0 border-b border-gray-200 bg-transparent text-lg font-thin tracking-widest w-full" id="email" type="text" autoComplete="email" />
									Email Address
									</label>
							<label className={`w-full ${displayErrors && (!formData.username || displayErrors[0].includes('username')) ? "border-l-2 pl-4 border-red-600" : null}`}>
								<input onChange={handleChange} value={formData.username} className="p-0 m-0 mt-4 focus:ring-0 outline-none border-0 border-b border-gray-200 bg-transparent text-lg font-thin tracking-widest w-full" id="username" type="text" autoComplete="off" />
									Username
									</label>
							<div className={`w-full ${displayErrors && (passwordError || !formData.password || !formData.confirmPassword) ? "border-l-2 pl-4 border-red-600" : null}`}>
								<label className="w-full">
									<input onChange={handleChange} value={formData.password} className="p-0 m-0 mt-4 focus:ring-0 outline-none border-0 border-b border-gray-200 bg-transparent text-lg font-thin tracking-widest w-full" id="password" type="password" autoComplete="new-password" />
									Password
									</label>
								<label className="w-full">
									<input onChange={handleChange} value={formData.confirmPassword} className="p-0 m-0 mt-4 focus:ring-0 outline-none border-0 border-b border-gray-200 bg-transparent text-lg font-thin tracking-widest w-full" id="confirmPassword" type="password" autoComplete="password" />
									Confirm Password
									</label>
							</div>
							<div className="w-full flex justify-start mt-8 mb-8">
								<button className="mr-10 btn-primary" type="submit">Create Account</button>
								<button className="btn-secondary" onClick={handleCancel}>Cancel</button>
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
	)
}