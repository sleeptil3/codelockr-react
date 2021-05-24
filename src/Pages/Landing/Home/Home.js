import { useContext, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { DataContext } from '../../../App'
import LoginForm from '../../../Components/Forms/LoginForm'
import UserStory from '../../../Components/UserStory'
import { stories } from './storyData'
import Aos from 'aos'

export default function Home() {
	const { setShowRegistration, loggedIn } = useContext(DataContext)
	const [slide, setSlide] = useState('')
	const [showLogin, setShowLogin] = useState(false)

	const revealLogin = () => {
		setShowLogin(true)
		setSlide('-translate-x-96 sm:-translate-x-3/4')
	}

	useEffect(() => {
		window.scrollTo(0, 0)
		Aos.init({ duration: 1000 })
	}, [])

	return (
		<div className="w-screen">
			<div data-aos="zoom-in" className="mt-4 sm:mt-10 sm:flex-none mb-8">
				<div className="relative sm:max-w-screen-lg mx-auto sm:h-96 flex flex-col items-center">
					<div className="w-10/12 h-44 flex justify-center items-center py-4 px-2 z-20 bg-gradient-to-b from-darkBlue to-black shadow-lg sm:absolute sm:left-0 sm:w-1/2 sm:h-96 sm:ml-10 sm:pl-20">
						<div className="mx-auto space-y-2">
							<h1 className="ml-10 sm:ml-0 text-lg sm:text-4xl">{"Never forget { "}</h1>
							<p className="text-sm pl-16 pr-4 sm:pl-8 sm:pr-10 font-mono sm:text-2xl">(<span className="text-yellow-500">code</span>, <span className="text-green-600">dependancies</span>, <span className="text-pink-500">project setup</span>, <span className="text-red-500">styling</span>)</p>
							<h1 className="ml-10 sm:ml-0 text-lg sm:text-4xl italic">{" } ever again"}</h1>
						</div>
					</div>
					<div className={`w-10/12 h-44 mt-4 sm:mt-auto flex justify-center items-center sm:absolute sm:w-1/2 sm:right-0 z-10 sm:h-96 sm:mr-10 bg-gray-50 sm:pl-24 shadow-lg transform transition-transform duration-500 ${slide}`}>
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
						<div className={showLogin ? null : "hidden"}>
							<LoginForm setShowLogin={setShowLogin} setSlide={setSlide} />
						</div>
					</div>
				</div>
			</div>
			<div data-aos="fade-up" className="bg-gray-900 relative w-full p-7 shadow-md">
				<div className="tracking-wide container text-sm sm:text-md space-y-4 sm:space-y-4 mx-auto sm:px-8 lg:px-24">
					<h1 className="text-2xl font-normal sm:text-4xl mb-4">What is <span className="tracking-wider font-black">CODELOCKR</span>?</h1>
					<p className="font-thin font-widest">👉🏾 Do you always finding yourself firing up <code className="text-green-500">create-react-app</code> and forgetting what important <code className="text-yellow-500">npm</code> installs you like in a base project?</p>
					<p>👉🏽 Do you frantically search your old projects for that killer CSS form styling that you once nailed?</p>
					<p>👉🏻 Are you constantly referring back to documentation for simple commands that you use all the time?</p>
					<p className="font-bold text-xl sm:text-2xl pt-4">Well, CODELOCKR is a place to store all of that.</p>
					<p>CODELOCKR enables web developers and software engineers to have easy access to their coding 'Snippets', neatly organized into folders, and looking fantastic. CODELOCKR supports <span className="text-pink-500">highlighting</span> and <code className="text-red-500">formatting</code> in over 160 languages.</p>
					<p>You can also buddy-up with friends or co-worders and share Snippets in the <strong>LockrRoom</strong>!</p>
					<p onClick={() => setShowRegistration(true)} className="cursor-pointer underline hover:text-red-600 font-bold">Create your free account now</p>
				</div>
			</div>
			<div className="bg-gray-900 mt-8 w-full p-7 shadow-md">
				<div className="tracking-wide container text-sm sm:text-md space-y-4 sm:space-y-4 mx-auto sm:px-8 lg:px-24">
					<h1 className="text-xl font-normal sm:text-2xl mb-4">What are people saying about <span className="tracking-wider font-black">CODELOCKR</span>?</h1>
				</div>
				<div className="tracking-wide container text-sm sm:text-md space-y-8 sm:space-y-4 mx-auto sm:px-8 lg:px-24 flex flex-col xl:flex-row xl:flex-wrap justify-center xl:justify-start">
					{stories.map(story => {
						return <UserStory story={story} />
					})}
				</div>
			</div>
		</div>
	)
}

//self-start ml-4 mt-4 