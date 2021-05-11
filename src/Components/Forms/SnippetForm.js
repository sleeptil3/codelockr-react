import { useState } from 'react'

export default function SnippetForm() {
	const [formData, setFormData] = useState({
		title: '',
		folder: '',
		body: '',
	})

	const handleChange = (e) => {
		const { id, value } = e.target
		setFormData({ ...formData, [id]: value })
	}

	return (
		<form noValidate>
			<div className="">
				<label>Title
				<input
						id="title"
						type="text"
						autocorrect="off"
						spellCheck="false"
						autoFocus
						autoComplete="none"
						onChange={handleChange}
						value={formData.title}
					/>
				</label>
			</div>
		</form>
	)
}