import { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { DataContext } from '../../../App'
import LoginForm from '../../../Components/Forms/LoginForm'

export default function Home() {
	const { setShowRegistration, loggedIn } = useContext(DataContext)
	const [slide, setSlide] = useState('')

	const revealLogin = () => {
		setSlide('-translate-x-3/4')
	}

	return (
		<div className="h-full mt-20">
			<div className="absolute w-1/2 left-0 z-20 h-96 ml-10 pl-20 flex justify-center items-center bg-gradient-to-br from-darkBlue to-black shadow-lg rounded-2xl">
				<div className="mx-auto space-y-3">
					<h1 className="text-4xl">{"Never forget {"}</h1>
					<p className="pl-8 pr-20 font-mono font-light text-2xl">(<span className="text-yellow-500">code</span>, <span className="text-green-600">dependancies</span>, <span className="text-pink-500">project setup</span>, <span className="text-red-500">styling</span>)</p>
					<h1 className="text-4xl italic">{"} ever again"}</h1>
				</div>
			</div>
			<div className={`absolute w-1/2 right-0 z-10 h-96 mr-10 flex justify-center items-center bg-gray-50 rounded-2xl pl-36 shadow-lg transform transition-transform duration-500 ${slide}`}>
				<div>
					<h1 className="text-gray-900 text-3xl">Because your notes app wasn't built for that.</h1>
					<div>
						{loggedIn.state ?
							<div className="flex mt-8">
								<Link to={`/user/${loggedIn.username}/dashboard`} className="btn-primary">Go to My Dashboard</Link>
							</div>
							:
							<div className="flex mt-8">
								<div className="flex justify-center items-center cursor-pointer px-4 py-1 mr-5 bg-darkBlue rounded-lg shadow-lg">
									<p onClick={() => setShowRegistration(true)}>Sign Up</p>
								</div>
								<div className="flex justify-center items-center cursor-pointer px-2 py-1 border border-darkBlue text-darkBlue rounded-lg shadow-lg">
									<p onClick={revealLogin}>Login</p>
								</div>
							</div>
						}
					</div>
				</div>
			</div>
			<div className="relative z-0 w-full">
				<LoginForm setSlide={setSlide} />
			</div>
		</div>
	)
}

{/* {showLogin ?
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
			} */}