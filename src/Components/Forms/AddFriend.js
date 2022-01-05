import { useState, useContext } from "react"
import { requestFriend } from "../../common/api"

import { AppContext } from "../../App"

export default function AddFriend({ setShowAddFriend }) {
	const { appState } = useContext(AppContext)
	const { username, token } = appState

	const [formData, setFormData] = useState("")
	const [showConfirmation, setShowConfirmation] = useState(false)
	const [error, setError] = useState(false)

	const handleChange = e => {
		setFormData(e.target.value)
	}

	// add friend to requests list
	const handleSubmit = async e => {
		e.preventDefault()
		const data = await requestFriend(username, token, formData)
		console.log({ data })
		if (!!data.error) {
			setError(true)
			const id = setTimeout(() => {
				setError(false)
				clearTimeout(id)
			}, 3000)
		} else {
			setShowConfirmation(true)
			const id = setTimeout(() => {
				setShowConfirmation(false)
				clearTimeout(id)
			}, 3000)
		}
		setFormData("")
	}

	if (showConfirmation) {
		return <h2 className="text-xs py-3 text-green-500 w-48">Request Sent!</h2>
	} else if (error) {
		return <h2 className="text-xs py-3 text-red-500 w-48">User not found</h2>
	} else {
		return (
			<form noValidate autoComplete="off" onSubmit={handleSubmit}>
				<input hidden autoComplete={false} />
				<div className="font-thin tracking-wider text-xs text-gray-50 flex items-baseline justify-evenly h-full sm:w-48">
					<label>
						<input
							onChange={handleChange}
							value={formData}
							className="p-0 mt-2 focus:ring-0 border-0 border-b border-gray-200 bg-transparent text-xs font-thin tracking-widest w-11/12"
							id="username"
							type="text"
							spellCheck={false}
						/>
						<p className="mt-1">Username</p>
					</label>
					<button className="btn-primary p-1 px-2 text-xs" type="submit">
						Add
					</button>
					<button
						onClick={() => setShowAddFriend(false)}
						className="sm:hidden btn-secondary p-1 ml-4 text-xs"
					>
						Cancel
					</button>
				</div>
			</form>
		)
	}
}
