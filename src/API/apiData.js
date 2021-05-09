export const createUser = async (e, BASE_URL, formData) => {
	const body = { ...formData }
	try {
		const response = await fetch(`${BASE_URL}/register`, {
			method: 'POST',
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(body)
		})
		const data = await response.json()
		return data
	} catch (err) {
		return err
	}
}

export const getUserData = async (BASE_URL, username, token) => {
	try {
		const response = await fetch(`${BASE_URL}/user/${username}`, {
			method: 'GET',
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`
			}
		})
		const data = await response.json()
		return data
	} catch (err) {
		console.error(err)
	}
}
