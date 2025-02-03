import { useRef, useState, useEffect } from 'react'
import { EditCard, Labels } from '../../SvgContainer'
import Checkbox from '@mui/material/Checkbox'
import { blue, blueGrey, lightBlue } from '@mui/material/colors'
import { light } from '@mui/material/styles/createPalette'

export function LabelPicker({ info, onUpdate }) {
	if (!info || !info.boardLabels) return

	const [boardLabelsList, setBoardLabelsList] = useState(addIsInCard())
	const [srchPrm, setSrchPrm] = useState('')

	const [isEditMode, setIsEditMode] = useState(false)
	const [labelInEdit, setLabelInEdit] = useState(null)

	useEffect(() => {
		setBoardLabelsList(
			addIsInCard().filter(label =>
				label.title.toUpperCase().includes(srchPrm.toUpperCase())
			)
		)
	}, [srchPrm, info.cardLabels])


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

	function onUpdateLabels(idToEdit) {
		setBoardLabelsList(prevLabels =>
			prevLabels.map(label =>
				label.id === idToEdit ? { ...label, isInCard: !label.isInCard } : label
			)
		)
		onUpdate({ id: idToEdit, isRename: false })
	}

	function onEditLabelTitle(ev) {
		const name = ev.target.value
		const newLabel = { ...labelInEdit, title: name }
		setLabelInEdit(newLabel)
	}

	function onSaveLabelTitle() {
		setBoardLabelsList(prevLabels =>
			prevLabels.map(label => {
				if (label.id === labelInEdit.id) label.title = labelInEdit.title
				return label
			})
		)

		onUpdate({
			id: labelInEdit.id,
			isRename: true,
			name: labelInEdit.title,
		})
		setLabelInEdit(null)
		setIsEditMode(false)
	}

	function onKeyDown(ev) {
		if (ev.key === 'Enter') {
			onSaveLabelTitle()
		}
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
									inputProps={{ 'aria-label': 'controlled' }}
									sx={{
										color: '#738496',
										// '&:hover': { bgcolor: 'red' },
										'&.Mui-checked': {
											color: '#579dff',
										},
									}}
								/>
								{isEditMode && label.id === labelInEdit.id ? (
									<input
										type='text'
										className='name-input'
										value={labelInEdit.title}
										onChange={onEditLabelTitle}
										// onBlur={onSaveLabelTitle}
										onKeyDown={onKeyDown}
										autoFocus
									/>
								) : (
									<div
										onClick={() => {
											onUpdateLabels(label.id)
										}}
										className='label'
										style={{ backgroundColor: label.color }}
									>
										{label.title}
									</div>
								)}

								<div
									onClick={() => {
										setLabelInEdit(label)
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
