import { useContext } from 'react'
import InputTodo from '../InputTodo/InputTodo'
import MyTask from '../MyTask/MyTask'

import { TodoContext } from '../../context/TodoContext'

import { UserContext } from '../../context/UserContext'
import Pages from '../Pages/Pages'
import './todo.css'

export default function Todo(): JSX.Element {
	const { totalTask } = useContext(TodoContext)

	const { user } = useContext(UserContext)

	return (
		<div className='todo'>
			<div className='container'>
				<div className='todo__cont'>
					{user.name ? (
						<div className='todo__box'>
							<section className='todo__box__info'>Todos ({totalTask})</section>
							<section className='todo__box__input'>
								<InputTodo />
							</section>
							<section className='todo__box__input'>
								<MyTask />
							</section>
							<section className='todo__box__pagination'>
								<Pages />
							</section>
						</div>
					) : (
						<div className='start__add'>To add a task, sign in!</div>
					)}
				</div>
			</div>
		</div>
	)
}
