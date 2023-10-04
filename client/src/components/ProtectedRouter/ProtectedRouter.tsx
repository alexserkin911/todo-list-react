import React, { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { UserContext } from '../../context/UserContext'

export default function ProtectedRouter() {
	const { user } = useContext(UserContext)
	if (Boolean(user.name)) {
		return <Navigate to={'/'} replace />
	}
	return <Outlet />
}
