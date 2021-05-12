import { useContext, useEffect } from 'react'
import { UserContext } from '../Pages/User/User'
import Prism from 'prismjs'

export default function Snippet() {
	const code = `import { useContext, useEffect } from 'react'
import { UserContext } from '../Pages/User/User'
`

	useEffect(() => {
		Prism.highlightAll()
	}, [])


	return (
		<div>
			<pre className="line-numbers">
				<code className="language-js">
					{code}
				</code>
			</pre>
		</div>
	)
}
