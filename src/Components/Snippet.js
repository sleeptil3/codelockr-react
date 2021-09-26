import { useLayoutEffect, useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../Pages/User/User'
import hljs from 'highlight.js';

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
			parentFolder: parentFolder
		})
		setSnippetSubmitMode('PUT')
	}

	useLayoutEffect(() => {
		hljs.highlightAll()
	}, [])

	const copySnippet = () => {
		navigator.clipboard.writeText(code).then(() => {
			setIsCopied(true)
			setTimeout(() => setIsCopied(false), 2000)
		})
	}

	if (!userData.username) return <h1 className="text-2xl text-gray-50 font-normal">Loading</h1>
	else {
		return (
			<div className="shadow-lg px-4 sm:px-8 space-y-2 pb-4 pt-2 sm:pt-4 sm:pb-8 sm:space-y-4 bg-gray-900">
				<div className="flex justify-between items-baseline">
					<div className="">
						<h2 className="text-md sm:text-lg text-gray-50 font-thin">{title}</h2>{isPrivate ? <span className="text-xs">Private</span> : null}
					</div>
					<div className="flex">
						{readOnly ? <p className="text-xs text-gray-200">({owner})</p>
							: <Link to={`/user/${userData.username}/dashboard/addsnippet`} onClick={handleClick}>
								<svg className="text-gray-50 fill-current hover:text-red-600" width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
									<path d="M4.00675 17.6C4.06175 17.6 4.11675 17.5945 4.17175 17.5862L8.79725 16.775C8.85225 16.764 8.9045 16.7393 8.943 16.698L20.6002 5.04075C20.6257 5.01531 20.646 4.98509 20.6598 4.95182C20.6736 4.91855 20.6807 4.88289 20.6807 4.84687C20.6807 4.81086 20.6736 4.7752 20.6598 4.74193C20.646 4.70866 20.6257 4.67844 20.6002 4.653L16.0298 0.07975C15.9775 0.0275 15.9087 0 15.8345 0C15.7602 0 15.6915 0.0275 15.6393 0.07975L3.982 11.737C3.94075 11.7782 3.916 11.8277 3.905 11.8827L3.09375 16.5082C3.067 16.6556 3.07656 16.8072 3.1216 16.95C3.16664 17.0928 3.24581 17.2224 3.35225 17.3277C3.53375 17.5037 3.762 17.6 4.00675 17.6V17.6ZM5.86025 12.804L15.8345 2.8325L17.8502 4.84825L7.876 14.8198L5.43125 15.2515L5.86025 12.804V12.804ZM21.12 19.91H0.88C0.39325 19.91 0 20.3032 0 20.79V21.78C0 21.901 0.099 22 0.22 22H21.78C21.901 22 22 21.901 22 21.78V20.79C22 20.3032 21.6067 19.91 21.12 19.91Z" />
								</svg>
							</Link>
						}
						{isCopied ? (
							<svg className="ml-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="22" height="22" fill="green"><path d="M20.285 2 9 13.567 3.714 8.556 0 12.272 9 21 24 5.715z"/></svg>
						) : (
							<button title="Copy to clipboard" className="flex ml-3 cursor-pointer" onClick={copySnippet}>
								<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" className="fill-current hover:text-red-600"><path d="M22 6v16H6V6h16zm2-2H4v20h20V4zM0 21V0h21v2H2v19H0z"/></svg>
							</button>
						)}
					</div>
				</div>
				<pre className="font-mono text-sm tracking-normal leading-5">
					<code className={`language-${parseFormat} border border-gray-500 px-4 py-3 max-h-96 min-h-48`}>
						{code}
					</code>
				</pre>
				{ notes ?
					<div className="px-4">
						<h3 className="text-md text-gray-200 font-normal">Notes</h3>
						<p className="text-gray-50 text-sm font-thin">{notes}</p>
					</div>
					: null
				}
			</div>
		)
	}
}