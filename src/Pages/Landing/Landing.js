import { useContext } from 'react'
import { UserDataContext } from '../../App'
import { Link, Switch, Route } from 'react-router-dom'
import LoginForm from '../../Components/Forms/LoginForm'
import Home from '../Landing/Home/Home'
import Register from '../Landing/Register/Register'

export default function Landing() {
	const { loggedIn, handleLogout } = useContext(UserDataContext)

	return (
		<div className="w-screen h-screen bg-gray-800">
			<header className="h-auto bg-black">
				<h2>Landing Page</h2>
				<ul className="p-4">
					<li className="">
						<Link to="/">Home</Link>
					</li>
					{loggedIn.state ?
						<li className="cursor-pointer">
							<p onClick={handleLogout}>Logout</p>
						</li>
						: ""
					}
					<li>
						<Link to="/register">Register</Link>
					</li>
				</ul>
				<div className="text-gray-50 w-1/4">
					<LoginForm />
				</div>
			</header>
			<main>
				<Switch>
					<Route path="/register" component={Register} />
					<Route path="/" component={Home} />
				</Switch>
			</main>
		</div>
	)
}