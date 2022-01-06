import { useState, useContext } from "react"
import { useNavigate } from "react-router-dom"

import { AppContext } from "../../App"
import { createUser } from "../../common/api"
import { EMAIL_REGEX, PASSWORD_REGEX } from "../../common/constants"

import ellipse from "../../assets/ellipse-load.png"
import ellipse2 from "../../assets/ellipse-load@2x.png"
import ellipse3 from "../../assets/ellipse-load@3x.png"
import { ACTION_LOGIN, ACTION_TOGGLE_REGISTRATION } from "../../state/actions"

export default function RegistrationForm() {
	const navigate = useNavigate()
	const { appState, dispatch } = useContext(AppContext)
	const { showRegistration } = appState

	// Local State
	const [emailError, setEmailError] = useState(false)
	const [passwordError, setPasswordError] = useState(false)
	const [displayErrors, setDisplayErrors] = useState(null)
	const [formData, setFormData] = useState({
		firstName: "",
		lastName: "",
		email: "",
		username: "",
		password: "",
		confirmPassword: "",
	})
	const [registering, setRegistering] = useState(false)

	const handleErrors = e => {
		e.preventDefault()
		setDisplayErrors(null)
		setEmailError(false)
		setPasswordError(false)
		const errors = []
		if (formData.password !== formData.confirmPassword) {
			errors.push("Passwords do not match")
			setPasswordError(true)
		}
		if (!PASSWORD_REGEX.test(formData.password)) {
			errors.push(
				"Password must be at least 8 characters long and contain at least one lowercase letter, capital letter, number, and a special character (!@#$%^&*)"
			)
			setPasswordError(true)
		}
		if (!EMAIL_REGEX.test(formData.email)) {
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
		setRegistering(true)
		const newUser = await createUser(formData)
		if (newUser.error) {
			setDisplayErrors([`That ${newUser.error} is already taken`])
		} else {
			const { token, createdUser } = newUser
			const { username, firstName, lastName } = createdUser
			dispatch(ACTION_LOGIN({ username, firstName, lastName, token }))
			setFormData({
				firstName: "",
				lastName: "",
				email: "",
				username: "",
				password: "",
				confirmPassword: "",
			})
			dispatch(ACTION_TOGGLE_REGISTRATION(false))
			navigate(`/user/${username}/dashboard`)
		}
	}

	const handleChange = e => {
		setFormData({ ...formData, [e.target.id]: e.target.value })
	}

	const handleCancel = e => {
		e.preventDefault()
		setFormData({
			firstName: "",
			lastName: "",
			email: "",
			username: "",
			password: "",
			confirmPassword: "",
		})
		setDisplayErrors(null)
		dispatch(ACTION_TOGGLE_REGISTRATION(false))
	}

	if (!showRegistration) return null
	return (
		<div className="absolute z-30 top-0 right-0 left-0 bottom-0 flex justify-center items-center">
			<div className="fixed top-0 right-0 left-0 bottom-0 bg-black bg-opacity-50 backdrop-filter backdrop-blur-md"></div>
			<div className="absolute top-4 sm:fixed sm:top-1/2 sm:transform sm:-translate-y-1/2 bg-gray-100 flex-grow z-40 w-11/12 max-w-4xl h-full sm:h-auto sm:flex rounded-2xl rounded-r-3xl">
				<div className="w-full p-3 sm:p-0 sm:w-1/2 sm:ml-10 sm:mt-10 sm:pr-10 sm:h-full space-y-4">
					{registering ? (
						<>
							<h1 className="text-lg sm:text-xl text-black">Creating your account</h1>
							<p className="text-xs sm:text-md text-gray-700">Sit tight...</p>
						</>
					) : (
						<>
							<h1 className="text-lg sm:text-xl text-black">Create an account</h1>
							<p className="text-xs sm:text-md text-gray-700">
								Welcome to the CodeLockr family! You're just minutes away from having a space to
								store all of your most used (and often forgot) coding stuff.
							</p>
							<p className="text-xs sm:text-md text-gray-700">
								Don't forget to tell your friends so you can take advantage of Snippet Sharing in
								your <strong>LockrRoom</strong>. Sharing is caring!
							</p>
						</>
					)}
					{registering ? (
						<div className="pt-20 flex justify-center items-center">
							<img
								className="animate-spin"
								src={ellipse}
								srcSet={`${ellipse2} 2x, ${ellipse3} 3x`}
								alt=""
							/>
						</div>
					) : null}
					{!!displayErrors ? (
						<div>
							<p className="text-red-500 font-normal">Please correct the errors below</p>
							<ul className="mt-1">
								{displayErrors.map((error, id) => {
									return (
										<li className="text-red-500 text-xs list-item list-disc list-inside" key={id}>
											{error}
										</li>
									)
								})}
							</ul>
						</div>
					) : null}
				</div>
				<div className="sm:w-1/2 bg-gradient-to-br from-darkBlue to-black rounded-2xl">
					<form noValidate className="my-5 pt-4" onSubmit={handleErrors}>
						<div className="font-thin tracking-wider text-xs sm:text-xs text-gray-50 flex flex-col items-center justify-evenly w-full px-4 sm:px-8">
							<label
								className={`w-full ${
									displayErrors && !formData.firstName ? "border-l-2 pl-4 border-red-600" : null
								}`}
							>
								<input
									onChange={handleChange}
									value={formData.firstName}
									className="input-no-line p-0 m-0 mt-4 focus:ring-0 border-0 border-b border-gray-200 bg-transparent text-base font-thin tracking-widest w-full"
									id="firstName"
									type="text"
									autoComplete="first-name"
								/>
								First Name
							</label>
							<label
								className={`w-full ${
									displayErrors && !formData.lastName ? "border-l-2 pl-4 border-red-600" : null
								}`}
							>
								<input
									onChange={handleChange}
									value={formData.lastName}
									className="input-no-line p-0 m-0 mt-4 focus:ring-0 outline-none border-0 border-b border-gray-200 bg-transparent text-base font-thin tracking-widest w-full"
									id="lastName"
									type="text"
									autoComplete="family-name"
								/>
								Last Name
							</label>
							<label
								className={`w-full ${
									displayErrors &&
									(!formData.email || emailError || displayErrors[0].includes("email"))
										? "border-l-2 pl-4 border-red-600"
										: null
								}`}
							>
								<input
									onChange={handleChange}
									value={formData.email}
									className="input-no-line p-0 m-0 mt-4 focus:ring-0 outline-none border-0 border-b border-gray-200 bg-transparent text-base font-thin tracking-widest w-full"
									id="email"
									type="text"
									autoComplete="email"
								/>
								Email Address
							</label>
							<label
								className={`w-full ${
									displayErrors && (!formData.username || displayErrors[0].includes("username"))
										? "border-l-2 pl-4 border-red-600"
										: null
								}`}
							>
								<input
									onChange={handleChange}
									value={formData.username}
									className="input-no-line p-0 m-0 mt-4 focus:ring-0 outline-none border-0 border-b border-gray-200 bg-transparent text-base font-thin tracking-widest w-full"
									id="username"
									type="text"
									autoComplete="off"
								/>
								Username
							</label>
							<div
								className={`w-full ${
									displayErrors &&
									(passwordError || !formData.password || !formData.confirmPassword)
										? "border-l-2 pl-4 border-red-600"
										: null
								}`}
							>
								<label className="w-full">
									<input
										onChange={handleChange}
										value={formData.password}
										className="input-no-line p-0 m-0 mt-4 focus:ring-0 outline-none border-0 border-b border-gray-200 bg-transparent text-base font-thin tracking-widest w-full"
										id="password"
										type="password"
										autoComplete="new-password"
									/>
									Password
								</label>
								<label className="w-full">
									<input
										onChange={handleChange}
										value={formData.confirmPassword}
										className="input-no-line p-0 m-0 mt-4 focus:ring-0 outline-none border-0 border-b border-gray-200 bg-transparent text-base font-thin tracking-widest w-full"
										id="confirmPassword"
										type="password"
										autoComplete="password"
									/>
									Confirm Password
								</label>
							</div>
							<div className="w-full flex justify-between mt-8 mb-8">
								<button className="btn-secondary" onClick={handleCancel}>
									Cancel
								</button>
								<button className="btn-primary" type="submit">
									Create Account
								</button>
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
	)
}
