import { useContext, useState } from "react"
import { Link } from "react-router-dom"
import { AppContext } from "../App"
import { APP_ACTION_SET_SNIPPET_FORM, APP_ACTION_SET_SUBMIT_MODE } from "../state/actions"
import LoadingRing from "./LoadingRing"

export default function Snippet({
	parentFolder,
	readOnly,
	title,
	code,
	isPrivate,
	parseFormat,
	notes,
	snippet_id,
	owner,
}) {
	const { appState, dispatch } = useContext(AppContext)
	const { userData } = appState
	const [isCopied, setIsCopied] = useState(false)

	const handleClick = () => {
		dispatch(
			APP_ACTION_SET_SNIPPET_FORM({
				title: title,
				code: code,
				notes: notes,
				snippet_id: snippet_id,
				isPrivate: isPrivate,
				parseFormat: parseFormat,
				parentFolder: parentFolder,
			})
		)
		dispatch(APP_ACTION_SET_SUBMIT_MODE("PUT"))
	}

	const copySnippet = () => {
		navigator.clipboard.writeText(code).then(() => {
			setIsCopied(true)
			setTimeout(() => setIsCopied(false), 2000)
		})
	}

	return !!title ? (
		<div className="sm:cs-border-outset shadow-lg px-4 sm:px-8 space-y-2 pb-4 pt-2 sm:pt-4 sm:pb-8 sm:space-y-4 bg-gray-900">
			<div className="flex justify-between items-center">
				<div className="">
					<h2 className="text-md sm:text-lg text-gray-50 font-thin">{title}</h2>
					{isPrivate ? <span className="text-xs">Private</span> : null}
				</div>
				<div className="flex justify-center items-center">
					{isCopied ? (
						<svg
							className="text-green-500 mr-3 h-full"
							width="18"
							height="18"
							viewBox="0 0 18 18"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								className="fill-current"
								d="M6.85742 17.5723C7.27734 17.5723 7.60938 17.3867 7.84375 17.0254L17.0723 2.49414C17.248 2.21094 17.3164 1.99609 17.3164 1.77148C17.3164 1.23438 16.9648 0.882812 16.4277 0.882812C16.0371 0.882812 15.8223 1.00977 15.5879 1.38086L6.81836 15.3555L2.26758 9.39844C2.02344 9.05664 1.7793 8.91992 1.42773 8.91992C0.871094 8.91992 0.490234 9.30078 0.490234 9.83789C0.490234 10.0625 0.587891 10.3164 0.773438 10.5508L5.8418 17.0059C6.13477 17.3867 6.4375 17.5723 6.85742 17.5723Z"
								fill="white"
							/>
						</svg>
					) : (
						<button
							title="Copy to clipboard"
							className="flex mr-3 cursor-pointer"
							onClick={copySnippet}
						>
							<svg
								className="text-gray-50 hover:text-purple-400"
								width="19"
								height="23"
								viewBox="0 0 19 23"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									className="fill-current"
									d="M0.241211 19.9424C0.241211 21.7793 1.14648 22.7021 2.96582 22.7021H11.2275C13.0469 22.7021 13.9521 21.7705 13.9521 19.9424V18.3164H15.4902C17.3008 18.3164 18.2148 17.3848 18.2148 15.5566V3.34863C18.2148 1.52051 17.3008 0.588867 15.4902 0.588867H7.22852C5.41797 0.588867 4.50391 1.51172 4.50391 3.34863V4.97461H2.96582C1.15527 4.97461 0.241211 5.89746 0.241211 7.73438V19.9424ZM9.21484 3.60352C8.82812 3.60352 8.65234 3.34863 8.65234 3.08496V2.90039C8.65234 2.62793 8.82812 2.38184 9.21484 2.38184H13.5039C13.8818 2.38184 14.0664 2.62793 14.0664 2.90039V3.08496C14.0664 3.34863 13.8818 3.60352 13.5039 3.60352H9.21484ZM1.65625 19.916V7.75195C1.65625 6.89062 2.12207 6.38965 3.03613 6.38965H5.91895V11.4873C5.91895 12.5947 6.48145 13.1484 7.57129 13.1484H12.5371V19.916C12.5371 20.7949 12.0625 21.2871 11.1572 21.2871H3.02734C2.12207 21.2871 1.65625 20.7949 1.65625 19.916ZM7.73828 11.8213C7.38672 11.8213 7.24609 11.6807 7.24609 11.3291V6.71484L12.2646 11.8213H7.73828Z"
									fill="white"
								/>
							</svg>
						</button>
					)}
					{readOnly ? (
						<p className="text-xs text-gray-200">{owner}</p>
					) : (
						<Link to={`/user/${userData.username}/dashboard/addsnippet`} onClick={handleClick}>
							<svg
								className="text-gray-50 hover:text-purple-400"
								width="23"
								height="22"
								viewBox="0 0 23 22"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									className="fill-current"
									d="M11.3418 21.9707C17.3359 21.9707 22.2988 16.9971 22.2988 11.0137C22.2988 5.01953 17.3252 0.0566406 11.3311 0.0566406C5.34766 0.0566406 0.384766 5.01953 0.384766 11.0137C0.384766 16.9971 5.3584 21.9707 11.3418 21.9707ZM11.3418 20.1445C6.27148 20.1445 2.22168 16.084 2.22168 11.0137C2.22168 5.94336 6.26074 1.88281 11.3311 1.88281C16.4014 1.88281 20.4619 5.94336 20.4727 11.0137C20.4834 16.084 16.4121 20.1445 11.3418 20.1445ZM15.585 8.00586L16.3584 7.22168C16.7021 6.85645 16.7344 6.46973 16.4121 6.14746L16.165 5.90039C15.8428 5.57812 15.4453 5.61035 15.1016 5.9541L14.3174 6.72754L15.585 8.00586ZM7.89355 15.665L14.9404 8.63965L13.6729 7.37207L6.63672 14.3867L6.02441 15.8154C5.91699 16.084 6.1748 16.3096 6.41113 16.2236L7.89355 15.665Z"
									fill="white"
								/>
							</svg>
						</Link>
					)}
				</div>
			</div>
			<pre className="font-mono text-xs tracking-normal leading-5">
				<code
					dangerouslySetInnerHTML={{ __html: code }}
					className={`language-${parseFormat} border border-gray-500 px-4 py-3 h-96 subpixel-antialiased`}
				></code>
			</pre>
			{notes ? (
				<div className="px-4">
					<h3 className="text-md text-gray-200 font-normal">Notes</h3>
					<p className="text-gray-50 text-xs font-thin">{notes}</p>
				</div>
			) : null}
		</div>
	) : (
		<LoadingRing className="h-[48rem] w-auto" />
	)
}
