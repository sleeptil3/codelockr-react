import { useContext, useState } from "react"
import { useHistory } from "react-router-dom"
import { DataContext } from "../../App"
import { forgotPassword } from "../../API/apiData"
import loading from "../../images/loading.gif"

export default function LoginForm({ setSlide }) {
	const { BASE_URL, setLoggedIn } = useContext(DataContext)
	const PWR_USER = process.env.REACT_APP_PWR_USER
	const PWR_PASS = process.env.REACT_APP_PWR_PASS
	const history = useHistory()
	const [formData, setFormData] = useState({ username: "", password: "" })
	const [error, setError] = useState(false)
	const [loggingIn, setLoggingIn] = useState(false)
	const [hideLogin, setHideLogin] = useState(false)
	const [showForgotPw, setShowForgotPw] = useState(false)
	const [emailFormData, setEmailFormData] = useState("")
	const [forgotPwResult, setForgotPwResult] = useState(null)

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.id]: e.target.value })
	}

	const handlePwForm = (e) => {
		setEmailFormData(e.target.value)
	}

	const handlePwReset = async (e) => {
		e.preventDefault()
		const data = await forgotPassword(BASE_URL, PWR_USER, PWR_PASS, emailFormData)
		setForgotPwResult({ ...data })
		setEmailFormData("")
		setShowForgotPw(false)
		setHideLogin(false)
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		setLoggingIn(true)
		setHideLogin(true)
		try {
			const body = JSON.stringify({ ...formData })
			const response = await fetch(`${ BASE_URL }/login`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: body,
			})
			const data = await response.json()
			setFormData({ username: "", password: "" })
			if (data.token && data.username) {
				window.localStorage.setItem("token", data.token)
				window.localStorage.setItem("username", data.username)
				if (data.username === "admin") {
					setLoggedIn({
						state: true,
						isAdmin: true,
						username: "admin",
						firstName: "Admin",
						lastName: "Account",
					})
					setLoggingIn(false)
					setHideLogin(false)
					history.push("/admin/dashboard")
				} else {
					setLoggedIn({
						state: true,
						isAdmin: false,
						username: data.username,
					})
					setLoggingIn(false)
					setHideLogin(false)
					history.push(`/user/${ data.username }/dashboard`)
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
		<div className="">
			{ loggingIn && (
				<div className="ml-10 mt-4 flex flex-col items-center">
					<h1 className="text-base">Signing In</h1>
					<img className="h-20 flex-shrink-0 flex-grow-0" src={ loading } alt="animated loading graphic" />
					<h1 className="text-md">Sit tight...gathering your stuff.</h1>
				</div>
			) }
			{ !hideLogin && (
				<form noValidate onSubmit={ handleSubmit }>
					<div className="flex flex-col items-start space-y-2 justify-center -mt-7 md:-mt-2">
						{ error ? <h3 className="font-bold text-red-600">Error: Username or Password incorrect</h3> : null }
						<label className="w-full text-gray-50 tracking-wider">
							Username:
							<input
								autoCapitalize="off"
								className="focus:ring-0 w-full px-2 py-1 text-gray-900 text-xs sm:text-sm"
								onChange={ handleChange }
								value={ formData.username }
								id="username"
								type="text"
								autoComplete="username"
							/>
						</label>
						<label className="w-full text-gray-50 tracking-wider">
							Password:
							<input
								className="focus:ring-0 w-full px-2 py-1 mb-2 text-gray-900 text-xs sm:text-sm"
								onChange={ handleChange }
								value={ formData.password }
								id="password"
								type="password"
								autoComplete="current-password"
							/>
						</label>
						<div className="flex items-center justify-end space-x-4 flex-end w-full">
							<p onClick={ () => setSlide("") } className="btn-secondary">
								Cancel
							</p>
							<button type="submit" className="btn-primary">
								<span>Login</span>
							</button>
						</div>
						<div className="pt-2 w-full">
							<p
								onClick={ () => {
									setShowForgotPw(true)
									setHideLogin(true)
								} }
								className="text-gray-50 tracking-wider inline cursor-pointer hover:text-red-600 float-right"
							>
								Forgot Password ?
							</p>
						</div>
						{ forgotPwResult &&
							(forgotPwResult.hasOwnProperty("error") ? (
								<div>
									<p className="text-right font-normal tracking-wider w-full text-red-500">Uh oh! We don't recognize that email.</p>
									<a href="mailto:sleeptil3software@gmail.com" className="underline text-right font-normal tracking-wider w-full text-red-500">
										Email Support
									</a>
								</div>
							) : (
								<p className="text-right font-normal tracking-wider w-full text-green-500">Success! Check your email.</p>
							)) }
					</div>
				</form>
			) }
			{ showForgotPw && (
				<form noValidate onSubmit={ handlePwReset }>
					<div className="-mt-6">
						<p className="font-bold text-sm sm:text-sm pb-2">Forgot Password?</p>
						<p className="pb-4">Kindly provide the email you used when you created your account, and provided no tomfoolery is afoot, you will receive a temporary password in your inbox!</p>
					</div>
					<div className="flex flex-col items-start space-y-2 justify-center">
						<label className="w-full text-gray-50 tracking-wider">
							Email Address:
							<input
								autoCapitalize="off"
								className="focus:ring-0 w-full px-2 py-1 text-gray-900 text-xs sm:text-sm"
								onChange={ handlePwForm }
								value={ emailFormData }
								id="userEmail"
								type="text"
								autoComplete=""
							/>
						</label>
						<div className="pt-4 flex items-center justify-end space-x-4 flex-end w-full">
							<p
								onClick={ () => {
									setShowForgotPw(false)
									setHideLogin(false)
								} }
								className="btn-secondary"
							>
								Cancel
							</p>
							<button type="submit" className="btn-primary">
								Submit
							</button>
						</div>
					</div>
				</form>
			) }
		</div>
	)
}
