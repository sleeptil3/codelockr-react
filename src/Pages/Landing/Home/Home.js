import { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { DataContext } from '../../../App'
import LoginForm from '../../../Components/Forms/LoginForm'

export default function Home() {
	const { setShowRegistration, loggedIn } = useContext(DataContext)
	const [slide, setSlide] = useState('')

	const revealLogin = () => {
		setSlide('-translate-x-96 sm:-translate-x-3/4')
	}

	return (
		<div className="w-screen">
			<div className="mt-4 sm:mt-10 sm:flex-none">
				<div className="relative sm:max-w-screen-lg mx-auto sm:h-96 flex flex-col items-center">
					<div className="w-10/12 h-44 rounded-lg sm:rounded-none flex justify-center items-center py-4 px-2 z-20 border-gray-900 bg-gradient-to-b from-darkBlue to-black shadow-lg sm:absolute sm:left-0 sm:w-1/2 sm:border-b-4 sm:border-t-4 sm:h-96 sm:ml-10 sm:pl-20 sm:border-l-4">
						<div className="mx-auto space-y-2">
							<h1 className="ml-10 sm:ml-0 text-lg sm:text-4xl">{"Never forget { "}</h1>
							<p className="text-sm pl-16 pr-4 sm:pl-8 sm:pr-10 font-mono sm:text-2xl">(<span className="text-yellow-500">code</span>, <span className="text-green-600">dependancies</span>, <span className="text-pink-500">project setup</span>, <span className="text-red-500">styling</span>)</p>
							<h1 className="ml-10 sm:ml-0 text-lg sm:text-4xl italic">{" } ever again"}</h1>
						</div>
					</div>
					<div className={`w-10/12 h-44 mt-4 sm:mt-auto flex justify-center items-center rounded-lg sm:rounded-none sm:absolute sm:border-4 sm:border-gray-900 sm:w-1/2 sm:right-0 z-10 sm:h-96 sm:mr-10 bg-gray-50 sm:pl-24 shadow-lg transform transition-transform duration-500 ${slide}`}>
						<div className="">
							<h1 className="text-gray-900 text-lg sm:text-3xl p-8 sm:pr-4">Because your notes app wasn't built for that.</h1>
							<div className="mx-auto text-center">
								{loggedIn.state ?
									<div className="relative bottom-3 sm:bottom-0 sm:top-4">
										<Link to={`/user/${loggedIn.username}/dashboard`} className="btn-primary">Go to My Dashboard</Link>
									</div>
									:
									<div className="flex flex-wrap ml-8 pb-4 space-x-4 sm:space-x-5 sm:mt-8">
										<div className="btn-primary px-4">
											<p onClick={() => setShowRegistration(true)}>Sign Up</p>
										</div>
										<div className="btn-secondary px-2 border-darkBlue text-darkBlue hover:text-gray-50">
											<p onClick={revealLogin}>Login</p>
										</div>
									</div>
								}
							</div>
						</div>
					</div>
					<div className="w-56 -mb-36 text-xs font-widest relative bottom-36 sm:bottom-0 sm:top-28 sm:left-1/4 z-0">
						<LoginForm setSlide={setSlide} />
					</div>
				</div>
			</div>
			<div className="bg-gray-900 mt-6 sm:mt-10 w-full p-7 shadow-md">
				<div className="tracking-wide container text-md sm:text-xl space-y-8 sm:space-y-10 mx-auto sm:px-8 lg:px-24">
					<h1 className="text-2xl font-normal sm:text-4xl mb-4">What is <span className="tracking-wider font-black">CODELOCKR</span>?</h1>
					<p className="font-thin font-widest">Do you always finding yourself firing up 'create-react-app' and forgetting what important npm installs you like in a base project?</p>
					<p>Do you frantically search your old projects for that killer CSS form styling that you once nailed?</p>
					<p>Are you constantly referring back to documentation for simple commands that you use all the time?</p>
					<p className="font-bold text-xl sm:text-2xl">Well CODELOCKR is a place to store all of that.</p>
					<p>CODELOCKR enables web developers and software engineers to have easy access to their coding 'Snippets', neatly organized into folders, and looking fantastic: CODELOCKR supports highlighting and formatting in over 160 languages.</p>
					<p>You can also buddy-up with friends or co-worders and share Snippets in the CODELOCKR LockrRoom! Get started by creating your free account now!</p>
				</div>
			</div>
		</div>
	)
}

//self-start ml-4 mt-4 