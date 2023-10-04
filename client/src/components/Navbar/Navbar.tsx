import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'

import { UserContext } from '../../context/UserContext'
import './navbar.css'

export default function Navbar(): JSX.Element {
	const { user, setUser, initUser } = useContext(UserContext)

	useEffect(() => {
		;(async () => {
			try {
				const response = await fetch('http://localhost:3001/user/check', {
					credentials: 'include',
				})
				const result = await response.json()
				setUser(result)
			} catch (error) {
				console.error('no user navbar', error)
			}
		})()
	}, [setUser])

	const logoutHandler = async (): Promise<void> => {
		try {
			await fetch('http://localhost:3001/user/logout', {
				credentials: 'include',
			})
			setUser(initUser)
		} catch (error) {
			console.log('no exit', error)
		}
	}

	return (
		<nav className='nav'>
			<div className='container'>
				<div className='nav__row'>
					{user.name ? (
						<div className='name'>HI, {user.name}</div>
					) : (
						<div className='name'>WELCOME TO TODO LIST</div>
					)}
					<div className='nav__row__btn'>
						{user.name ? (
							<button onClick={logoutHandler} className='nav__row__btn__sign'>
								Logout
							</button>
						) : (
							<Link to='/sign_in' className='nav__row__btn__sign'>
								Sign In
							</Link>
						)}
					</div>
				</div>
			</div>
		</nav>
	)
}
