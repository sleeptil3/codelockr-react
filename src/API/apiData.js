// SHOW
export const getAllUsers = async (BASE_URL, token) => {
	try {
		const response = await fetch(`${BASE_URL}/admin/users`, {
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

export const getAllSnippets = async (BASE_URL, username, token, user_id) => {
	try {
		const response = await fetch(`${BASE_URL}/user/${username}/${user_id}/allsnippets`, {
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

export const getFriendSnippets = async (BASE_URL, username, token) => {
	try {
		const response = await fetch(`${BASE_URL}/user/${username}/friendsnippets`, {
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

export const getAdminCounts = async (BASE_URL, token) => {
	try {
		const response = await fetch(`${BASE_URL}/admin/count`, {
			method: 'GET',
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`
			}
		})
		const data = await response.json()
		return data
	} catch (error) {
		console.error(error)
	}
}

// CREATE
export const createUser = async (BASE_URL, formData) => {
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
		console.error(err)
	}
}

export const createSnippet = async (BASE_URL, username, token, formData, user_id) => {
	const body = { ...formData, owner: user_id }
	try {
		const response = await fetch(`${BASE_URL}/user/${username}/${formData.parentFolder}/addsnippet`, {
			method: 'POST',
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`
			},
			body: JSON.stringify(body)
		})
		const data = await response.json()
		return data
	} catch (err) {
		return err
	} finally {
		getUserData(BASE_URL, username, token)
	}
}

export const addFolder = async (BASE_URL, username, token, formData) => {
	const body = { ...formData }
	try {
		const response = await fetch(`${BASE_URL}/user/${username}/addfolder`, {
			method: 'POST',
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`
			},
			body: JSON.stringify(body)
		})
		const data = await response.json()
		return data
	} catch (error) {
		console.error(error)
	}
}

// EDIT

export const editSnippet = async (BASE_URL, username, token, formData) => {
	const body = { ...formData }
	try {
		const response = await fetch(`${BASE_URL}/user/${username}/snippets/${formData.snippet_id}/edit`, {
			method: 'PUT',
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`
			},
			body: JSON.stringify(body)
		})
		const data = await response.json()
		return data
	} catch (error) {
		console.error(error)
	}
}

export const editUser = async (BASE_URL, username, token, formData) => {
	const body = { ...formData }
	try {
		const response = await fetch(`${BASE_URL}/user/${username}/edit`, {
			method: 'PUT',
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`
			},
			body: JSON.stringify(body)
		})
		const data = await response.json()
		return data
	} catch (error) {
		console.error(error)
	}
}

export const editFolder = async (BASE_URL, username, token, folder_id, formData) => {
	const body = { ...formData }
	try {
		const response = await fetch(`${BASE_URL}/user/${username}/folders/${folder_id}/edit`, {
			method: 'PUT',
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`
			},
			body: JSON.stringify(body)
		})
		const data = await response.json()
		return data
	} catch (error) {
		console.error(error)
	}
}

export const approveFriend = async (BASE_URL, username, token, friend_id) => {
	try {
		const response = await fetch(`${BASE_URL}/user/${username}/approvefriend/${friend_id}`, {
			method: 'PUT',
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`
			}
		})
		const data = await response.json()
		return data
	} catch (error) {
		console.error(error)
	}
}

export const denyFriend = async (BASE_URL, username, token, friend_id) => {
	try {
		const response = await fetch(`${BASE_URL}/user/${username}/denyfriend/${friend_id}`, {
			method: 'PUT',
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`
			}
		})
		const data = await response.json()
		return data
	} catch (error) {
		console.error(error)
	}
}

export const requestFriend = async (BASE_URL, username, token, friend_username) => {
	try {
		const response = await fetch(`${BASE_URL}/user/${username}/addfriend/${friend_username}`, {
			method: 'PUT',
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`
			}
		})
		const data = await response.json()
		return data
	} catch (error) {
		console.error(error)
	}
}

// DELETE

export const deleteSnippet = async (BASE_URL, username, token, snippet_id) => {
	try {
		const response = await fetch(`${BASE_URL}/user/${username}/snippets/${snippet_id}/delete`, {
			method: 'DELETE',
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`
			}
		})
		const data = await response.json()
		return data
	} catch (error) {
		console.error(error)
	}
}

export const deleteFolder = async (BASE_URL, username, token, folder_id) => {
	try {
		const response = await fetch(`${BASE_URL}/user/${username}/folders/${folder_id}/delete`, {
			method: 'DELETE',
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`
			}
		})
		const data = await response.json()
		return data
	} catch (error) {
		console.error(error)
	}
}

export const deleteUser = async (BASE_URL, username, token) => {
	try {
		const response = await fetch(`${BASE_URL}/user/${username}/delete/`, {
			method: 'DELETE',
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`
			}
		})
		const data = await response.json()
		return data

	} catch (error) {
		console.error(error)
	}
}