import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import { AppContext } from "../App"
import { ACTION_LOGOUT } from "../state/actions"

import { deleteUser } from "../common/api"

export default function DeleteProfile() {
	const navigate = useNavigate()
	const { appState, dispatch } = useContext(AppContext)
	const { username, token } = appState

	const handleDelete = async () => {
		await deleteUser(username, token)
		window.localStorage.clear()
		dispatch(ACTION_LOGOUT())
		navigate("/")
	}

	return (
		<div className="space-y-8 tracking-wide mr-8">
			<h1 className="mb-6 text-2xl">Delete Profile</h1>
			<p className="text-lg">
				<span className="text-red-500 font-bold">CAUTION</span>:{" "}
				<strong>THIS IS NOT REVERSABLE!</strong>
			</p>
			<p>Your data cannot be retrieved after deletion.</p>
			<p>
				If there is anything we could have done better at{" "}
				<strong className="tracking-widest font-black">CODELOCKR</strong>, please{" "}
				<a
					className="underline hover:text-red-500"
					target={"_blank"}
					rel="noreferrer"
					href="https://www.sleeptil3software.com/#/contact"
				>
					let us know
				</a>
				!
			</p>
			<div className="flex justify-end mt-4">
				<button
					className="focus:ring-0 btn-secondary px-4 shrink-0 py-2 mr-4"
					onClick={() => navigate(`/user/${username}/dashboard`)}
				>
					No, take me back!
				</button>
				<button
					className="focus:ring-0 btn-primary px-2 py-1 shrink-0 bg-none bg-red-600"
					onClick={handleDelete}
				>
					Yes, I'm sure!
				</button>
			</div>
		</div>
	)
}
