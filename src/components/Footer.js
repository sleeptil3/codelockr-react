export default function Footer() {
	const date = new Date()
	const year = date.getFullYear()

	return (
		<footer className="text-gray-50 w-full py-6 flex justify-center bg-gray-900 mt-14">
			<div>
				<a className="hover:text-red-600" href="https://www.sleeptil3software.com/" target="_blank" rel="noopener noreferrer"><h1 className="text-center block text-xs sm:text-xs font-light tracking-widest">&#169;{ year } Shawn Clary • Sleeptil3Software</h1></a>
				<h1 className="text-center block text-xs sm:text-xs font-light tracking-widest mt-4">Found a bug? <a className="hover:text-red-600" href="https://github.com/sleeptil3/codelockr-react/issues" target="_blank" rel="noopener noreferrer">Submit a Github Issue</a></h1>
			</div>
		</footer>
	)
}
