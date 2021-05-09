import { useContext, useState } from 'react'
import { DataContext } from '../../App'
import LoginForm from '../../Components/Forms/LoginForm'
import Home from '../Landing/Home/Home'
import RegistrationForm from '../../Components/Forms/RegistrationForm'

export default function Landing() {
	const { setShowRegistration } = useContext(DataContext)
	const [showLogin, setShowLogin] = useState(false)
	return (
		<div className="bg-gray-800 text-gray-50">
			<header className="bg-black flex justify-between py-8">
				<h1 className="pl-10 text-4xl">Codelockr</h1>
				{showLogin ?
					<div className="flex">
						<LoginForm setShowLogin={setShowLogin} />
					</div> :
					<div className="flex">
						<div className="cursor-pointer mr-10 border border-gray-50 p-2">
							<p onClick={() => setShowRegistration(true)}>Create an Account</p>
						</div>
						<div className="cursor-pointer mr-10 border border-gray-50 p-2">
							<p onClick={() => setShowLogin(true)}>Login</p>
						</div>
					</div>
				}
			</header>
			<RegistrationForm />
			<main>
				<Home />
			</main>
		</div >
	)
}