import { Fragment, useEffect, useState, useRef } from 'react'
import { useNavigate, useParams } from 'react-router'
import { useSelector } from 'react-redux'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service'
import { getPopupPosition, makeId } from '../services/util.service'

import {
	loadCard,
	getGroupId,
	removeCardFromGroup,
	loadGroup,
	updateCard,
	updateBoard,
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
	Plus,
	Cover,
	Move,
	Copy,
	Boards,
} from '../cmps/SvgContainer'

import { DynamicCmp } from '../cmps/card/opt-bar/DynamicCmp'
import { MemberPicker } from '../cmps/card/opt-bar/MemberPicker'
import { LabelPicker } from '../cmps/card/opt-bar/LabelPicker'
import { AddChecklist } from '../cmps/card/opt-bar/AddChecklist'
import { MoveCard } from '../cmps/card/opt-bar/MoveCard'

import { CardMembers } from '../cmps/group/miniCmps/CardMembers'
import { CardLabels } from '../cmps/group/miniCmps/CardLabels'

import { ChecklistsContainer } from '../cmps/card/ChecklistsContainer'
import { DatesPicker } from '../cmps/card/opt-bar/DatesPicker'
import { CardDates } from '../cmps/card/CardDates'
import { CoverPicker } from '../cmps/card/opt-bar/CoverPicker'

export function CardDetails() {
	const navigate = useNavigate()
	const params = useParams()

	const { boardId } = useParams()
	const { cardId } = useParams()

	const board = useSelector(storeState => storeState.boardModule.board)
	const [group, setGroup] = useState(null)
	const [card, setCard] = useState(null)

	const [cardTitle, setCardTitle] = useState(card?.title || '')
	const [isEditCardTitle, setIsEditCardTitle] = useState(false)

	const [descriptionInput, setDescriptionInput] = useState(
		card?.description || ''
	)
	const [isEditMode, setIsEditMode] = useState(false)
	const [desInEdit, setDesInEdit] = useState(descriptionInput)
	const txtareaRef = useRef(null)

	const [isShowModal, setIsShowModal] = useState(false)
	const [currDynamic, setCurrDynamic] = useState(null)
	const dataRef = useRef(null)

	const [boardMembers, setBoardMembers] = useState(board.members)
	const [cardMembers, setCardMembers] = useState(card?.memberIds || [])
	const [cardLabels, setCardLabels] = useState(card?.labelIds || [])
	const [cardChecklists, setCardChecklists] = useState(card?.checklists || [])
	const [cardDates, setCardDates] = useState(card?.dates || {})
	const [cardCover, setCardCover] = useState(card?.style || {})
	const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 })

	useEffect(() => {
		getCard()
	}, [params.cardId])

	useEffect(() => {
		handleResize()
	}, [desInEdit])

	useEffect(() => {
		console.log('IN USE EFFECTTTTTTTTTT')
		console.log('group:', group)
		console.log('card:', card)
		setDescriptionInput(card?.description || '')
		setDesInEdit(card?.description || '')
		setCardTitle(card?.title || '')
		setCardMembers(card?.memberIds || [])
		setCardLabels(card?.labelIds || [])
		setCardChecklists(card?.checklists || [])
		setCardDates(card?.dates || {})
		setCardCover(card?.style || {})
	}, [card])

	async function getCard() {
		try {
			const cardToSet = await loadCard(board, cardId)
			const groupToSet = await loadGroup(board, cardId)
			setCard(cardToSet)
			setGroup(groupToSet)
		} catch (err) {
			console.log('Having problmes loading card...', err)
			throw err
		}
	}

	async function onRemoveCard() {
		if (!confirm('Sure?')) return

		const groupId = await getGroupId(board, cardId)

		try {
			await removeCardFromGroup(board, groupId, cardId)
			navigate(`/board/${boardId}`)
			showSuccessMsg('Card removed')
		} catch (err) {
			showErrorMsg('Cannot remove card')
		}
	}

	function onSaveCardTitle(name) {
		if (name === '' || name === undefined) return

		setCard(card => {
			card.title = name
			updateCard(board, group, card)
			return card
		})

		setIsEditCardTitle(false)
	}

	function onKeyDown(ev) {
		if (ev.key === 'Enter') {
			onSaveCardTitle(ev.target.value)
		}
	}

	function onChangeDescription(ev) {
		setDesInEdit(ev.target.value)
	}

	function onSaveDescription() {
		setDescriptionInput(desInEdit)
		setCard(card => {
			card.description = desInEdit
			updateCard(board, group, card)
			return card
		})
		setIsEditMode(false)
	}

	function handleResize() {
		const txtarea = txtareaRef.current

		if (txtarea) {
			txtarea.style.height = 'auto'
			txtarea.style.height = `${txtarea.scrollHeight}px`
		}
	}

	function onCloseModal() {
		setCurrDynamic(null)
		dataRef.current = null
		setIsShowModal(false)
	}

	function onUpdateDynamicInfo(data) {
		switch (currDynamic) {
			case MemberPicker:
				onSetMembers(data)
				break
			case LabelPicker:
				onSetLabels(data)
				break
			case AddChecklist:
				onAddChecklist(data)
				break
			case DatesPicker:
				onSetDates(data)
				break
			case CoverPicker:
				onSetCover(data)
				break
			case MoveCard:
				onMoveCard(data)
				break
			default:
				throw new Error('No current dynamic cmp')
		}
	}

	function onSetMembers(memberId) {
		if (!card) return

		const updatedCardMembers = card?.memberIds?.includes(memberId)
			? card.memberIds.filter(id => id !== memberId)
			: [...(card.memberIds || []), memberId]

		setCardMembers(updatedCardMembers)

		setCard(prevCard => {
			const updatedCard = { ...prevCard, memberIds: updatedCardMembers }
			updateCard(board, group, updatedCard)
			return updatedCard
		})
	}

	function onSetLabels(data) {
		if (!data || !data.id) return
		const { id, isRename, name } = data

		if (isRename) {
			const updatedLabels = board.labels.map(label =>
				label.id === id ? { ...label, title: name } : label
			)
			const newBoard = { ...board, labels: updatedLabels }
			updateBoard(newBoard)
		} else {
			setCardLabels(prevLabels => {
				const updatedLabels = prevLabels.includes(id)
					? prevLabels.filter(labelId => labelId !== id)
					: [...prevLabels, id]

				setCard(prevCard => {
					const updatedCard = { ...prevCard, labelIds: updatedLabels }
					updateCard(board, group, updatedCard)
					return updatedCard
				})

				return updatedLabels
			})
		}
	}

	function onAddChecklist(data) {
		const newChecklist = { id: makeId(), title: data, tasks: [] }
		const updatedChecklists = [...cardChecklists, newChecklist]
		setCard(prevCard => {
			const updatedCard = {
				...prevCard,
				checklists: updatedChecklists,
			}
			updateCard(board, group, updatedCard)
			return updatedCard
		})
		setCardChecklists(updatedChecklists)
		onCloseModal()
	}

	function onEditChecklist(newChecklist) {
		const editList = cardChecklists.filter(
			checklist => checklist.id !== newChecklist.id
		)
		const updatedChecklists = [...editList, newChecklist]

		setCard(prevCard => {
			const updatedCard = {
				...prevCard,
				checklists: updatedChecklists,
			}
			updateCard(board, group, updatedCard)
			return updatedCard
		})
		setCardChecklists(updatedChecklists)
	}

	function removeChecklist(id) {
		const newChecklists = cardChecklists.filter(
			checklist => checklist.id !== id
		)
		setCard(prevCard => {
			const updatedCard = {
				...prevCard,
				checklists: newChecklists,
			}
			updateCard(board, group, updatedCard)
			return updatedCard
		})
		setCardChecklists(newChecklists)
	}

	function onSetCover(newStyle) {
		const updatedCardCover = newStyle.backgroundColor
			? { ...card.style, backgroundColor: newStyle.backgroundColor }
			: {}

		setCard(prevCard => {
			const updatedCard = {
				...prevCard,
				style: updatedCardCover,
			}
			updateCard(board, group, updatedCard)
			return updatedCard
		})
		setCardCover(updatedCardCover)
		setIsShowModal(false)
	}

	function onSetDates(newDates) {
		const updatedDates = { ...cardDates, ...newDates }

		setCard(prevCard => {
			const updatedCard = {
				...prevCard,
				dates: updatedDates,
				isDone: false,
			}
			updateCard(board, group, updatedCard)
			return card
		})
		setCardDates(updatedDates)
	}

	function onCardDateDone() {
		console.log(cardDates)
		setCard(prevCard => {
			const updatedCard = {
				...prevCard,
				isDone: !prevCard.isDone,
			}
			updateCard(board, group, updatedCard)
			return card
		})
	}

	function onMoveCard(data) {
		console.log('im in onMoveCard!! ')
		console.log('data:', data)
	}

	if (!card) return <div>Loading...</div>

	return (
		<section className='card-details-outlet'>
			{isShowModal && currDynamic && dataRef.current && (
				<div
					style={{
						position: 'absolute',
						top: popupPosition.top,
						left: popupPosition.left,
						zIndex: 1000
					}}
				>
					<DynamicCmp
						Cmp={currDynamic}
						title={dataRef.current.title}
						onCloseModal={onCloseModal}
						data={dataRef.current.data}
						onUpdateCmp={onUpdateDynamicInfo}
					/>
				</div>
			)}

			{card.style?.backgroundColor && (
				<div
					className='card-cover'
					style={{
						backgroundColor: card.style.backgroundColor,
					}}
				>
					<div className='cover-button'>
						<Cover />
						<span>Cover</span>
					</div>
				</div>
			)}

			<div
				open
				className='card-details'
				style={
					card.style?.backgroundColor
						? { marginBlockStart: '152px' }
						: { marginBlockStart: '48px' }
				}
			>
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
					{isEditCardTitle ? (
						<input
							type='text'
							value={cardTitle}
							onChange={ev => setCardTitle(ev.target.value)}
							onBlur={ev => onSaveCardTitle(ev.target.value)}
							onKeyDown={onKeyDown}
							autoFocus
						/>
					) : (
						<h3 onClick={() => setIsEditCardTitle(true)}>
							{card.title}
						</h3>
					)}
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
									const pos = getPopupPosition(ev.currentTarget, 305, 512)
									setPopupPosition(pos)
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
							<li
								className='opt-card'
								onClick={(ev) => {
									const pos = getPopupPosition(ev.currentTarget, 305, 512)
									setPopupPosition(pos)
									dataRef.current = {
										title: 'Labels',
										data: {
											boardLabels: board.labels,
											cardLabels: card.labelIds,
										},
									}
									setCurrDynamic(
										prevDynamic =>
											(prevDynamic = LabelPicker)
									)
									setIsShowModal(true)
								}}
							>
								<Labels />
								<div className='name'>Labels</div>
							</li>
							<li
								className='opt-card'
								onClick={(ev) => {
									const pos = getPopupPosition(ev.currentTarget, 305, 512)
									setPopupPosition(pos)
									dataRef.current = {
										title: 'Add checklist',
										data: {
											checklists: cardChecklists,
										},
									}
									setCurrDynamic(
										prevDynamic =>
											(prevDynamic = AddChecklist)
									)
									setIsShowModal(true)
								}}
							>
								<Checklist />
								<div className='name'>Checklist</div>
							</li>
							<li
								className='opt-card'
								onClick={(ev) => {
									const pos = getPopupPosition(ev.currentTarget, 305, 512)
									setPopupPosition(pos)
									dataRef.current = {
										title: 'Dates',
										data: {
											dates: cardDates,
										},
									}
									setCurrDynamic(
										prevDynamic =>
											(prevDynamic = DatesPicker)
									)
									setIsShowModal(true)
								}}
							>
								<Dates />
								<div className='name'>Dates</div>
							</li>
							{/* <li className='opt-card'>
								<div>📎</div>
								<div>Attachment</div>
							</li> */}
							<li
								className='opt-card'
								onClick={(ev) => {
									const pos = getPopupPosition(ev.currentTarget, 305, 512)
									setPopupPosition(pos)
									dataRef.current = {
										title: 'Cover',
										data: { style: card.style || {} },
									}
									setCurrDynamic(
										prevDynamic =>
											(prevDynamic = CoverPicker)
									)
									setIsShowModal(true)
								}}
							>
								<Cover />
								<div className='name'>Cover</div>
							</li>
						</ul>
					</section>
					<section className='actions'>
						<thead>Actions</thead>
						<ul>
							<li
								className='opt-card'
								onClick={() => {
									dataRef.current = {
										title: 'Move card',
										data: { board:board, group: group, card: card },
									}
									setCurrDynamic(
										prevDynamic =>
											(prevDynamic = MoveCard)
									)
									setIsShowModal(true)
								}}
							>
								<Move />
								<div className='name'>Move</div>
							</li>
						</ul>
						<ul>
							<li className='opt-card' onClick={onMoveCard}>
								<Copy />
								<div className='name'>Copy</div>
							</li>
						</ul>
						<hr />
						<ul>
							<li className='opt-card' onClick={onMoveCard}>
								<Close />
								<div className='name'>Delete</div>
							</li>
						</ul>
					</section>
				</section>

				<div className='user-opt'>
					{cardMembers.length > 0 ? (
						<section className='members'>
							<h4>Members</h4>
							<div className='members-container'>
								<CardMembers
									members={board.members.filter(member =>
										card.memberIds.includes(member._id)
									)}
								/>
								<span
									className='add-member-icon'
									onClick={() => {
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
									<Plus />
								</span>
							</div>
						</section>
					) : (
						<section className='members-empty'>
							<h4>Members</h4>
							<span className='add-member-icon'>
								<Plus />
							</span>
						</section>
					)}

					{cardLabels.length > 0 && (
						<section className='labels'>
							<h4>Labels</h4>
							<div className='labels-container'>
								<CardLabels
									labels={board.labels.filter(label =>
										card.labelIds.includes(label.id)
									)}
									// showTitles
									// onLableCick={onSetLabels}
									onPlusIcon={() => {
										dataRef.current = {
											title: 'Labels',
											data: {
												boardLabels: board.labels,
												cardLabels: card.labelIds,
											},
										}
										setCurrDynamic(
											prevDynamic =>
												(prevDynamic = LabelPicker)
										)
										setIsShowModal(true)
									}}
									className='card-details-labels'
								/>
							</div>
						</section>
					)}

					{cardDates?.dueDate?.length > 0 && (
						<section className='dates'>
							<h4>Due date</h4>
							<div className='dates-container'>
								<CardDates
									dates={cardDates}
									isDone={card.isDone}
									onDone={onCardDateDone}
								/>
							</div>
						</section>
					)}
				</div>

				<section className='description'>
					<div className='icon'>
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
						<div className='grdatxt'>
							<textarea
								ref={txtareaRef}
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
						</div>
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
				</section>

				{cardChecklists.length > 0 && (
					<ChecklistsContainer
						checklists={cardChecklists}
						removeChecklist={removeChecklist}
						onUpdate={onEditChecklist}
					/>
				)}

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
