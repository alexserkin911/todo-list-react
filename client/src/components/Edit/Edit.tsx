import React from 'react'

export default function Edit({
	updateTask,
	editHandler,
	setIsEditing,
	inputtodo,
}: any) {
	return (
		<div className='edit-form'>
			<input
				type='text'
				name='title'
				value={inputtodo?.title}
				onChange={editHandler}
			/>
			<button onClick={() => updateTask(inputtodo)}>Save</button>
			<button onClick={() => setIsEditing(false)}>Cancel</button>
		</div>
	)
}
