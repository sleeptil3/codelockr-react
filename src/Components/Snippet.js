import { useContext, useState } from "react"
import { Link } from "react-router-dom"
import { UserContext } from "../Pages/User/User"

export default function Snippet({ parentFolder, readOnly, title, code, isPrivate, parseFormat, notes, snippet_id, owner }) {
	const { setSnippetSubmitMode, userData, setSnippetForm } = useContext(UserContext)
	const [isCopied, setIsCopied] = useState(false)

	const handleClick = () => {
		setSnippetForm({
			title: title,
			code: code,
			notes: notes,
			snippet_id: snippet_id,
			isPrivate: isPrivate,
			parseFormat: parseFormat,
			parentFolder: parentFolder,
		})
		setSnippetSubmitMode("PUT")
	}

	const copySnippet = () => {
		navigator.clipboard.writeText(code).then(() => {
			setIsCopied(true)
			setTimeout(() => setIsCopied(false), 2000)
		})
	}

	if (!userData.username) return <h1 className="text-xl text-gray-50 font-normal">Loading</h1>
	else {
		return (
			<div className="sm:cs-border-outset shadow-lg px-4 sm:px-8 space-y-2 pb-4 pt-2 sm:pt-4 sm:pb-8 sm:space-y-4 bg-gray-900">
				<div className="flex justify-between items-baseline">
					<div className="">
						<h2 className="text-md sm:text-lg text-gray-50 font-thin">{ title }</h2>
						{ isPrivate ? <span className="text-xs">Private</span> : null }
					</div>
					<div className="flex items-center">
						{ isCopied ? (
							<svg className="text-green-500 mr-3" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path className="fill-current" d="M11.9272 23.1162C18.1938 23.1162 23.3823 17.9165 23.3823 11.6611C23.3823 5.39453 18.1826 0.206055 11.916 0.206055C5.66064 0.206055 0.472168 5.39453 0.472168 11.6611C0.472168 17.9165 5.67188 23.1162 11.9272 23.1162ZM11.9272 21.207C6.62646 21.207 2.39258 16.9619 2.39258 11.6611C2.39258 6.36035 6.61523 2.11523 11.916 2.11523C17.2168 2.11523 21.4619 6.36035 21.4731 11.6611C21.4844 16.9619 17.228 21.207 11.9272 21.207ZM16.3633 8.5166L17.1719 7.69678C17.5312 7.31494 17.5649 6.91064 17.228 6.57373L16.9697 6.31543C16.6328 5.97852 16.2173 6.01221 15.8579 6.37158L15.0381 7.18018L16.3633 8.5166ZM8.32227 16.5239L15.6895 9.1792L14.3643 7.854L7.0083 15.1875L6.36816 16.6812C6.25586 16.9619 6.52539 17.1978 6.77246 17.1079L8.32227 16.5239Z" fill="white" />
							</svg>
						) : (
							<button title="Copy to clipboard" className="flex mr-3 cursor-pointer" onClick={ copySnippet }>
								<svg className="text-gray-50 hover:text-red-600" width="19" height="23" viewBox="0 0 19 23" fill="none" xmlns="http://www.w3.org/2000/svg">
									<path className="fill-current" d="M0.241211 19.9424C0.241211 21.7793 1.14648 22.7021 2.96582 22.7021H11.2275C13.0469 22.7021 13.9521 21.7705 13.9521 19.9424V18.3164H15.4902C17.3008 18.3164 18.2148 17.3848 18.2148 15.5566V3.34863C18.2148 1.52051 17.3008 0.588867 15.4902 0.588867H7.22852C5.41797 0.588867 4.50391 1.51172 4.50391 3.34863V4.97461H2.96582C1.15527 4.97461 0.241211 5.89746 0.241211 7.73438V19.9424ZM9.21484 3.60352C8.82812 3.60352 8.65234 3.34863 8.65234 3.08496V2.90039C8.65234 2.62793 8.82812 2.38184 9.21484 2.38184H13.5039C13.8818 2.38184 14.0664 2.62793 14.0664 2.90039V3.08496C14.0664 3.34863 13.8818 3.60352 13.5039 3.60352H9.21484ZM1.65625 19.916V7.75195C1.65625 6.89062 2.12207 6.38965 3.03613 6.38965H5.91895V11.4873C5.91895 12.5947 6.48145 13.1484 7.57129 13.1484H12.5371V19.916C12.5371 20.7949 12.0625 21.2871 11.1572 21.2871H3.02734C2.12207 21.2871 1.65625 20.7949 1.65625 19.916ZM7.73828 11.8213C7.38672 11.8213 7.24609 11.6807 7.24609 11.3291V6.71484L12.2646 11.8213H7.73828Z" fill="white" />
								</svg>
							</button>
						) }
						{ readOnly ? (
							<p className="text-xs text-gray-200">({ owner })</p>
						) : (
							<Link to={ `/user/${ userData.username }/dashboard/addsnippet` } onClick={ handleClick }>
								<svg className="text-gray-50 hover:text-red-600" width="23" height="22" viewBox="0 0 23 22" xmlns="http://www.w3.org/2000/svg">
									<path className="fill-current" d="M11.3418 21.9707C17.3359 21.9707 22.2988 16.9971 22.2988 11.0137C22.2988 5.01953 17.3252 0.0566406 11.3311 0.0566406C5.34766 0.0566406 0.384766 5.01953 0.384766 11.0137C0.384766 16.9971 5.3584 21.9707 11.3418 21.9707ZM11.3418 20.1445C6.27148 20.1445 2.22168 16.084 2.22168 11.0137C2.22168 5.94336 6.26074 1.88281 11.3311 1.88281C16.4014 1.88281 20.4619 5.94336 20.4727 11.0137C20.4834 16.084 16.4121 20.1445 11.3418 20.1445ZM15.585 8.00586L16.3584 7.22168C16.7021 6.85645 16.7344 6.46973 16.4121 6.14746L16.165 5.90039C15.8428 5.57812 15.4453 5.61035 15.1016 5.9541L14.3174 6.72754L15.585 8.00586ZM7.89355 15.665L14.9404 8.63965L13.6729 7.37207L6.63672 14.3867L6.02441 15.8154C5.91699 16.084 6.1748 16.3096 6.41113 16.2236L7.89355 15.665Z" fill="white" />
								</svg>
							</Link>
						) }
					</div>
				</div>
				<pre className="font-mono text-xs tracking-normal leading-5">
					<code className={ `language-${ parseFormat } border border-gray-500 px-4 py-3 h-96` }>{ code }</code>
				</pre>
				{ notes ? (
					<div className="px-4">
						<h3 className="text-md text-gray-200 font-normal">Notes</h3>
						<p className="text-gray-50 text-xs font-thin">{ notes }</p>
					</div>
				) : null }
			</div>
		)
	}
}
