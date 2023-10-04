export const $authHost = async (url, method, data) => {
	await fetch(`${process.env.REACT_APP_API_URL + url}`, {
		method,
		headers: { 'Content-Type': 'application/json' },
		credentials: 'include',
		body: JSON.stringify(data),
	})
}
