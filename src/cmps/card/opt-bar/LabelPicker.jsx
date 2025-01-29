import { useRef, useState, useEffect } from 'react'
import { EditCard, Labels } from '../../SvgContainer'
import Checkbox from '@mui/material/Checkbox'
import { blue, blueGrey, lightBlue } from '@mui/material/colors'
import { light } from '@mui/material/styles/createPalette'

export function LabelPicker({ info, onUpdate }) {
	console.log('info:', info)
	if (!info || !info.boardLabels) return

	const [boardLabelsList, setBoardLabelsList] = useState(addIsInCard())
	const [srchPrm, setSrchPrm] = useState('')
	const [isEditMode, setIsEditMode] = useState(false)

	useEffect(() => {
		setBoardLabelsList(
			addIsInCard().filter(label =>
				label.title.toUpperCase().includes(srchPrm.toUpperCase())
			)
		)
	}, [srchPrm])

	function addIsInCard() {
		const newBoardLabels = info.boardLabels.map(label => ({
			...label,
			isInCard: info.cardLabels.includes(label.id),
		}))
		return newBoardLabels
	}

	function onSearchLabel(ev) {
		const prm = ev.target.value
		setSrchPrm(prm)
	}

	function onUpdateLabels(id) {
		setBoardLabelsList(prevLabels =>
			prevLabels.map(label => {
				if (label.id === id) label.isInCard = !label.isInCard
				return label
			})
		)
		onUpdate(id)
	}

	function onEditLabelName(id, name) {
		setBoardLabelsList(prevLabels =>
			prevLabels.map(label => {
				if (label.id === id) label.title = name
				return label
			})
		)
	}

	return (
		<section className='label-picker'>
			<input
				type='text'
				className='search'
				placeholder='Search labels'
				value={srchPrm}
				onChange={ev => onSearchLabel(ev)}
			/>
			{info.boardLabels.length > 0 && (
				<section className='labels-list'>
					<thead>Labels</thead>
					<ul>
						{boardLabelsList.map(label => (
							<li key={label.id} className='label'>
								<Checkbox
									onClick={() => {
										onUpdateLabels(label.id)
									}}
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
									onClick={() => {
										onUpdateLabels(label.id)
									}}
									className='label'
									style={{ backgroundColor: label.color }}
								>
									{label.title}
								</div>
								<div
									onClick={ev => {
										onEditLabelName(label.id, label.title)
										setIsEditMode(true)
									}}
								>
									<EditCard />
								</div>
							</li>
						))}
					</ul>
				</section>
			)}
		</section>
	)
}
