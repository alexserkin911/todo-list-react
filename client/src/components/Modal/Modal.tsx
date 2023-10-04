import React, { useContext } from 'react'
import { UserContext } from '../../context/UserContext'
import './modal.css'

export default function Modal(): JSX.Element {
	const { setErrorsValidation, errorsValidation } = useContext(UserContext)

	return (
		<div className='modal-overlay'>
			<div className='modal'>
				<button className='modal-close' onClick={() => setErrorsValidation('')}>
					&times;
				</button>
				<div className='modal-content'>{errorsValidation}</div>
			</div>
		</div>
	)
}
