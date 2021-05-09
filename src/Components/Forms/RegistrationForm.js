import { useState, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { DataContext } from '../../App'
import { createUser } from '../../API/apiData'

export default function RegistrationForm() {
	const history = useHistory()
	const { setShowRegistration, showRegistration, BASE_URL, setLoggedIn } = useContext(DataContext)
	const [formSubmitted, setFormSubmitted] = useState(false)
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
		setFormSubmitted(true)
		const newUser = await createUser(e, BASE_URL, formData)
		if (newUser.token) {
			setFormData({
				firstName: "",
				lastName: "",
				email: "",
				username: "",
				password: "",
				confirmPassword: ""
			})
			setShowRegistration(false)
			history.push(`/user/${newUser.username}`)
			setLoggedIn({ state: true, username: newUser.username, token: newUser.token })
		} else {
			console.error(newUser)
			setFormSubmitted(false)
			alert("Error on form submission")
		}
		setFormSubmitted(false)

	}

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.id]: e.target.value })
	}

	if (!showRegistration) return null
	return (
		<div className="fixed top-0 right-0 left-0 bottom-0 flex justify-center items-center">
			<div className="z-10 absolute top-0 right-0 left-0 bottom-0 bg-black bg-opacity-50 backdrop-filter backdrop-blur-md"></div>
			<div className="bg-gray-100 z-20 absolute w-3/4 h-3/4 flex rounded-2xl">
				<div className="w-1/2 h-full">
					<h1 className="text-2xl text-black m-10">Create an account</h1>
					<p className="text-md text-gray-700 m-10">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Maiores laborum tempora, omnis quod, natus vero eius impedit quibusdam soluta doloribus sequi odio incidunt rem! Praesentium qui ipsa beatae quidem. Quas.</p>
				</div>
				<div className="w-1/2 h-full bg-blue-700 rounded-2xl">
					{!formSubmitted ?
						(
							<form className="h-full" onSubmit={handleSubmit}>
								<div className="text-gray-50 flex flex-col mr-10 items-center justify-evenly py-4 w-full h-full px-8">
									<label className="w-full">
										First Name
							<input required onChange={handleChange} value={formData.firstName} className="p-2 text-xl text-gray-900 border border-gray-500 w-full" id="firstName" type="text" autoComplete="first-name" />
									</label>
									<label className="w-full">
										Last Name
							<input required onChange={handleChange} value={formData.lastName} className=" p-2 text-xl text-gray-900 border border-gray-500 w-full" id="lastName" type="text" autoComplete="family-name" />
									</label>
									<label className="w-full">
										Email Address
							<input required onChange={handleChange} value={formData.email} className=" p-2 text-xl text-gray-900 border border-gray-500 w-full" id="email" type="text" autoComplete="email" />
									</label>
									<label className="w-full">
										Username
							<input required onChange={handleChange} value={formData.username} className=" p-2 text-xl text-gray-900 border border-gray-500 w-full" id="username" type="text" autoComplete="off" />
									</label>
									<label className="w-full">
										Password
							<input required onChange={handleChange} value={formData.password} className=" p-2 text-xl text-gray-900 border border-gray-500 w-full" id="password" type="password" autoComplete="new-password" />
									</label>
									<label className={formData.password !== formData.confirmPassword ? "w-full text-red-500 font-bold" : "w-full"}>
										Confirm Password
							<input required onChange={handleChange} value={formData.confirmPassword} className="p-2 text-xl text-gray-900 border border-gray-500 w-full" id="confirmPassword" type="password" autoComplete="password" />
									</label>
									<button disabled={formData.password !== formData.confirmPassword ? true : false} className="mt-4 p-2 bg-gray-50 text-gray-900 w-full" type="submit">Create Account</button>
									<button className="p-2 text-gray-50 border border-gray-50 bg-transparent w-full" onClick={() => setShowRegistration(false)}>Cancel</button>
								</div>
							</form>
						)
						:
						(
							<div className="w-full h-full flex justify-center items-center">
								<div>
									<h2 className="text-2xl">Creating Account...</h2>
								</div>
							</div>
						)
					}
				</div>

			</div>

		</div>
	)
}