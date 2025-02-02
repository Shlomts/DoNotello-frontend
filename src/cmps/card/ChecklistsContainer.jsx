import { Fragment, useEffect, useState } from 'react'
import { Checklist, ListActions } from '../SvgContainer'
import { Checkbox } from '@mui/material'
import { makeId } from '../../services/util.service'

export function ChecklistsContainer({ checklists, removeChecklist, onUpdate }) {
	const [isEditMode, setIsEditMode] = useState(true)
	const [currChecklist, setCurrChecklist] = useState(null)
	const [detailsInEdit, setDetailsInEdit] = useState('')

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

	function onDeleteChecklist(id) {
		if (confirm('Sure?')) removeChecklist(id)
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
									onClick={() =>
										onDeleteChecklist(checklist.id)
									}
									className='delete'
								>
									Delete
								</button>
							</h4>
							<div className='percent'>0%</div>
							<div className='bar'>-------------------</div>
							{console.log(checklist)}
							{checklist.tasks.length > 0 &&
								checklist.tasks.map(task => {
									<div>
										<Checkbox className='check' />
										<div className='details'>
											{task.details}
										</div>
									</div>
								})}

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
												console.log(currChecklist)
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
							{/* {checklist.tasks?.map(task => (
                                            <div className='task'>
                                                <Checkbox
                                                    // onClick={() => {
                                                    // 	onUpdateLabels(label.id)
                                                    // }}
                                                    // checked={label.isInCard}
                                                    inputProps={{
                                                        'aria-label': 'controlled',
                                                    }}
                                                    sx={{
                                                        color: '#738496',
                                                        // '&:hover': { bgcolor: 'red' },
                                                        '&.Mui-checked': {
                                                            color: '#579dff',
                                                        },
                                                    }}
                                                />
                                                <li>{task.details}</li>
                                                <button className='opts'>
                                                    <ListActions/>
                                                </button>
                                            </div>
                                        ))} */}
							{/* {isEditMode && label.id === labelInEdit.id ? (
                                    <input
                                        type='text'
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
                                )} */}
							{/* <div
                                    onClick={() => {
                                        setLabelInEdit(label)
                                        setIsEditMode(true)
                                    }}
                                >
                                    <EditCard />
                                </div> */}
						</li>
					))}
				</ul>
			) : (
				<div>HI!</div>
			)}

			{/* {isEditMode ? (
				<Fragment>
					<textarea
						className='grdatxt'
						value={desInEdit}
						onChange={onChangeDescription}
						placeholder='Add a more detailed description...'
						autoFocus
					/>
					<div className='desbtns'>
						<button className='save' onClick={onSaveDescription}>
							Save
						</button>
						<button
							className='cancel'
							onClick={() => {
								setIsEditMode(false)
								setDesInEdit(descriptionInput)
							}}
						>
							Cancel
						</button>
					</div>
				</Fragment>
			) : descriptionInput ? (
				<div
					className='des-input grdatxt'
					onClick={() => setIsEditMode(true)}
					dangerouslySetInnerHTML={{
						__html: descriptionInput.replace(/\n/g, '<br>'),
					}}
				></div>
			) : (
				<div
					className='no-des-plchldr grdatxt'
					onClick={() => setIsEditMode(true)}
				>
					Add a more detailed description...
				</div>
			)} */}
		</section>
	)
}
