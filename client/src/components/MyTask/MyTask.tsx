import { useContext } from 'react'
import { TodoContext } from '../../context/TodoContext'
import MyTaskItem from '../MyTaskItem/MyTaskItem'
import './mytask.css'

export default function MyTask(): JSX.Element {
	const { tasks } = useContext(TodoContext)

	return (
		<div className='mytask'>
			{tasks?.map((task) => (
				<MyTaskItem key={task.id} task={task} />
			))}
		</div>
	)
}
