import React, { useContext, useState } from 'react'
import { BiCheck, BiX } from 'react-icons/bi'
import { CiEdit } from 'react-icons/ci'
import { MdOutlineDelete } from 'react-icons/md'
import { TodoContext } from '../../context/TodoContext'
import { INITINPUTSTODO } from '../../types'
import './MyTaskItem.css'

export default function MyTaskItem({ task }: { task: INITINPUTSTODO }) {
	const {
		checkHandler,
		editInputTask,
		editHandler,
		updateTask,
		setEditInputTask,
		delHandler,
	} = useContext(TodoContext)

	const [isEditing, setIsEditing] = useState(false)

	return (
		<div className='item-task'>
			<input
				className='item-task__check'
				disabled={isEditing}
				type='checkbox'
				name='isDone'
				checked={task.isDone}
				onChange={(event) => checkHandler(event, task)}
			/>

			{isEditing ? (
				<input
					className='item-task__title'
					type='text'
					name='title'
					value={editInputTask.title}
					onChange={editHandler}
				/>
			) : (
				<div className={`item-task__title ${task.isDone ? 'completed' : ''}`}>
					{task.title}
				</div>
			)}

			{isEditing ? (
				<button
					className='item-task__edit'
					onClick={() => {
						updateTask(editInputTask)
						setIsEditing(false)
					}}
				>
					<BiCheck />
				</button>
			) : (
				<button
					disabled={task.isDone}
					className='item-task__edit'
					onClick={() => {
						setEditInputTask(task)
						setIsEditing(true)
					}}
				>
					<CiEdit className='item-task__btn' />
				</button>
			)}
			{isEditing ? (
				<button
					className='item-task__remove'
					onClick={() => {
						updateTask(editInputTask)
						setIsEditing(false)
					}}
				>
					<BiX className='item-task__btn' />
				</button>
			) : (
				<button
					onClick={() => delHandler(task.id)}
					className='item-task__remove'
				>
					<MdOutlineDelete className='item-task__btn' />
				</button>
			)}
		</div>
	)
}
