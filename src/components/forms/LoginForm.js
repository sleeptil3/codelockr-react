import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"

import { AppContext } from "../../App"
import { ACTION_LOGIN, ACTION_REFRESH_USER } from "../../state/actions"

import { forgotPassword } from "../../common/api"
import { handleGetLoginData } from "../../utils"

import ellipse from "../../assets/ellipse-load.png"
import ellipse2 from "../../assets/ellipse-load@2x.png"
import ellipse3 from "../../assets/ellipse-load@3x.png"

export default function LoginForm({ setSlide }) {
	const { dispatch } = useContext(AppContext)
	const navigate = useNavigate()

	// Local State
	const [formData, setFormData] = useState({ username: "", password: "" })
	const [error, setError] = useState(false)
	const [loggingIn, setLoggingIn] = useState(false)
	const [hideLogin, setHideLogin] = useState(false)
	const [showForgotPw, setShowForgotPw] = useState(false)
	const [emailFormData, setEmailFormData] = useState("")
	const [forgotPwResult, setForgotPwResult] = useState(null)

	const handleChange = e => {
		setFormData({ ...formData, [e.target.id]: e.target.value })
	}

	const handlePwForm = e => {
		setEmailFormData(e.target.value)
	}

	const handlePwReset = async e => {
		e.preventDefault()
		const data = await forgotPassword({ ...emailFormData })
		setForgotPwResult({ ...data })
		setEmailFormData("")
		setShowForgotPw(false)
		setHideLogin(false)
	}

	const handleSubmit = async e => {
		e.preventDefault()
		setLoggingIn(true)
		setHideLogin(true)
		const userRes = await handleGetLoginData(formData)
		setFormData({ username: "", password: "" })
		if (userRes.error) {
			setHideLogin(false)
			setLoggingIn(false)
		} else if (userRes.problem || userRes.msg) {
			setError(true)
			setHideLogin(false)
			setLoggingIn(false)
		} else if (userRes.token && userRes.username) {
			const { username, token } = userRes
			setLoggingIn(false)
			setHideLogin(false)
			dispatch(ACTION_LOGIN({ username, token }))
			dispatch(ACTION_REFRESH_USER())
			if (username === "admin") navigate("/admin/dashboard")
			else navigate(`/user/${username}/dashboard`)
		} else {
			console.error("Unknown error in Login Form")
		}
	}

	return (
		<div className="">
			{loggingIn && (
				<div className="ml-10 mt-4 flex flex-col items-center">
					<h1 className="text-base">Signing In</h1>
					<img
						className="m-4 animate-spin"
						src={ellipse}
						srcSet={`${ellipse2} 2x, ${ellipse3} 3x`}
						alt=""
					/>
					<h1 className="text-md">Sit tight...gathering your stuff.</h1>
				</div>
			)}
			{!hideLogin && (
				<form noValidate onSubmit={handleSubmit}>
					<div className="flex flex-col items-start space-y-2 justify-center -mt-7 md:-mt-2">
						{error ? (
							<h3 className="font-bold text-red-600">Error: Username or Password incorrect</h3>
						) : null}
						<label className="w-full text-gray-50 tracking-wider">
							Username:
							<input
								autoCapitalize="off"
								className="focus:ring-0 w-full px-2 py-1 text-gray-900 text-xs sm:text-sm"
								onChange={handleChange}
								value={formData.username}
								id="username"
								type="text"
								autoComplete="username"
							/>
						</label>
						<label className="w-full text-gray-50 tracking-wider">
							Password:
							<input
								className="focus:ring-0 w-full px-2 py-1 mb-4 text-gray-900 text-xs sm:text-sm"
								onChange={handleChange}
								value={formData.password}
								id="password"
								type="password"
								autoComplete="current-password"
							/>
						</label>
						<div className="flex items-center justify-end space-x-3 flex-end w-full">
							<p onClick={() => setSlide("")} className="btn-secondary">
								Cancel
							</p>
							<button type="submit" className="btn-primary">
								<span>Login</span>
							</button>
						</div>
						<div className="pt-2 w-full">
							<p
								onClick={() => {
									setShowForgotPw(true)
									setHideLogin(true)
								}}
								className="text-gray-50 tracking-wider inline cursor-pointer hover:text-red-600 float-right"
							>
								Forgot Password ?
							</p>
						</div>
						{forgotPwResult &&
							(forgotPwResult.hasOwnProperty("error") ? (
								<div>
									<p className="text-right font-normal tracking-wider w-full text-red-500">
										Uh oh! We don't recognize that email.
									</p>
									<a
										href="mailto:sleeptil3software@gmail.com"
										className="underline text-right font-normal tracking-wider w-full text-red-500"
									>
										Email Support
									</a>
								</div>
							) : (
								<p className="text-right font-normal tracking-wider w-full text-green-500">
									Success! Check your email.
								</p>
							))}
					</div>
				</form>
			)}
			{showForgotPw && (
				<form noValidate onSubmit={handlePwReset}>
					<div className="-mt-6">
						<p className="font-bold text-sm sm:text-sm pb-2">Forgot Password?</p>
						<p className="pb-4">
							Kindly provide the email you used when you created your account, and provided no
							tomfoolery is afoot, you will receive a temporary password in your inbox!
						</p>
					</div>
					<div className="flex flex-col items-start space-y-2 justify-center">
						<label className="w-full text-gray-50 tracking-wider">
							Email Address:
							<input
								autoCapitalize="off"
								className="focus:ring-0 w-full px-2 py-1 text-gray-900 text-xs sm:text-sm"
								onChange={handlePwForm}
								value={emailFormData}
								id="userEmail"
								type="text"
								autoComplete=""
							/>
						</label>
						<div className="pt-4 flex items-center justify-end space-x-4 flex-end w-full">
							<p
								onClick={() => {
									setShowForgotPw(false)
									setHideLogin(false)
								}}
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
			)}
		</div>
	)
}
