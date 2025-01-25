import { Fragment, useEffect, useState, useRef } from 'react'
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

import { DynamicCmp } from '../cmps/card/opt-bar/DynamicCmp'
import { MemberPicker } from '../cmps/card/opt-bar/MemberPicker'

export function CardDetails() {
	const navigate = useNavigate()
	const params = useParams()

	const { boardId } = useParams()
	const { cardId } = useParams()

	const board = useSelector(storeState => storeState.boardModule.board)
	const [group, setGroup] = useState(null)
	const [card, setCard] = useState(null)

	const [descriptionInput, setDescriptionInput] = useState(
		card?.description || ''
	)
	const [isEditMode, setIsEditMode] = useState(false)
	const [desInEdit, setDesInEdit] = useState(descriptionInput)

	const [isShowModal, setIsShowModal] = useState(false)
	const [currDynamic, setCurrDynamic] = useState(null)
	const dataRef = useRef(null)

	const [boardMembers, setBoardMembers] = useState(board.members)
	const [cardMembers, setCardMembers] = useState(card?.memberIds || [])

	useEffect(() => {
		getCard()
	}, [params.cardId])

	useEffect(() => {
		setDescriptionInput(card?.description || '')
		setDesInEdit(card?.description || '')
		setCardMembers(card?.memberIds || [])
	}, [card])


	async function getCard() {
		try {
			const cardToSet = await loadCard(board, cardId)
			const groupToSet = await loadGroup(board, cardId)
			setCard(cardToSet)
			setGroup(groupToSet)
			// onSetMembers()
			console.log('card:', card)
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
		setCurrDynamic(null)
		dataRef.current = null
		setIsShowModal(false)
	}

	async function onUpdateDynamicInfo(data) {
		switch (currDynamic) {
			case MemberPicker:
				onSetMembers(data)
				break
			default:
				;<div>UNKNOWM</div>
				break
		}
	}

	function onSetMembers(id) {
		const updatedCardMembers = [...cardMembers]
		const index = updatedCardMembers.indexOf(id)

		if (index !== -1) {
			updatedCardMembers.splice(index, 1)
		} else {
			updatedCardMembers.push(id)
		}
		setCardMembers(updatedCardMembers)
		setCard(card => {
			card.memberIds = updatedCardMembers
			return card
		})
		updateCard(board, group, card)
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
		<section className='card-details-outlet'>
			{isShowModal && currDynamic && dataRef.current && (
				<DynamicCmp
					Cmp={currDynamic}
					title={dataRef.current.title}
					onCloseModal={onCloseModal}
					data={dataRef.current.data}
					onUpdateCmp={onUpdateDynamicInfo}
				/>
			)}

			<div open className='card-details'>
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
						in list &nbsp;
						<span className='group-title'>{group.title}</span>
					</div>
				</header>
				<section className='opt-bar'>
					<section className='opt'>
						<ul>
							<li
								className='opt-card'
								onClick={ev => {
									dataRef.current = {
										title: 'Members',
										data: {
											boardMembers: boardMembers,
											cardMembers: cardMembers,
										},
									}
									setCurrDynamic(
										prevDynamic =>
											(prevDynamic = MemberPicker)
									)
									setIsShowModal(true)
								}}
							>
								<Members />
								<div className='name'>Members</div>
							</li>
							<li className='opt-card'>
								<Labels />
								<div className='name'>Labels</div>
							</li>
							<li className='opt-card'>
								<Checklist />
								<div className='name'>Checklist</div>
							</li>
							<li className='opt-card'>
								<Dates />
								<div className='name'>Dates</div>
							</li>
							{/* <li className='opt-card'>
								<div>📎</div>
								<div>Attachment</div>
							</li>
							<li className='opt-card'>
								<div>📌</div>
								<div>Location</div>
							</li> */}
						</ul>
					</section>
					<section className='actions'>
						<thead>Actions</thead>
						<ul>
							<li className='opt-card' onClick={onRemoveCard}>
								<Close />
								<div className='name'>Delete</div>
							</li>
						</ul>
					</section>
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
						<Fragment>
							<textarea
								className='grdatxt'
								value={desInEdit}
								onChange={onChangeDescription}
								placeholder='Add a more detailed description...'
								autoFocus
							/>
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
					)}

					{/* {isEditMode && (
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
					)} */}
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
			</div>
		</section>
	)
}
