import { Fragment, useEffect, useState } from 'react'
import { Checklist, ListActions } from '../SvgContainer'
import { Checkbox } from '@mui/material'

export function ChecklistsContainer({ checklists, removeChecklist }) {

    function onDeleteChecklist(id) {
        if( confirm('Sure?')) removeChecklist(id)
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
									onClick={() => onDeleteChecklist(checklist.id)}
									className='delete'
								>
									Delete
								</button>
							</h4>

							<div className='percent'>0%</div>
							<div className='bar'>-------------------</div>

							{/* <input
								type='text'
								// onChange={onEditLabelTitle}
								// onBlur={onSaveLabelTitle}
								// onKeyDown={onKeyDown}
								autoFocus
							/> */}

							{checklist.tasks &&
								checklist.tasks.map(task => {
									<Fragment>
										<Checkbox className='check' />
										<div className='details'>
											{task.details}
										</div>
									</Fragment>
								})}

							<button
								// onClick={() => setIsEditMode(true)}
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

	// if (!cards || cards.length === 0) return null

	// function getStyle(style, snapshot) {
	//     if (snapshot.isDragging) {
	//         return {
	//             ...style,
	//             transform: `${style?.transform || ""} rotate(5deg)`,
	//             transition: "transform 0.2 ease",
	//             // zIndex: 10,
	//         }
	//     }

	//     if (snapshot.isDropAnimating) {
	//         const { moveTo, curve, duration } = snapshot.dropAnimation
	//         const translate = `translate(${moveTo.x}px, ${moveTo.y}px)`

	//         return {
	//             ...style,
	//             transform: translate,
	//             transition: `all ${curve} ${duration}s`,
	//         };
	//     }

	//     return style
	// }

	// return (
	//     <Droppable droppableId={group.id} direction='vertical' type='card'>
	//         {(provided, snapshot) => (
	//             <ul className=
	//                 {`card-list ${snapshot.isDraggingOver ? "dragging-over" : ""}`}
	//                 {...provided.droppableProps}
	//                 ref={provided.innerRef}>
	//                 {cards.map((card, index) => (
	//                     <Draggable key={card.id} draggableId={card.id} index={index} type='card'>
	//                         {(provided, snapshot) => (
	//                             <li
	//                                 ref={provided.innerRef}
	//                                 {...provided.draggableProps}
	//                                 {...provided.dragHandleProps}
	//                                 style={getStyle(provided.draggableProps.style, snapshot)}
	//                                 className={`draggable-container ${snapshot.isDragging ? "isDragging" : ""}`}
	//                             >
	//                                 <CardPreview
	//                                     card={card}
	//                                     cardMembers={board.members.filter(member => card.memberIds.includes(member._id))}
	//                                     cardLabels={board.labels.filter(label => card.labelIds.includes(label.id))}
	//                                 />
	//                             </li>
	//                         )}
	//                     </Draggable>
	//                 ))}
	//                 {provided.placeholder}
	//             </ul>
	//         )}
	//     </Droppable>
	// )
}
