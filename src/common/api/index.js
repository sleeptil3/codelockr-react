import { BASE_URL } from "../constants"
const PWR_USER = process.env.REACT_APP_PWR_USER
const PWR_PASS = process.env.REACT_APP_PWR_PASS

export const handleLogin = async formData => {
	try {
		const body = JSON.stringify({ ...formData })
		const response = await fetch(`${BASE_URL}/login`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: body,
		})
		const data = await response.json()
		return data
	} catch (err) {
		console.log({ error: err.message })
		return { error: err.message }
	}
}

// SHOW
export const getAllUsers = async token => {
	try {
		const response = await fetch(`${BASE_URL}/admin/users`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		})
		const data = await response.json()
		return data
	} catch (err) {
		console.error(err)
	}
}

export const getUserData = async (username, token) => {
	try {
		const response = await fetch(`${BASE_URL}/user/${username}`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		})
		const data = await response.json()
		return data
	} catch (err) {
		console.error(err)
	}
}

export const getAllSnippets = async (username, token, user_id) => {
	try {
		const response = await fetch(`${BASE_URL}/user/${username}/${user_id}/allsnippets`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		})
		const data = await response.json()
		return data
	} catch (err) {
		console.error(err)
	}
}

export const getFriendSnippets = async (username, token) => {
	try {
		const response = await fetch(`${BASE_URL}/user/${username}/friendsnippets`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		})
		const data = await response.json()
		return data
	} catch (err) {
		console.error(err)
	}
}

export const getAdminCounts = async token => {
	try {
		const response = await fetch(`${BASE_URL}/admin/count`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		})
		const data = await response.json()
		return data
	} catch (error) {
		console.error(error)
	}
}

// CREATE
export const createUser = async formData => {
	const body = { ...formData }
	try {
		const response = await fetch(`${BASE_URL}/register`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(body),
		})
		const data = await response.json()
		return data
	} catch (err) {
		console.error(err)
	}
}

export const createSnippet = async (username, token, formData, user_id) => {
	const body = { ...formData, owner: user_id }
	try {
		const response = await fetch(
			`${BASE_URL}/user/${username}/${formData.parentFolder}/addsnippet`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify(body),
			}
		)
		const data = await response.json()
		return data
	} catch (err) {
		return err
	} finally {
		getUserData(BASE_URL, username, token)
	}
}

export const addFolder = async (username, token, formData) => {
	const body = { ...formData }
	try {
		const response = await fetch(`${BASE_URL}/user/${username}/addfolder`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify(body),
		})
		const data = await response.json()
		return data
	} catch (error) {
		console.error(error)
	}
}

// EDIT

export const editSnippet = async (username, token, formData) => {
	const body = { ...formData }
	try {
		const response = await fetch(
			`${BASE_URL}/user/${username}/snippets/${formData.snippet_id}/edit`,
			{
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify(body),
			}
		)
		const data = await response.json()
		return data
	} catch (error) {
		console.error(error)
	}
}

export const editUser = async (username, token, formData) => {
	const body = { ...formData }
	try {
		const response = await fetch(`${BASE_URL}/user/${username}/edit`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify(body),
		})
		const data = await response.json()
		return data
	} catch (error) {
		console.error(error)
	}
}

export const editFolder = async (username, token, folder_id, formData) => {
	const body = { ...formData }
	try {
		const response = await fetch(`${BASE_URL}/user/${username}/folders/${folder_id}/edit`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify(body),
		})
		const data = await response.json()
		return data
	} catch (error) {
		console.error(error)
	}
}

export const approveFriend = async (username, token, friend_id) => {
	try {
		const response = await fetch(`${BASE_URL}/user/${username}/approvefriend/${friend_id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		})
		const data = await response.json()
		return data
	} catch (error) {
		console.error(error)
	}
}

export const denyFriend = async (username, token, friend_id) => {
	try {
		const response = await fetch(`${BASE_URL}/user/${username}/denyfriend/${friend_id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		})
		const data = await response.json()
		return data
	} catch (error) {
		console.error(error)
	}
}

export const requestFriend = async (username, token, friend_username) => {
	try {
		const response = await fetch(`${BASE_URL}/user/${username}/addfriend/${friend_username}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		})
		const data = await response.json()
		return data
	} catch (error) {
		console.error(error)
	}
}

export const forgotPassword = async userEmail => {
	try {
		const body = {
			PWR_USER: PWR_USER,
			PWR_PASS: PWR_PASS,
			userEmail: userEmail,
		}
		const res = await fetch(`${BASE_URL}/pwr/auth`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(body),
		})
		const data = res.json()
		if (data.error) {
			console.error("Error: forgotPassword error message from codelockr-api", data)
			return data
		} else return data
	} catch (error) {
		console.error("Error: forgotPassword failed (codelockr-react)", error)
	}
}

// DELETE

export const deleteSnippet = async (username, token, snippet_id) => {
	try {
		const response = await fetch(`${BASE_URL}/user/${username}/snippets/${snippet_id}/delete`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		})
		const data = await response.json()
		return data
	} catch (error) {
		console.error(error)
	}
}

export const deleteFolder = async (username, token, folder_id) => {
	try {
		const response = await fetch(`${BASE_URL}/user/${username}/folders/${folder_id}/delete`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		})
		const data = await response.json()
		return data
	} catch (error) {
		console.error(error)
	}
}

export const deleteUser = async (username, token) => {
	try {
		const response = await fetch(`${BASE_URL}/user/${username}/delete/`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		})
		const data = await response.json()
		return data
	} catch (error) {
		console.error(error)
	}
}
