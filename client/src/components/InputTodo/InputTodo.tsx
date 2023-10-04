import React, { useContext } from 'react'
import { TodoContext } from '../../context/TodoContext'
import './inputtodo.css'

export default function InputTodo(): JSX.Element {
	const { inputtodo, formHandlerInputTodo, submitHandlerTodo } =
		useContext(TodoContext)

	return (
		<form onSubmit={submitHandlerTodo} className='input-todo'>
			<input
				type='text'
				name='title'
				className='input-todo__value'
				placeholder='Enter todo here...'
				value={inputtodo.title}
				onChange={formHandlerInputTodo}
			/>
			<button className='input-todo__btn'>Submit</button>
		</form>
	)
}
