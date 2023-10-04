export interface INITINPUTSTODO {
	id: number
	isDone: boolean
	title: string
}
export const initInputTodo: INITINPUTSTODO = {
	id: 0,
	isDone: false,
	title: '',
}
export type Props = {
	children: React.ReactNode
}

export interface IContext {
	totalTask: number
	setTotalTask: React.Dispatch<React.SetStateAction<number>>
	pages: number[]
	currentPage: number
	setCurrentPage: React.Dispatch<React.SetStateAction<number>>
	editInputTask: INITINPUTSTODO
	editHandler: (event: React.ChangeEvent<HTMLInputElement>) => void
	updateTask: (editInputTask: INITINPUTSTODO) => Promise<void>
	setEditInputTask: React.Dispatch<React.SetStateAction<INITINPUTSTODO>>
	delHandler: (id: number) => Promise<void>
	formHandlerInputTodo: (event: React.ChangeEvent<HTMLInputElement>) => void
	submitHandlerTodo: (event: React.FormEvent<HTMLFormElement>) => Promise<void>
	checkHandler: (
		event: React.ChangeEvent<HTMLInputElement>,
		task: INITINPUTSTODO
	) => void
	tasks: INITINPUTSTODO[]
	setTasks: React.Dispatch<React.SetStateAction<INITINPUTSTODO[]>>
	initInputTodo: INITINPUTSTODO
	inputtodo: INITINPUTSTODO
	setInputtodo: React.Dispatch<React.SetStateAction<INITINPUTSTODO>>
}
