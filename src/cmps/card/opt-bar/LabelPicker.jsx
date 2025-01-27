import { useRef, useState } from 'react'
import { EditCard } from '../../SvgContainer'
import Checkbox from '@mui/material/Checkbox'
import { blue, blueGrey, lightBlue } from '@mui/material/colors'
import { light } from '@mui/material/styles/createPalette'

export function LabelPicker({ info, onUpdate }) {
	console.log('info:', info)
	if (!info || !info.boardLabels) return

	const [boardLabelsList, setBoardLabelsList] = useState(addIsInCard())

	function addIsInCard() {
		const newBoardLabels = info.boardLabels.map(label => ({
			...label,
			isInCard: info.cardLabels.includes(label.id),
		}))
		return newBoardLabels
	}

	function onUpdateLabels(id) {
		console.log('inupdate')
		setBoardLabelsList(prevLabels =>
			prevLabels.map(label => {
				if (label.id === id) label.isInCard = !label.isInCard
				return label
			})
		)
		onUpdate(id)
	}

	return (
		<section className='label-picker'>
			<input type='text' className='search' placeholder='Search labels' />
			{info.boardLabels.length > 0 && (
				<section className='labels-list'>
					<thead>Labels</thead>
					<ul>
						{boardLabelsList.map(label => (
							<li
								key={label.id}
								className='label'
								onClick={() => {
									onUpdateLabels(label.id)
								}}
							>
								<Checkbox
									checked={label.isInCard}
									// onChange={() => onUpdateLabels(label.id)}
									inputProps={{ 'aria-label': 'controlled' }}
									sx={{
										color: '#738496',
										// '&:hover': { bgcolor: 'red' },
										'&.Mui-checked': {
											color: '#579dff',
										},
									}}
								/>
								<div
									className='label'
									style={{ backgroundColor: label.color }}
								>
									{label.title}
								</div>
								{/* <EditCard onClick={onEditLabelName} /> */}
							</li>
						))}
					</ul>
				</section>
			)}
		</section>
	)
}
