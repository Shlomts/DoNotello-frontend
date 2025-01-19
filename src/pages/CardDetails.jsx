import { Fragment, useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { useParams } from 'react-router'
import { useSelector } from 'react-redux'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service'

import {
	loadCard,
	getGroupId,
	removeCardFromGroup,
	loadGroup,
	updateCard,
} from '../store/actions/board.actions'
import {
	Card,
	Description,
	Members,
	Labels,
	Checklist,
	Dates,
	Close,
	Delete,
} from '../cmps/SvgContainer'

export function CardDetails() {
	const navigate = useNavigate()
	const params = useParams()

	const { boardId } = useParams()
	const { cardId } = useParams()

	const board = useSelector(storeState => storeState.boardModule.board)
	const [group, setGroup] = useState(null)
	const [card, setCard] = useState(null)

	const [isShowModal, setIsShowModal] = useState(false)
	const [boardMembers, setBoardMembers] = useState(board.members)
	const [cardMembers, setCardMembers] = useState(null)

	const [descriptionInput, setDescriptionInput] = useState(
		card?.description || ''
	)
	const [isEditMode, setIsEditMode] = useState(false)
	const [desInEdit, setDesInEdit] = useState(descriptionInput)

	useEffect(() => {
		getCard()
	}, [params.cardId])

	useEffect(() => {
		setDescriptionInput(card?.description || '')
		setDesInEdit(card?.description || '')
	}, [card])

	async function getCard() {
		try {
			const cardToSet = await loadCard(board, cardId)
			const groupToSet = await loadGroup(board, cardId)
			setCard(cardToSet)
			setGroup(groupToSet)
			// onSetMembers()
		} catch (err) {
			console.log('Having problmes loading card...', err)
			throw err
		}
	}

	async function onRemoveCard() {
		const groupId = await getGroupId(board, cardId)

		try {
			await removeCardFromGroup(board, groupId, cardId)
			navigate(`/board/${boardId}`)
			showSuccessMsg('Card removed')
		} catch (err) {
			showErrorMsg('Cannot remove card')
		}
	}

	function onCloseModal() {
		setIsShowModal(false)
	}

	function onSetMembers() {
		console.log('boardMembers', boardMembers)
	}

	// function handleInput() {
	// 	const editTextarea = textareaRef.current
	// 	if (editTextarea) {
	// 		editTextarea.style.height = 'auto'
	// 		editTextarea.style.height = `${textarea.scrollHeight}px`
	// 	}
	// }

	function onChangeDescription(ev) {
		setDesInEdit(ev.target.value)
	}

	function onSaveDescription() {
		setDescriptionInput(desInEdit)
		setCard(card => {
			card.description = desInEdit
			return card
		})
		updateCard(board, group, card)
		setIsEditMode(false)
	}

	if (!card) return <div>Loading...</div>

	return (
		<Fragment>
			<div className='backdrop'> </div>
			{isShowModal && (
				<div className='dynamic'>
					<DynamicCmp
						cmp={{
							type: 'MemberPicker',
							info: {
								title: 'Members',
								boardMembers: boardMembers,
							},
						}}
						onCloseModal={onCloseModal}
					/>
				</div>
			)}

			<dialog open className='card-details'>
				<button
					className='close'
					onClick={ev => {
						ev.preventDefault
						navigate(`/board/${boardId}`)
					}}
				>
					<Close />
				</button>
				<div className='header icon'>
					<Card />
				</div>
				<header className='header'>
					<h3> {card.title}</h3>
					<div>
						in list <span className='group-title'>{group.title}</span>
					</div>
				</header>
				<section className='opt-bar'>
					<ul>
						{/* <li className="opt-card">
                            <div>➕</div>
                            <div>Join</div>
                        </li> */}
						<li className='opt-card'>
							<div className='icon'>
								<Members />
							</div>
							<div
								className='name'
								onClick={ev => {
									setIsShowModal(true)
									onSetMembers
								}}
							>
								Members
							</div>
						</li>
						<li className='opt-card'>
							<div className='icon'>
								<Labels />
							</div>
							<div className='name'>Labels</div>
						</li>
						<li className='opt-card'>
							<div className='icon'>
								<Checklist />
							</div>
							<div className='name'>Checklist</div>
						</li>
						<li className='opt-card'>
							<div className='icon'>
								<Dates />
							</div>
							<div className='name'>Dates</div>
						</li>
						<li className='opt-card'>
							<div>📎</div>
							<div>Attachment</div>
						</li>
						<li className='opt-card'>
							<div>📌</div>
							<div>Location</div>
						</li>
					</ul>
				</section>

				<section className='actions'>
					<thead>Actions</thead>
					<ul>
						<li className='opt-card' onClick={onRemoveCard}>
							<div className='icon'>
								<Close />
								{/* <Delete /> */}
							</div>
							<div className='name'>Delete</div>
						</li>
					</ul>
				</section>

				<div className='user-opt'>
					{/* <section className="notifications">
                        Notifications
                        <div className="notifications">
                            <form>
                                <label>
                                    <input
                                        type="checkbox"
                                        name="isWatch"
                                        value="false"
                                    />
                                    Watch{" "}
                                </label>
                            </form>
                            <span className="btn icon">👁️</span>
                            <span className="btn txt">Watch</span>
                        </div>
                    </section> */}
					<section>
						Members
						<div className='members'>
							<span className='btn avatar'>😁</span>
							<span className='btn txt'>+</span>
						</div>
					</section>
					{/* <section className="labels">
                        <h4>Labels</h4>

                        <div className="labels">
                            <span className="btn avatar">label</span>
                            <span className="btn txt">+</span>
                        </div>
                    </section> */}
				</div>

				<section className='description'>
					<div className='description icon'>
						<Description />
					</div>
					<h4 className='title'>
						Description
						{descriptionInput && !isEditMode && (
							<button
								onClick={() => setIsEditMode(true)}
								className='edit-des'
							>
								Edit
							</button>
						)}
					</h4>
					{isEditMode ? (
						<textarea
							className='grdatxt'
							value={desInEdit}
							onChange={onChangeDescription}
							placeholder='Add a more detailed description...'
							autoFocus
						/>
					) : descriptionInput ? (
						<div
							className='des-input grdatxt'
							onClick={() => setIsEditMode(true)}
                            dangerouslySetInnerHTML={{
                                __html: descriptionInput.replace(/\n/g, '<br>'),
                              }}
						>
						</div>
					) : (
						<div
							className='no-des-plchldr grdatxt'
							onClick={() => setIsEditMode(true)}
						>
							Add a more detailed description...
						</div>
					)}

					{isEditMode && (
						<div className='desbtns'>
							<button
								className='save'
								onClick={onSaveDescription}
							>
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
					)}

					{/* <button onClick={onAddDescription}>Cancel</button> */}
				</section>

				{/* <div className="activity icon">📰</div>
                <section className="activity">
                    <h4 className="title">Activity</h4>
                </section>

                <span className="user avatar">😂</span>
                <div className="input">
                    <textarea
                        type="text"
                        placeholder="Write a comment..."
                    ></textarea>
                    <button>Save</button>
                </div>
                <span className="avatar">😢</span>
                <div className="comments">NOOOOOO</div> */}
			</dialog>
		</Fragment>
	)
}

function DynamicCmp({ cmp, onCloseModal }) {
	switch (cmp.type) {
		case 'MemberPicker':
			return (
				<MemberPicker
					info={cmp.info}
					onCloseModal={onCloseModal}
					// onUpdate={(data) => {
					//     updateCmpInfo(
					//         cmp,
					//         "selectedMemberIds",
					//         data,
					//         `Changed members`
					//     )
					// }}
				/>
			)

		// case "StatusPicker":
		//     return (
		//         <StatusPicker
		//             info={cmp.info}
		//             onUpdate={(data) => {
		//                 updateCmpInfo(
		//                     cmp,
		//                     "selectedStatus",
		//                     data,
		//                     `Changed Status to ${data}`
		//                 )
		//             }}
		//         />
		//     )
		// case "DatePicker":
		//     return (
		//         <DatePicker
		//             info={cmp.info}
		//             onUpdate={(data) => {
		//                 updateCmpInfo(
		//                     cmp,
		//                     "selectedDate",
		//                     data,
		//                     `Changed due date to ${data}`
		//                 )
		//             }}
		//         />
		//     )

		default:
			return <p>UNKNOWN {cmp.type}</p>
	}
}

// async function updateCmpInfo(cmp, cmpInfoPropName, data, activityTitle) {
//     const taskPropName = cmp.info.propName
//     console.log(`Updating: ${taskPropName} to: `, data)
//     // Update cmps in local state
//     const updatedCmp = structuredClone(cmp)
//     updatedCmp.info[cmpInfoPropName] = data
//     setCmps(cmps.map(currCmp => (currCmp.info.propName !== cmp.info.propName ) ? currCmp : updatedCmp))
//     // Update the task
//     const updatedTask = structuredClone(task)
//     updatedTask[taskPropName] = data
//     try {
//     await updateTask(boardId, groupId, updatedTask, activityTitle)
//     showSuccessMsg(`Task updated`)
//     } catch (err) {
//     showErrorMsg('Cannot update task')
//     }
//     }

function MemberPicker({ info, onCloseModal, onAddCardMember, onUpdate }) {
	console.log('ingo', info)

	return (
		<Fragment>
			<h4>{info.title}</h4>

			<button className='icon' onClick={onCloseModal}>
				<Close />
			</button>

			{/* <section className="card-members">
                <thead>Card members</thead>
                <ul>
                    <li className="member" onClick={onAddCardMember}>
                        <div className="icon">
                            <Close />
                        </div>
                        <div className="name">Delete</div>
                    </li>
                </ul>
            </section> */}
			<section className='board-members'>
				<thead>Board members</thead>
				<ul>
					{info.boardMembers.map(member => (
						<li key={member.id} className='members-list'>
							<img
								src={member.imgUrl}
								alt={member.fullname}
								title={member.fullname}
								className='card-member-img'
							/>
							<div>{member.fullname}</div>
							<div>
								<Close />
							</div>
						</li>
					))}
					{/* <li className="opt-card" onClick={onRemoveCard}>
                        <div className="icon">
                            <Close />
                        </div>
                        <div className="name">Delete</div>
                    </li> */}
				</ul>
			</section>
		</Fragment>
	)
}
