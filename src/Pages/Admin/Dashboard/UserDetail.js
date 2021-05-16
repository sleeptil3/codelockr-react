import { useState } from 'react'

export default function UserDetail({ user }) {
	const [showDetails, setShowDetails] = useState(false)

	return (
		<div onClick={() => setShowDetails(!showDetails)} className="cursor-pointer w-5/6 transition-transform transform hover:scale-105 bg-gradient-to-r from-darkBlue to-red-500 flex flex-col justify-between min-w-max font-normal rounded-lg shadow-md border border-gray-500 px-2 py-1">
			<div className="flex justify-between items-center">
				<div className="flex text-gray-50 justify-start items-baseline space-x-4">
					<h2 className="text-lg shadow-sm">{user.firstName} {user.lastName}</h2>
					<h2 className="font-thin">•</h2>
					<p className="font-thin text-sm">{!user.folders.length ? "No Folders" : `${user.folders.length} Folders`}</p>
				</div>
				<svg className={`mr-1 transform transition-transform duration-300 ${showDetails ? "rotate-180" : null}`} width="17" height="9" viewBox="0 0 17 9" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path fillRule="evenodd" clipRule="evenodd" d="M0.192069 0.188815C0.252799 0.128963 0.324943 0.0814771 0.40437 0.0490771C0.483796 0.0166771 0.568945 0 0.654938 0C0.740932 0 0.82608 0.0166771 0.905507 0.0490771C0.984933 0.0814771 1.05708 0.128963 1.11781 0.188815L8.50017 7.44739L15.8825 0.188815C15.9433 0.12906 16.0155 0.0816596 16.0949 0.0493204C16.1743 0.0169813 16.2594 0.000336493 16.3454 0.000336493C16.4314 0.000336493 16.5165 0.0169813 16.5959 0.0493204C16.6753 0.0816596 16.7475 0.12906 16.8083 0.188815C16.8691 0.24857 16.9173 0.319509 16.9502 0.397583C16.9831 0.475656 17 0.559335 17 0.643842C17 0.728348 16.9831 0.812027 16.9502 0.890101C16.9173 0.968174 16.8691 1.03911 16.8083 1.09887L8.96304 8.81118C8.90231 8.87104 8.83017 8.91852 8.75074 8.95092C8.67131 8.98332 8.58617 9 8.50017 9C8.41418 9 8.32903 8.98332 8.2496 8.95092C8.17018 8.91852 8.09803 8.87104 8.0373 8.81118L0.192069 1.09887C0.131186 1.03917 0.082882 0.968246 0.0499235 0.890165C0.0169651 0.812084 0 0.728378 0 0.643842C0 0.559305 0.0169651 0.475599 0.0499235 0.397518C0.082882 0.319437 0.131186 0.248515 0.192069 0.188815V0.188815Z" fill="#F9FAFB" />
				</svg>
			</div>
			{showDetails ?
				<div className="py-3 px-5">
					<h2 className="text-md text-gray-100 shadow-sm font-thin">Username: {user.username}</h2>
					<h2 className="text-md text-gray-100 shadow-sm font-thin">Email: {user.email}</h2>
					<h2 className="text-sm text-gray-100 shadow-sm font-thin">Created: {Date(user.created)}</h2>
				</div>
				: null}
		</div>
	)
}