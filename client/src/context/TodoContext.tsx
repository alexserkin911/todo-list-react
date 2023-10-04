import React, {
	FC,
	createContext,
	useContext,
	useEffect,
	useState,
} from 'react'
import { IContext, INITINPUTSTODO, Props, initInputTodo } from '../types'
import { UserContext } from './UserContext'

export const TodoContext: React.Context<IContext> = createContext(
	{} as IContext
)

export const TodoContextProvider: FC<Props> = ({ children }) => {
	const [inputtodo, setInputtodo] = useState(initInputTodo) as [
		INITINPUTSTODO,
		React.Dispatch<React.SetStateAction<INITINPUTSTODO>>
	]

	const [tasks, setTasks] = useState<INITINPUTSTODO[]>([])

	const limitItemPage: number = 5
	let pages: number[] = []

	const [currentPage, setCurrentPage] = useState<number>(1)
	const [totalPage, setTotalPage] = useState<number>(0)
	const [totalTask, setTotalTask] = useState<number>(0)

	for (let i = 0; i < totalPage; i++) {
		pages.push(i + 1)
	}

	const formHandlerInputTodo = (
		event: React.ChangeEvent<HTMLInputElement>
	): void => {
		setInputtodo((pre) => ({
			...pre,
			[event.target.name]: event.target.value,
		}))
	}

	const submitHandlerTodo = async (
		event: React.FormEvent<HTMLFormElement>
	): Promise<void> => {
		event.preventDefault()
		try {
			const task: Response = await fetch('http://localhost:3001/tasks', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				credentials: 'include',
				body: JSON.stringify({ ...inputtodo, page: currentPage }),
			})
			const res = await task.json()
			setTotalTask(res.count)
			setTotalPage(Math.ceil(res.count / limitItemPage))
			setTasks(res.rows)
			setInputtodo(initInputTodo)
		} catch (error) {
			console.error('Task no input', error)
		}
	}

	const { user } = useContext(UserContext)

	useEffect((): void => {
		if (user.name) {
			;(async function (): Promise<void> {
				try {
					const response: Response = await fetch(
						`http://localhost:3001/tasks/${user.id}?page=${currentPage}&limit=${limitItemPage}`,
						{
							credentials: 'include',
						}
					)
					const result = await response.json()
					setTotalTask(result.count)
					setTotalPage(Math.ceil(result.count / limitItemPage))
					setTasks(result.rows)
				} catch (error) {
					console.log(error)
				}
			})()
		}
	}, [user.name, setTasks, user.id, currentPage])

	const delHandler = async (id: number): Promise<void> => {
		try {
			const response: Response = await fetch(
				`http://localhost:3001/tasks/${id}?page=${currentPage}&limit=${limitItemPage}`,
				{
					method: 'DELETE',
					headers: { 'Content-Type': 'application/json' },
					credentials: 'include',
				}
			)
			const result = await response.json()
			setTotalTask(result.count)
			setTotalPage(Math.ceil(result.count / limitItemPage))
			setTasks(result.rows)
			// setTasks((pre) => pre.filter((el) => el.id !== id))
		} catch (error) {
			console.log(error)
		}
	}

	const [editInputTask, setEditInputTask] = useState(initInputTodo) as [
		INITINPUTSTODO,
		React.Dispatch<React.SetStateAction<INITINPUTSTODO>>
	]

	const editHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
		setEditInputTask((pre) => ({
			...pre,
			[event.target.name]: event.target.value,
		}))
	}

	const checkHandler = async (
		event: React.ChangeEvent<HTMLInputElement>,
		task: INITINPUTSTODO
	) => {
		const checkTask = {
			...task,
			[event.target.name]: event.target.checked,
		}

		try {
			await fetch('http://localhost:3001/tasks', {
				method: 'PUT',
				headers: { 'Content-type': 'application/json' },
				credentials: 'include',
				body: JSON.stringify(checkTask),
			})

			setTasks((pre) => pre.map((ta) => (ta.id === task.id ? checkTask : ta)))
		} catch (error) {
			console.error('Task update error', error)
		}
	}

	const updateTask = async (editInputTask: INITINPUTSTODO) => {
		try {
			await fetch('http://localhost:3001/tasks', {
				method: 'PUT',
				headers: { 'Content-type': 'application/json' },
				credentials: 'include',
				body: JSON.stringify(editInputTask),
			})
			setTasks((pre) =>
				pre.map((task) => (task.id === editInputTask.id ? editInputTask : task))
			)
			setEditInputTask(initInputTodo)
		} catch (error) {
			console.error('Task update error', error)
		}
	}

	const contextValue = {
		formHandlerInputTodo,
		submitHandlerTodo,
		checkHandler,
		editInputTask,
		editHandler,
		updateTask,
		setEditInputTask,
		delHandler,
		pages,
		currentPage,
		setCurrentPage,
		tasks,
		totalTask,
		setTasks,
		setTotalTask,
		initInputTodo,
		inputtodo,
		setInputtodo,
	}

	return (
		<TodoContext.Provider value={contextValue}>{children}</TodoContext.Provider>
	)
}
