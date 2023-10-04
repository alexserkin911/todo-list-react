import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { TodoContextProvider } from './context/TodoContext'
import { UserContextProvider } from './context/UserContext'
import './styles/normalize.css'
import './styles/style.css'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
	<BrowserRouter>
		<UserContextProvider>
			<TodoContextProvider>
				<App />
			</TodoContextProvider>
		</UserContextProvider>
	</BrowserRouter>
)
