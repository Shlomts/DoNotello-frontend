import { Fragment, useEffect, useState } from 'react'
import { Checklist, ListActions } from '../SvgContainer'
import { Checkbox } from '@mui/material'
import { makeId } from '../../services/util.service'

export function ChecklistsContainer({ checklists, removeChecklist, onUpdate }) {
	const [isEditMode, setIsEditMode] = useState(false)
	const [currChecklist, setCurrChecklist] = useState(null)
	const [detailsInEdit, setDetailsInEdit] = useState('')

	// console.log('checklists', checklists)
	// console.log(JSON.stringify(checklists))
	// useEffect(() => {
	// 	setChecklistsInContainer(checklists)
	// }, [srchPrm, cardMembers])

	// useEffect(() => {
	// 	if(checklists.length <= 1 ) setIsEditMode(true)
	// }, [])

	function onEditDetails(ev) {
		const todo = ev.target.value
		// if(!currChecklist) setCurrChecklist()
		setDetailsInEdit(todo)
	}

	function onSaveDetails() {
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

	function onToggleIsDone(task) {
		if (!task) return

		const oldList = [...currChecklist.tasks]
		const newList = oldList.map(tsk =>
			tsk.id === task.id ? { ...tsk, isDone: !tsk.isDone } : tsk
		)

		const newChecklist = { ...currChecklist, tasks: newList }

		setCurrChecklist(prev => (prev = newChecklist))
		onUpdate(currChecklist)
	}

	function checkIsDone(task) {
		return task.isDone ? 'details done' : 'details'
	}

	return (
		<section className='checklists-container'>
			{checklists.length > 0 ? (
				<ul>
					{checklists.map(checklist => (
						<li
							key={checklist.id}
							className='checklist'
							// onClick={() => setCurrChecklist(checklist)}
						>
							<div className='svg'>
								<Checklist />
							</div>

							<h4 className='title'>
								{checklist.title}
								<button
									onClick={() => {
										if (confirm('Sure?'))
											removeChecklist(checklist.id)
									}}
									className='delete btn'
								>
									Delete
								</button>
							</h4>
							<div className='percent'>0%</div>
							<div className='bar'>-------------------</div>
							{checklist.tasks.length > 0 &&
								checklist.tasks.map(task => (
									<div className='task' key={task.id}>
										<Checkbox
											onClick={() => {
												setCurrChecklist(
													prev => (prev = checklist)
												)
												onToggleIsDone(task)
											}}
											checked={task.isDone}
											sx={{
												color: '#738496',
												width: '14px',
												height: '14px',
												alignSelf: 'center',
												'&.Mui-checked': {
													color: '#579dff',
												},
											}}
										/>
										<div className={checkIsDone(task)}>
											{task.details}
										</div>
									</div>
								))}

							{isEditMode &&
								checklist.id === currChecklist?.id && (
									<div className='details'>
										<textarea
											value={detailsInEdit}
											onChange={ev => {
												setCurrChecklist(
													prev => (prev = checklist)
												)
												onEditDetails(ev)
											}}
											onKeyDown={onKeyDown}
											placeholder='Add an item'
											autoFocus
										/>
										<div className='detbtns'>
											<button
												className='save'
												onClick={onSaveDetails}
											>
												Add
											</button>
											<button
												className='cancel'
												onClick={() => {
													setIsEditMode(false)
													setDetailsInEdit('')
													setCurrChecklist(null)
												}}
											>
												Cancel
											</button>
										</div>
									</div>
								)}
							<button
								onClick={() => {
									setCurrChecklist(checklist)
									setIsEditMode(true)
								}}
								className='add btn'
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
