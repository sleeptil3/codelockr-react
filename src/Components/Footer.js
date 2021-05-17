export default function Footer() {
	const date = new Date()
	const year = date.getFullYear()

	return (
		<footer className="text-gray-50 w-full py-2 flex justify-center bg-gray-900 mt-14">
			<div>
				<h1 className="text-center block text-sm font-light tracking-widest drop-shadow-lg">&#169;{year} Shawn Clary • Sleeptil3Software </h1>
			</div>
		</footer>
	)
}
