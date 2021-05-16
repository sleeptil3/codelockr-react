import { useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../Pages/User/User'
import hljs from 'highlight.js';

export default function Snippet({ title, code, parentFolder, parseFormat, notes, snippet_id }) {
	const { setSnippetSubmitMode, userData, setSnippetForm, filter } = useContext(UserContext)

	const handleClick = () => {
		setSnippetSubmitMode('PUT')
		setSnippetForm({
			title: title,
			code: code,
			notes: notes,
			snippet_id: snippet_id
		})
	}

	useEffect(() => {
		hljs.highlightAll()
	}, [])

	return (
		<div className="shadow-xl rounded-lg py-5 px-8 space-y-5 bg-gradient-to-b from-darkBlue to-gray-900">
			<div className="flex justify-between items-center">
				<h2 className="text-2xl text-gray-50 font-normal">{title} {!filter ? <span className="font-thin text-sm">({userData.folders.find(folder => folder._id == parentFolder).title})</span> : null}</h2>
				<Link to={`/user/${userData.username}/dashboard/addsnippet`} onClick={handleClick}>
					<svg width="30" height="30" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path fillRule="evenodd" clipRule="evenodd" d="M19.8424 0.932053C20.6704 0.932053 21.3424 1.60405 21.3424 2.43205C21.3424 3.26005 20.6704 3.93205 19.8424 3.93205H12.3644C7.1964 3.93205 3.8584 7.47205 3.8584 12.9501V29.5781C3.8584 35.0561 7.1964 38.5961 12.3644 38.5961H30.0124C35.1804 38.5961 38.5204 35.0561 38.5204 29.5781V21.5221C38.5204 20.6941 39.1924 20.0221 40.0204 20.0221C40.8484 20.0221 41.5204 20.6941 41.5204 21.5221V29.5781C41.5204 36.7661 36.8944 41.5961 30.0124 41.5961H12.3644C5.4824 41.5961 0.858398 36.7661 0.858398 29.5781V12.9501C0.858398 5.76205 5.4824 0.932053 12.3644 0.932053H19.8424ZM37.2616 2.68925L39.6956 5.12325C40.8816 6.30725 41.5336 7.88125 41.5316 9.55725C41.5316 11.2333 40.8796 12.8053 39.6956 13.9873L24.6776 29.0053C23.5756 30.1073 22.1076 30.7153 20.5476 30.7153H13.0556C12.6516 30.7153 12.2636 30.5513 11.9816 30.2613C11.6996 29.9733 11.5456 29.5833 11.5556 29.1773L11.7436 21.6193C11.7816 20.1153 12.3876 18.7013 13.4516 17.6353H13.4536L28.3996 2.68925C30.8436 0.249253 34.8176 0.249253 37.2616 2.68925ZM27.1684 8.16125L15.5736 19.7573C15.0556 20.2753 14.7616 20.9633 14.7436 21.6933L14.5936 27.7153H20.5476C21.3076 27.7153 22.0196 27.4213 22.5576 26.8833L34.2224 15.2153L27.1684 8.16125ZM30.5196 4.81125L29.2884 6.03925L36.3424 13.0953L37.5756 11.8653C38.1916 11.2493 38.5316 10.4293 38.5316 9.55725C38.5316 8.68325 38.1916 7.86125 37.5756 7.24525L35.1416 4.81125C33.8676 3.54125 31.7956 3.54125 30.5196 4.81125Z" fill="#F9FAFB" />
					</svg>
				</Link>
			</div>
			<pre className="text-sm">
				<code className={`language-${parseFormat} rounded-lg border border-gray-50 p-3 h-96`}>
					{code}
				</code>
			</pre>
			{notes ? (
				<div>
					<h3 className="text-xl text-gray-50 font-normal">Notes</h3>
					<p className="text-gray-50">{notes}</p>
				</div>
			) : ""}
		</div>
	)
}
