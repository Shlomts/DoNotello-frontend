import { Fragment, useEffect, useState } from 'react'
import { DownArrow } from '../SvgContainer'
import { Checkbox } from '@mui/material'

export function CardDates({ dates, isDone, onDone }) {
	const { dueDate } = dates
	const [cardIsDone, setCardIsDone] = useState(isDone)

	function checkIsLate() {
		let check = ''
		if (cardIsDone) check = 'Complete'
		else {
			const inputDate = new Date(dueDate)
			if (isNaN(inputDate.getTime())) return null
			const today = new Date()
			today.setHours(0, 0, 0, 0)
			inputDate.setHours(0, 0, 0, 0)

			check = inputDate < today ? 'Overdue' : ''
		}
		return <span className={check.toLowerCase()}>{check}</span>
	}

	return (
		<div className='card-dates'>
			<Checkbox
				onClick={() => {
					setCardIsDone(prev => !prev)
					onDone()
				}}
				checked={cardIsDone}
				inputProps={{ 'aria-label': 'controlled' }}
				sx={{
					color: '#738496',
					padding: 0,
					'&:hover': { fillOpacity: '85%' },
					':active': {
						color: 'white',
					},
					':focus': {
						color: 'white',
					},
					'&.Mui-checked': {
						color: '#579dff',
					},
					'& .MuiSvgIcon-root': {
						fontSize: '20px',
					},
				}}
			/>
			<div className='date-btn'>
				{new Date(dueDate).toDateString()}
				{checkIsLate()}
				<DownArrow />
			</div>
		</div>
	)
}
