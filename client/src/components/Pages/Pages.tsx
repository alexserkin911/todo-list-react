import React, { useContext } from 'react'
import { TodoContext } from '../../context/TodoContext'
import './pages.css'

export default function Pages(): JSX.Element {
	const { pages, currentPage, setCurrentPage } = useContext(TodoContext)
	return (
		<div className='pagination'>
			{pages.map((page: number) => (
				<button
					key={page}
					className={`pagination__item ${currentPage === page ? 'active' : ''}`}
					onClick={() => setCurrentPage(page)}
				>
					{page}
				</button>
			))}
		</div>
	)
}
