import { FC, createContext, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useLocation, useNavigate } from 'react-router-dom'
import { Props } from '../types'
import {
	IINITUSER,
	INITREG,
	IUserContext,
	initReg,
	initUser,
} from '../typesuser'

export const UserContext: React.Context<IUserContext> = createContext(
	{} as IUserContext
)

export const UserContextProvider: FC<Props> = ({ children }) => {
	const [user, setUser] = useState(initUser) as [
		IINITUSER,
		React.Dispatch<React.SetStateAction<IINITUSER>>
	]

	const location = useLocation()
	const isLogin = location.pathname === '/sign_in'
	const navigate = useNavigate()

	const [errorsValidation, setErrorsValidation] = useState<string>('')

	const openErrorModal = () => {
		setTimeout(() => {
			setErrorsValidation('')
		}, 5000)
	}

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isValid },
	} = useForm<INITREG>({ defaultValues: initReg, mode: 'onTouched' })

	const submitHandlerReg: SubmitHandler<INITREG> = async (data: INITREG) => {
		try {
			const userFromBack: Response = await fetch(
				'http://localhost:3001/user/register',
				{
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					credentials: 'include',
					body: JSON.stringify(data),
				}
			)
			const res = await userFromBack.json()

			if (res.errors) {
				openErrorModal()
				return setErrorsValidation(res.errors)
			}
			if (res.message) {
				reset()
				openErrorModal()
				return setErrorsValidation(res.message)
			}
			reset()
			setUser(res)
			navigate('/')
		} catch (error) {
			console.error('Ошибка при выполнении запроса:', error)
		}
	}

	const submitHandlerLogin: SubmitHandler<INITREG> = async (data: INITREG) => {
		try {
			const userFromBack = await fetch('http://localhost:3001/user/login', {
				method: 'POST',
				headers: { 'Content-type': 'application/json' },
				credentials: 'include',
				body: JSON.stringify(data),
			})
			const result = await userFromBack.json()

			if (result.message) {
				openErrorModal()
				return setErrorsValidation(result.message)
			}
			reset()
			setUser(result)
			navigate('/')
		} catch (error) {
			console.log('user login not sent', error)
		}
	}

	return (
		<UserContext.Provider
			value={{
				user,
				setUser,
				initUser,
				location,
				isLogin,
				navigate,
				submitHandlerReg,
				submitHandlerLogin,
				errorsValidation,
				setErrorsValidation,
				register,
				handleSubmit,
				errors,
				isValid,
				initReg,
				reset,
			}}
		>
			{children}
		</UserContext.Provider>
	)
}
