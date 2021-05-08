import { Link } from 'react-router-dom'

export default function Landing() {
	return (
		<div className="">
			<h2>Landing Page</h2>
			<ul className="p-4">
				<li className="">
					<Link to="/">Home</Link>
				</li>
				<li>
					<Link to="/admin">Admin Dashboard</Link>
				</li>
				<li>
					<Link to="/user">User Dashboard</Link>
				</li>
			</ul>
		</div>
	)
}