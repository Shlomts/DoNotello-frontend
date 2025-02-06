import { Fragment, useEffect, useState } from 'react'
import { Checklist, ListActions } from '../svgContainer'
import { Checkbox } from '@mui/material'
import { makeId } from '../../services/util.service'

export function ChecklistsContainer({ checklists, removeChecklist, onUpdate }) {
	// const [checklistsInContainer, setChecklistsInContainer] = useState(checklists)
	const [isEditMode, setIsEditMode] = useState(true)
	const [currChecklist, setCurrChecklist] = useState(null)
	const [detailsInEdit, setDetailsInEdit] = useState('')

	console.log('checklists', checklists)
	console.log(JSON.stringify(checklists))
	// useEffect(() => {
	// 	setChecklistsInContainer(checklists)
	// }, [srchPrm, cardMembers])

	function onEditDetails(ev) {
		const todo = ev.target.value
		// if(!currChecklist) setCurrChecklist()
		setDetailsInEdit(todo)
	}

	function onSaveDetails() {
		if(!detailsInEdit) return
		const newTask = { id: makeId(), details: detailsInEdit, isDone: false }
		const newTasks = [...currChecklist.tasks, newTask]
		setCurrChecklist(prev => (prev.tasks = newTasks))

		onUpdate(currChecklist)
		setDetailsInEdit('')
	}

	function onKeyDown(ev) {
		if (ev.key === 'Enter') {
			onSaveDetails()
		}
	}

	return (
		<section className='checklists-container'>
			{checklists.length > 0 ? (
				<ul>
					{checklists.map(checklist => (
						<li key={checklist.id} className='checklist'>
							<Checklist />
							<h4 className='title'>
								{checklist.title}
								<button
									onClick={() => {
										if (confirm('Sure?'))
											removeChecklist(checklist.id)
									}}
									className='delete'
								>
									Delete
								</button>
							</h4>
							<div className='percent'>0%</div>
							<div className='bar'>-------------------</div>
							{checklist.tasks.length > 0 &&
								checklist.tasks.map(task => (
									<div className='task' key={task.id}>
										<Checkbox className='check' />
										<div className='details'>
											{task.details}
										</div>
									</div>
								))}

							{isEditMode &&
								checklist.id === currChecklist?.id && (
									<div className='details'>
										<input
											type='text'
											value={detailsInEdit}
											onChange={ev => {
												setCurrChecklist(
													prev => (prev = checklist)
												)
												onEditDetails(ev)
											}}
											onKeyDown={onKeyDown}
											autoFocus
										/>
										<button onClick={onSaveDetails}>
											Save
										</button>
										<button>Cancel</button>
									</div>
								)}
							<button
								onClick={() => {
									setCurrChecklist(checklist)
									setIsEditMode(true)
								}}
								className='add'
							>
								Add an item
							</button>
						</li>
					))}
				</ul>
			) : (
				<div>HI!</div>
			)}
		</section>
	)
}
