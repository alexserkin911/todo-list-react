import { $authHost } from '.'

export const registration = async (data) => {
	return await $authHost('user/register', 'POST', data)
}

export const login = async (data) => {
	return await $authHost('user/login', 'POST', data)
}
