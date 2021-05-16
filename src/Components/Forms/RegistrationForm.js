import { useState, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { DataContext } from '../../App'
import { createUser } from '../../API/apiData'

export default function RegistrationForm() {
	const history = useHistory()
	const { setShowRegistration, showRegistration, BASE_URL, setLoggedIn } = useContext(DataContext)
	const [error, setError] = useState({ password: false })
	const [formData, setFormData] = useState({
		firstName: "",
		lastName: "",
		email: "",
		username: "",
		password: "",
		confirmPassword: ""
	})

	const handleSubmit = async (e) => {
		e.preventDefault()
		if (formData.password !== formData.confirmPassword) setError({ password: true })
		else {
			console.log('started user creation')
			setError({ password: false })
			const { token, createdUser } = await createUser(BASE_URL, formData)
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

	if (!showRegistration) return null
	return (
		<div className="fixed z-30 top-0 right-0 left-0 bottom-0 flex justify-center items-center">
			<div className="absolute top-0 right-0 left-0 bottom-0 bg-black bg-opacity-50 backdrop-filter backdrop-blur-md"></div>
			<div className="bg-gray-100 z-40 absolute w-3/4 h-1/2 flex rounded-2xl rounded-r-3xl">
				<div className="w-1/2 ml-10 mt-10 pr-10 h-full space-y-4">
					<h1 className="text-2xl text-black">Create an account</h1>
					{error.password ? <p className="text-red-500">Error: Passwords do not match</p> : null}
					<p className="text-md text-gray-700">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Maiores laborum tempora, omnis quod, natus vero eius impedit quibusdam soluta doloribus sequi odio incidunt rem! Praesentium qui ipsa beatae quidem. Quas.</p>
				</div>
				<div className="w-1/2 h-full bg-gradient-to-br from-darkBlue to-black rounded-2xl">
					<form className="h-full" onSubmit={handleSubmit}>
						<div className="font-thin tracking-wider text-sm text-gray-50 flex flex-col mr-10 items-center justify-evenly w-full h-full px-8 ">
							<label className="w-full">
								<input required onChange={handleChange} value={formData.firstName} className="p-0 m-0 mt-4 focus:ring-0 border-0 border-b border-gray-200 bg-transparent text-lg font-thin tracking-widest w-full" id="firstName" type="text" autoComplete="first-name" />
									First Name
									</label>
							<label className="w-full">
								<input required onChange={handleChange} value={formData.lastName} className="p-0 m-0 mt-4 focus:ring-0 outline-none border-0 border-b border-gray-200 bg-transparent text-lg font-thin tracking-widest w-full" id="lastName" type="text" autoComplete="family-name" />
									Last Name
									</label>
							<label className="w-full">
								<input required onChange={handleChange} value={formData.email} className="p-0 m-0 mt-4 focus:ring-0 outline-none border-0 border-b border-gray-200 bg-transparent text-lg font-thin tracking-widest w-full" id="email" type="text" autoComplete="email" />
									Email Address
									</label>
							<label className="w-full">
								<input required onChange={handleChange} value={formData.username} className="p-0 m-0 mt-4 focus:ring-0 outline-none border-0 border-b border-gray-200 bg-transparent text-lg font-thin tracking-widest w-full" id="username" type="text" autoComplete="off" />
									Username
									</label>
							<label className="w-full">
								<input required onChange={handleChange} value={formData.password} className="p-0 m-0 mt-4 focus:ring-0 outline-none border-0 border-b border-gray-200 bg-transparent text-lg font-thin tracking-widest w-full" id="password" type="password" autoComplete="new-password" />
									Password
									</label>
							<label className={"w-full"}>
								<input required onChange={handleChange} value={formData.confirmPassword} className="p-0 m-0 mt-4 focus:ring-0 outline-none border-0 border-b border-gray-200 bg-transparent text-lg font-thin tracking-widest w-full" id="confirmPassword" type="password" autoComplete="password" />
									Confirm Password
									</label>
							<div className="w-full flex justify-start mt-5 mb-6">
								<button className="mr-10 btn-primary" type="submit">Create Account</button>
								<button className="btn-secondary" onClick={() => setShowRegistration(false)}>Cancel</button>
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
	)
}