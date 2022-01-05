import { useContext } from "react"
import { useNavigate, Link } from "react-router-dom"
import { AppContext } from "../App"
import { deleteUser } from "../common/api"
import { APP_ACTION_LOGOUT } from "../state/actions"

export default function DeleteProfile() {
	const navigate = useNavigate()
	const { appState, dispatchAppState } = useContext(AppContext)
	const { username, token } = appState

	const handleDelete = async () => {
		await deleteUser(username, token)
		window.localStorage.clear()
		dispatchAppState(APP_ACTION_LOGOUT())
		navigate("/")
	}

	return (
		<div className="space-y-8 tracking-wide mr-8">
			<h1 className="mb-6 text-base font-bold">Delete Profile</h1>
			<p>
				<span className="text-red-500 font-bold">CAUTION</span>:{" "}
				<strong>THIS IS NOT REVERSABLE</strong> and your data cannot be retrieved after deletion.
			</p>
			<p>
				If there is anything we could have done better at{" "}
				<strong className="tracking-widest font-black">CODELOCKR</strong>, please{" "}
				<Link className="underline" to="#">
					let us know
				</Link>
				!
			</p>
			<div className="flex justify-between mt-4">
				<button
					className="focus:ring-0 btn-secondary px-4 shrink-0 py-2"
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
