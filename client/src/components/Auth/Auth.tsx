import { useContext } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { UserContext } from '../../context/UserContext'
import Modal from '../Modal/Modal'
import './auth.css'
import {
	emailValidation,
	nameValidation,
	passwordValidation,
} from './validation'

export default function Auth(): JSX.Element {
	const {
		isLogin,
		clickAuth,
		errorsValidation,
		register,
		handleSubmit,
		errors,
		isValid,
	} = useContext(UserContext)

	return (
		<div className='auth'>
			<div className='container'>
				<div className='auth__cont'>
					{errorsValidation && <Modal />}
					<div className='auth-box'>
						<div className='auth-box__up-btn'>
							<NavLink
								to='/sign_in'
								className={`auth-link ${isLogin ? 'active' : ''}`}
							>
								SIGN IN
							</NavLink>
							<NavLink
								to='/sign_up'
								className={`auth-link ${isLogin ? '' : 'active'}`}
							>
								SIGN UP
							</NavLink>
						</div>
						<form onSubmit={handleSubmit(clickAuth)} className='form'>
							{isLogin ? (
								<></>
							) : (
								<div className='form__input'>
									<label>Username</label>
									<input
										{...register('name', nameValidation)}
										autoComplete='off'
									/>
									{errors?.name && (
										<div className='error'>{errors?.name?.message}</div>
									)}
								</div>
							)}

							<div className='form__input'>
								<label>Email</label>
								<input
									{...register('email', emailValidation)}
									type='email'
									autoComplete='off'
								/>
								{errors?.email && (
									<div className='error'>{errors?.email?.message}</div>
								)}
							</div>
							<div className='form__input'>
								<label>Password</label>
								<input
									{...register('password', passwordValidation)}
									type='password'
								/>
								{errors?.password && (
									<div className='error'>{errors?.password?.message}</div>
								)}
							</div>
							<div className='form__check'>
								<input type='checkbox' name='check' />
								<label>Keep Me Signed In</label>
							</div>

							<button type='submit' className='form__btn' disabled={!isValid}>
								{isLogin ? 'SIGN IN' : 'SIGN UP'}
							</button>
							{isLogin ? (
								<div className='form__footer'>
									<Link to='/password' className='form__link-pass'>
										Forgot Password?
									</Link>
								</div>
							) : (
								<></>
							)}
						</form>
					</div>
				</div>
			</div>
		</div>
	)
}
