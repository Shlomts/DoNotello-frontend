import { useState, useEffect } from 'react'
import { EditCard } from '../../SvgContainer'
import { updateBoard } from '../../../store/actions/board.actions'

export function CoverPicker({ info, onUpdate }) {
	if (!info || !info.style) return

	const [selctedCover, setSelectedCover] = useState(info.style.backgroundColor || '')

	const coverColorOptions = [
		'#216e4e', '#7f5f01', '#a54800', '#ae2e24', '#5e4db2',
		'#0f55cc', '#206a83', '#4c6b1f', '#943d73', '#596773'
	]

	function onSelectCover(selectedColor) {
		console.log('selected color:', selectedColor)
		setSelectedCover(selectedColor)
		onUpdate({ backgroundColor: selectedColor })
	}

	function onRemoveCover(){
		setSelectedCover('')
		onUpdate({ backgroundColor: '' })
	}

	return (
		<section className='cover-picker'>
			{selctedCover && (
				<span
					onClick={onRemoveCover}>
					Remove Cover
				</span>
			)}
			<thead>Colors</thead>
			<ul className='list'>
				{coverColorOptions.map((coverColor, idx) => (
					<li
						key={idx}
						className={`cover-color ${selctedCover === coverColor ? 'selected' : ''}`}
						onClick={() => onSelectCover(coverColor)}
						style={{ backgroundColor: coverColor }}
					>
					</li>
				))}
			</ul>
		</section>
	)
}
