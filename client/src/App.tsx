import { Route, Routes } from 'react-router-dom'
import Auth from './components/Auth/Auth'
import Navbar from './components/Navbar/Navbar'
import ProtectedRouter from './components/ProtectedRouter/ProtectedRouter'
import Todo from './components/Todo/Todo'

function App(): JSX.Element {
	return (
		<div className='App'>
			<Navbar />
			<Routes>
				<Route path='/' element={<Todo />} />
				<Route element={<ProtectedRouter />}>
					<Route path='/sign_in' element={<Auth />} />
					<Route path='/sign_up' element={<Auth />} />
				</Route>
			</Routes>
		</div>
	)
}

export default App
