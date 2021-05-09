export default function RegistrationForm() {
	return (
		<div>
			<form>
				<div className="flex flex-col w-1/2">
					<label className="mx-4">
						First Name:
							<input className="mx-4 p-2 text-xl border border-gray-500 w-full" id="firstName" type="text" autoComplete="first-name" />
					</label>
					<label className="mx-4">
						Last Name:
							<input className="mx-4 p-2 text-xl border border-gray-500 w-full" id="lastName" type="text" autoComplete="family-name" />
					</label>
					<label className="mx-4">
						Email Address:
							<input className="mx-4 p-2 text-xl border border-gray-500 w-full" id="email" type="text" autoComplete="email" />
					</label>
					<label className="mx-4">
						Username:
							<input className="mx-4 p-2 text-xl border border-gray-500 w-full" id="newUsername" type="text" autoComplete="off" />
					</label>
					<label className="mx-4">
						Password:
							<input className="mx-4 p-2 text-xl border border-gray-500 w-full" id="newPassword" type="password" autoComplete="new-password" />
					</label>
				</div>
			</form>
		</div>
	)
}