import { useState, useEffect } from 'react'

export function DatesPicker({ info, onUpdate }) {
	const [dueDate, setDueDate] = useState(info?.dueDate || null)

	useEffect(() => {
		setDueDate(info?.dueDate || null)
	}, [])

	function onUpdateDueDate(date) {
		setDueDate(prev => prev = date)
		onUpdate({dueDate: date})
	}

	return (
		<div className='dates-picker'>

			<ul>
			<thead>Due date</thead>
			<li>
				<input
					type='date'
					value={dueDate}
					onChange={ev => onUpdateDueDate(ev.target.value)}
				></input>
			</li>
			</ul>
		</div>
	)

}
