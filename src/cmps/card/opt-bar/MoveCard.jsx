import { useState } from 'react'

export function MoveCard({ info, onUpdate }) {
	// const [checklistTitle, setChecklistTitle] = useState('Checklist')

	// function onSaveTitle() {
	// 	onUpdate(checklistTitle)
	// 	setChecklistTitle('Checklist')
	// }

	return (
		<section className='move-card'>
			<thead>Title</thead>
			{/* <li>
				<input
					type='text'
					className='edit'
					placeholder='Search labels'
					value={checklistTitle}
					onChange={ev => setChecklistTitle(ev.target.value)}
					onKeyDown={ev => {
						if (ev.key === 'Enter') onSaveTitle()
					}}
				autoFocus
				/>
			</li>
			<button className='add' onClick={onSaveTitle}>
				Add
			</button> */}
		</section>
	)
}
