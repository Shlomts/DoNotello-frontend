import { useEffect, useState } from 'react'
import { Checklist, ListActions } from '../SvgContainer'
import { Checkbox } from '@mui/material'

export function ChecklistsContainer({checklists, card }) {
	const [cardChecklists, setCardChecklists] = useState(checklists || [])
	const [percent, setPercent] = useState(0)

    console.log(checklists, 'checklists')
    console.log(cardChecklists, 'cardChecklists')

    const a = cardChecklists.length
    console.log('a', a)

	useEffect(() => {
		setCardChecklists(checklists || [])
	}, [])


	return (
		<section className='checklists-container'>
			{cardChecklists.length > 0 ? (
				<ul>
					{cardChecklists.map(checklist => (
						<li key={checklist.id} className='checklist'>
							<div className='checklist icon'>
								<Checklist />
							</div>

							<h4 className='title'>{checklist.title}</h4>

							<button
							// onClick={() => setIsEditMode(true)}
							// className='edit-des'
							>
								Delete
							</button>

							<div className='percent'>{percent}%</div>
							<div className='bar'>-------------------</div>

							<section className='tasks'>
								<ul>
									<li>task</li>
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
								</ul>
							</section>

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
