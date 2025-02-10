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

	const [isEditCardTitle, setIsEditCardTitle] = useState(false)

	const [isEditMode, setIsEditMode] = useState(false)
	const [desInEdit, setDesInEdit] = useState(card?.description)
	const txtareaRef = useRef(null)

	const [isShowModal, setIsShowModal] = useState(false)
	const [currDynamic, setCurrDynamic] = useState(null)
	const dataRef = useRef(null)

	useEffect(() => {
		getCard()
	}, [params.cardId])

	useEffect(() => {
		handleResize()
	}, [desInEdit])

	useEffect(() => {
		setDesInEdit(card?.description || '')
	}, [card])

	async function getCard() {
		try {
			const cardToSet = await loadCard(board, cardId)
			const groupToSet = await loadGroup(board, cardId)
			setCard(cardToSet)
			setGroup(groupToSet)
		} catch (err) {
			console.error('Having problmes loading card...', err)
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
		setCard(prevCard => {
			prevCard.description = desInEdit
			updateCard(board, group, prevCard)
			return prevCard
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
			const updatedLabels = card.labelIds.includes(id)
				? card.labelIds.filter(labelId => labelId !== id)
				: [...card.labelIds, id]

			setCard(prevCard => {
				const updatedCard = { ...prevCard, labelIds: updatedLabels }
				updateCard(board, group, updatedCard)
				return updatedCard
			})
		}
	}

	function onAddChecklist(data) {
		const newChecklist = { id: makeId(), title: data, tasks: [] }
		const updatedChecklists = [...(card.checklists || []), newChecklist]
		setCard(prevCard => {
			const updatedCard = {
				...prevCard,
				checklists: updatedChecklists,
			}
			updateCard(board, group, updatedCard)
			return updatedCard
		})
		onCloseModal()
	}

	function onEditChecklist(newChecklist) {
		const editList = card.checklists.filter(
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
	}

	function removeChecklist(id) {
		const newChecklists = card.Checklists.filter(
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
		setIsShowModal(false)
	}

	function onSetDates(newDates) {
		const updatedDates = { ...(card.dates || {}), ...newDates }
		setCard(prevCard => {
			const updatedCard = {
				...prevCard,
				dates: updatedDates,
				isDone: false,
			}
			updateCard(board, group, updatedCard)
			return updatedCard
		})
	}

	function onCardDateDone() {
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
		// console.log('im in onMoveCard!! ')
		// console.log('data:', data)
		return
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
					position={dataRef.current.position}
				/>
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
							value={card.title}
							// onChange={ev => setCardTitle(ev.target.value)}
							onChange={ev =>
								setCard(prevCard => {
									const updatedCard = {
										...prevCard,
										title: ev.target.value,
									}
									updateCard(board, group, updatedCard)
									return updatedCard
								})
							}
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
									const pos = getPopupPosition(
										ev.currentTarget,
										305,
										512
									)
									dataRef.current = {
										title: 'Members',
										data: {
											boardMembers: board.members,
											cardMembers: card.memberIds,
										},
										position: {
											position: 'absolute',
											top: pos.top,
											left: pos.left,
											zIndex: 1000,
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
								onClick={ev => {
									const pos = getPopupPosition(
										ev.currentTarget,
										305,
										512
									)
									dataRef.current = {
										title: 'Labels',
										data: {
											boardLabels: board.labels,
											cardLabels: card.labelIds,
										},
										position: {
											position: 'absolute',
											top: pos.top,
											left: pos.left,
											zIndex: 1000,
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
								onClick={ev => {
									const pos = getPopupPosition(
										ev.currentTarget,
										305,
										512
									)
									dataRef.current = {
										title: 'Add checklist',
										data: {
											checklists: card.checklists,
										},
										position: {
											position: 'absolute',
											top: pos.top,
											left: pos.left,
											zIndex: 1000,
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
								onClick={ev => {
									const pos = getPopupPosition(
										ev.currentTarget,
										305,
										512
									)
									dataRef.current = {
										title: 'Dates',
										data: {
											dates: card.dates,
										},
										position: {
											position: 'sticky',
											top: pos.top,
											left: pos.left,
											zIndex: 1000,
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
							<li
								className='opt-card'
								onClick={ev => {
									const pos = getPopupPosition(
										ev.currentTarget,
										305,
										512
									)
									dataRef.current = {
										title: 'Cover',
										data: { style: card.style || {} },
										position: {
											position: 'absolute',
											top: pos.top,
											left: pos.left,
											zIndex: 1000,
										},
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
									const pos = getPopupPosition(
										ev.currentTarget,
										305,
										512
									)
									dataRef.current = {
										title: 'Move card',
										data: {
											board: board,
											group: group,
											card: card,
										},
										position: {
											position: 'absolute',
											top: pos.top,
											left: pos.left,
											zIndex: 1000,
										},
									}
									setCurrDynamic(
										prevDynamic => (prevDynamic = MoveCard)
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
							<li className='opt-card' onClick={onRemoveCard}>
								<Close />
								<div className='name'>Delete</div>
							</li>
						</ul>
					</section>
				</section>

				<div className='user-opt'>
					{card.memberIds?.length > 0 ? (
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
									onClick={ev => {
										const pos = getPopupPosition(
											ev.currentTarget,
											305,
											512
										)
										dataRef.current = {
											title: 'Members',
											data: {
												boardMembers: board.members,
												cardMembers: card.memberIds,
											},
											position: {
												position: 'absolute',
												top: pos.top,
												left: pos.left,
												zIndex: 1000,
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

					{card.labelIds?.length > 0 && (
						<section className='labels'>
							<h4>Labels</h4>
							<div className='labels-container'>
								<CardLabels
									labels={board.labels.filter(label =>
										card.labelIds.includes(label.id)
									)}
									// showTitles
									// onLableCick={onSetLabels}
									onPlusIcon={ev => {
										const pos = getPopupPosition(
											ev.currentTarget,
											305,
											512
										)
										dataRef.current = {
											title: 'Labels',
											data: {
												boardLabels: board.labels,
												cardLabels: card.labelIds,
											},
											position: {
												position: 'absolute',
												top: pos.top,
												left: pos.left,
												zIndex: 1000,
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

					{card.dates?.dueDate?.length > 0 && (
						<section className='dates'>
							<h4>Due date</h4>
							<div className='dates-container'>
								<CardDates
									dates={card.dates}
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
						{card.description && !isEditMode && (
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
										setDesInEdit(card.description)
									}}
								>
									Cancel
								</button>
							</div>
						</div>
					) : card.description ? (
						<div
							className='des-input grdatxt'
							onClick={() => setIsEditMode(true)}
							dangerouslySetInnerHTML={{
								__html: card.description.replace(/\n/g, '<br>'),
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

				{card.checklists?.length > 0 && (
					<ChecklistsContainer
						checklists={card.checklists}
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
