import { useState, useEffect } from 'react'
import { EditCard } from '../../SvgContainer'

export function DatesPicker({ info, onUpdate }) {

	const [dueDate, setDueDate] = useState(info?.dueDate || null)

	useEffect(() => {
		setDueDate(info?.dueDate || null)
	}, [])

	function onUpdateDue(date) {

		console.log(info, 'info')
		console.log(dueDate, 'before')
		console.log(date, 'date')
		setDueDate(prev => prev = date)
		console.log(dueDate, 'after')

	}

	return (
		<div className='dates-picker'>
			<ul>
			<thead>Due date</thead>
			<li>
				<input
					type='date'
					value={dueDate}
					onChange={ev => onUpdateDue(ev.target.value)}
				/>
			</li>
			</ul>
		</div>
	)

}
