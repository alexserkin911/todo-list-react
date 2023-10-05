import {
	FieldErrors,
	SubmitHandler,
	UseFormHandleSubmit,
	UseFormRegister,
	UseFormReset,
} from 'react-hook-form'
import { Location, NavigateFunction } from 'react-router-dom'
export interface INITREG {
	name: string
	email: string
	password: string
}

export const initReg: INITREG = {
	name: '',
	email: '',
	password: '',
}

export interface IINITUSER {
	id: number
	name: string
	email: string
	updatedAt: string
	createdAt: string
}

export const initUser: IINITUSER = {
	id: 0,
	name: '',
	email: '',
	updatedAt: '',
	createdAt: '',
}
export interface IUserContext {
	clickAuth: SubmitHandler<INITREG>
	initReg: INITREG
	user: IINITUSER
	setUser: React.Dispatch<React.SetStateAction<IINITUSER>>
	location: Location
	navigate: NavigateFunction
	initUser: IINITUSER
	isLogin: boolean
	errorsValidation: string
	setErrorsValidation: React.Dispatch<React.SetStateAction<string>>
	register: UseFormRegister<INITREG>
	handleSubmit: UseFormHandleSubmit<INITREG, undefined>
	errors: FieldErrors<INITREG>
	reset: UseFormReset<INITREG>
	isValid: boolean
}
