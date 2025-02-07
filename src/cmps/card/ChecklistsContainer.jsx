import { useState } from 'react'
import { Checklist } from '../SvgContainer'
import { Checkbox } from '@mui/material'
import { makeId } from '../../services/util.service'

export function ChecklistsContainer({ checklists, removeChecklist, onUpdate }) {
	const [isEditMode, setIsEditMode] = useState(false)
	const [currChecklist, setCurrChecklist] = useState(null)
	const [detailsInEdit, setDetailsInEdit] = useState('')

	function onEditDetails(ev) {
		const todo = ev.target.value
		setDetailsInEdit(todo)
	}

	function onSaveDetails() {
		const newTask = { id: makeId(), details: detailsInEdit, isDone: false }
		const newTasks = [...currChecklist.tasks, newTask]

		setCurrChecklist(prev => {
			const updatedChecklist = { ...prev, tasks: newTasks }
			return updatedChecklist
		})

		onUpdate({ ...currChecklist, tasks: newTasks })
		setDetailsInEdit('')
	}

	function onKeyDown(ev) {
		if (ev.key === 'Enter') {
			onSaveDetails()
		}
	}

	function onToggleIsDone(task, checklist) {
		if (!checklist || !task) return

		const newList = checklist.tasks.map(tsk =>
			tsk.id === task.id ? { ...tsk, isDone: !tsk.isDone } : tsk
		)

		const newChecklist = { ...checklist, tasks: newList }

		setCurrChecklist(newChecklist)
		onUpdate(newChecklist)
	}

	function checkIsDone(task) {
		return task.isDone ? 'details done' : 'details'
	}

	function calcPercent(tasks) {
		if (!tasks || tasks.length === 0) return 0

		const progressPercentage =
			(tasks.filter(tsk => tsk.isDone).length / tasks.length) * 100

		return Math.round(progressPercentage)
	}

	return (
		<section className='checklists-container'>
			{checklists.length > 0 ? (
				<ul>
					{checklists.map(checklist => (
						<li key={checklist.id} className='checklist'>
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

							<div className='percent'>
								{calcPercent(checklist.tasks)}%
							</div>
							<div className='progress-bar-container'>
								<div
									className='progress-bar'
									style={{
										width: `${calcPercent(
											checklist.tasks
										)}%`,
									}}
								></div>
							</div>

							{checklist.tasks.length > 0 &&
								checklist.tasks.map(task => (
									<div className='task' key={task.id}>
										<Checkbox
											onClick={() => {
												onToggleIsDone(task, checklist)
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
							{!isEditMode && (
								<button
									onClick={() => {
										setCurrChecklist(checklist)
										setIsEditMode(true)
									}}
									className='add btn'
								>
									Add an item
								</button>
							)}
						</li>
					))}
				</ul>
			) : (
				<div>HI!</div>
			)}
		</section>
	)
}
