export default function PrismCode({ code, language }) {
	// const code = `
	// const foo = 'foo'
	// const bar = 'bar'
	// console.log(foo + bar)
	// `
	// const language = 'js'

	return (
		<pre className="line-numbers">
			<code className={`language-${language}`}>
				{code.trim()}
			</code>
		</pre>
	)
}