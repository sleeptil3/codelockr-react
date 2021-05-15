import { useContext, useState } from 'react'
import Home from '../Landing/Home/Home'
import RegistrationForm from '../../Components/Forms/RegistrationForm'

export default function Landing() {
	return (
		<div className="text-gray-50 flex-col">
			<header className="w-full py-10 flex justify-center items-center bg-gradient-to-b from-darkBlue to-red-800">
				<div>
					<svg className="mb-5 block mx-auto" width="68" height="82" viewBox="0 0 68 82" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path fillRule="evenodd" clipRule="evenodd" d="M34.0504 0.00718327C45.9225 0.00718327 55.5909 9.67558 55.5909 21.5598L55.5904 27.9699C62.808 30.4818 68 37.3529 68 45.417V62.855C68 73.0398 59.718 81.3218 49.5333 81.3218H18.4667C8.28197 81.3218 0 73.0398 0 62.855V45.417C0 37.3545 5.19004 30.4844 12.4055 27.9713L12.4083 21.5598C12.4327 15.7051 14.6974 10.3017 18.7835 6.25221C22.8736 2.19863 28.273 -0.147316 34.0504 0.00718327ZM49.5333 33.0489H18.4667C11.6444 33.0489 6.09865 38.5946 6.09865 45.417V62.855C6.09865 69.6774 11.6444 75.2231 18.4667 75.2231H49.5333C56.3516 75.2231 61.9013 69.6774 61.9013 62.855V45.417C61.9013 38.5946 56.3516 33.0489 49.5333 33.0489ZM33.9992 46.5708C35.6824 46.5708 37.0485 47.9369 37.0485 49.6201V58.6502C37.0485 60.3334 35.6824 61.6995 33.9992 61.6995C32.316 61.6995 30.9499 60.3334 30.9499 58.6502V49.6201C30.9499 47.9369 32.316 46.5708 33.9992 46.5708ZM34.0382 6.10584H33.9732C29.8545 6.10584 25.9961 7.69149 23.081 10.5823C20.1455 13.4852 18.5232 17.3599 18.507 21.4907L18.5033 26.9479H49.4885L49.4922 21.5598C49.4922 13.038 42.5601 6.10584 34.0382 6.10584Z" fill="white" />
					</svg>
					<h1 className="text-center block text-4xl font-bold tracking-widest drop-shadow-lg">CODELOCKR</h1>
				</div>
			</header>
			<RegistrationForm />
			<main className="">
				<Home />
			</main>
		</div>
	)
}