import { $authHost } from '.'

export const registration = async (data) => {
	const response = await $authHost('user/register', 'POST', data)
	return response
}

export const login = async (data) => {
	const response = await $authHost('user/login', 'POST', data)
	return response
}

export const check = async () => {
	const response = await fetch('http://localhost:3001/user/check', {
		credentials: 'include',
	})
	return response
}
