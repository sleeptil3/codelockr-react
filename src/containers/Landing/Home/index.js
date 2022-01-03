import { useContext, useState, useEffect } from "react"
import { Link } from "react-router-dom"

import { AppContext } from "../../../App"
import { CUSTOMER_STORIES } from "../../../common/constants"
import { TOGGLE_REGISTRATION } from "../../../state/App/actions"

import LoginForm from "../../../components/forms/LoginForm"
import UserStory from "../../../components/UserStory"

import dashboard from "../../../assets/dashboard.png"
import snippetGif from "../../../assets/snippet.gif"

export default function Home() {
	const { appState, dispatchAppState } = useContext(AppContext)
	const { loggedIn, username } = appState
	const [slide, setSlide] = useState("")
	const [showLogin, setShowLogin] = useState(false)

	const revealLogin = () => {
		setShowLogin(true)
		setSlide("-translate-x-96 sm:-translate-x-3/4")
	}

	useEffect(() => {
		window.scrollTo(0, 0)
	}, [])

	return (
		<div>
			<div data-aos="zoom-in" className="mt-4 sm:mt-10 sm:flex-none h-96 sm:h-auto mb-4 sm:mb-8">
				<div className="relative sm:max-w-screen-lg mx-auto sm:h-96 flex flex-col items-center">
					<div className="w-10/12 h-44 flex justify-center items-center py-4 px-2 z-20 bg-gradient-to-b from-darkBlue to-black shadow-lg sm:absolute sm:left-0 sm:w-1/2 sm:h-96 sm:ml-10 sm:pl-20">
						<div className="mx-auto space-y-2">
							<h1 className="ml-10 sm:ml-0 text-base sm:text-3xl">{"Never forget { "}</h1>
							<p className="text-xs pl-16 pr-4 sm:pl-8 sm:pr-10 font-mono sm:text-xl">
								(<span className="text-yellow-500">code</span>,{" "}
								<span className="text-green-600">dependencies</span>,{" "}
								<span className="text-pink-500">project setup</span>,{" "}
								<span className="text-red-500">styling</span>)
							</p>
							<h1 className="ml-10 sm:ml-0 text-base sm:text-3xl italic">{" } ever again"}</h1>
						</div>
					</div>
					<div
						className={`w-10/12 h-44 mt-4 sm:mt-auto flex justify-center items-center sm:absolute sm:w-1/2 sm:right-0 z-10 sm:h-96 sm:mr-10 bg-gray-50 sm:pl-24 shadow-lg transform transition-transform duration-500 ${slide}`}
					>
						<div className="">
							<h1 className="text-gray-900 text-base sm:text-2xl p-8 sm:pr-4">
								Because your notes app wasn't built for that.
							</h1>
							<div className="mx-auto text-center">
								{loggedIn ? (
									<div className="float-left ml-8 relative bottom-3 sm:bottom-0 sm:top-4">
										<Link to={`/user/${username}/dashboard`} className="btn-primary">
											Go to My Dashboard
										</Link>
									</div>
								) : (
									<div className="flex flex-wrap ml-8 pb-4 space-x-4 sm:space-x-5 sm:mt-8">
										<div className="btn-primary">
											<p onClick={() => dispatchAppState(TOGGLE_REGISTRATION(true))}>Sign Up</p>
										</div>
										<div className="btn-tertiary">
											<p onClick={revealLogin}>Login</p>
										</div>
									</div>
								)}
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
			<div data-aos="fade-up" className="bg-gray-900 relative w-full px-7 py-12 mt-11 shadow-md">
				<div className="tracking-wide container text-sm sm:text-base space-y-4 sm:space-y-4 mx-auto sm:px-8 lg:px-24">
					<h1 className="text-xl font-normal sm:text-3xl mb-4">
						What is <span className="tracking-wider font-black">CODELOCKR</span>?
					</h1>
					<p className="font-bold text-lg sm:text-xl pt-4">
						Simply put, CODELOCKR is a clean, simple way to store your coding stuff. Sticky notes
						just don't cut it.
					</p>
					<p className="font-thin font-widest">
						👉🏾 Do you always finding yourself firing up{" "}
						<code className="text-green-500">create-react-app</code> and forgetting what important{" "}
						<code className="text-yellow-500">npm</code> installs you like in a base project?
					</p>
					<p>
						👉🏽 Do you frantically search your old projects for that killer CSS form styling that you
						once nailed?
					</p>
					<p>
						👉🏻 Are you constantly referring back to documentation for simple commands that you use
						all the time?
					</p>
					<p className="font-bold text-lg sm:text-xl pt-4">
						Well, CODELOCKR is a place to store all of that.
					</p>
					<p>
						Built from the ground-up for zippy speed with no-frills, CODELOCKR enables web
						developers and software engineers to have easy access to their coding 'Snippets', neatly
						organized into folders, and looking fantastic. CODELOCKR supports{" "}
						<span className="text-pink-500">highlighting</span> and{" "}
						<code className="text-red-500">formatting</code> in over 160 languages.
					</p>
					<p>
						You can also buddy-up with friends or co-workers and share Snippets in the{" "}
						<strong>LockrRoom</strong>!
					</p>
					<br />
					<p
						onClick={() => dispatchAppState(TOGGLE_REGISTRATION(true))}
						className="inline cursor-pointer underline hover:text-red-600 font-bold"
					>
						Create your free account now
					</p>
				</div>
			</div>
			<div data-aos="fade-up" className="mt-8 relative w-full p-7">
				<div className="tracking-wide container text-xs sm:text-md space-y-4 sm:space-y-6 mx-auto sm:px-8 lg:px-24 text-center md:text-left">
					<h1 className="text-2xl font-normal md:text-3xl mb-4 text-center">
						What is the <span className="tracking-wider font-black">CODELOCKR</span> experience?
					</h1>
					<div className="w-full flex flex-col md:flex-row items-center md:items-start justify-center md:space-x-16">
						<div className="flex flex-col items-center justify-center space-y-6">
							<div className="text-center">
								<p className="font-bold text-lg sm:text-xl pt-4">The Dashboard</p>
								<p className="font-thin font-widest">Organized by folder and searchable by name.</p>
							</div>
							<img className="" src={dashboard} alt="sample dashboard" />
						</div>
						<div className="flex flex-col items-center justify-center space-y-6">
							<div className="text-center">
								<p className="font-bold text-lg sm:text-xl pt-4">The Snippet</p>
								<p className="font-thin font-widest">Code, install steps, components...anything.</p>
							</div>
							<img className="" src={snippetGif} alt="rotating images of snippet examples" />
						</div>
					</div>
				</div>
			</div>
			<div className="bg-gray-900 mt-8 w-full p-7 shadow-md">
				<div className="tracking-wide container text-xs sm:text-md space-y-4 sm:space-y-4 mx-auto sm:px-8 lg:px-24">
					<h1 className="text-lg font-normal sm:text-xl mb-4">
						What are people saying about{" "}
						<span className="tracking-wider font-black">CODELOCKR</span>?
					</h1>
				</div>
				<div className="tracking-wide container text-xs sm:text-md space-y-8 sm:space-y-4 mx-auto sm:px-8 lg:px-24 flex flex-col xl:flex-row xl:flex-wrap justify-center">
					{CUSTOMER_STORIES.map((story, idx) => {
						return <UserStory key={idx} story={story} />
					})}
				</div>
			</div>
		</div>
	)
}
