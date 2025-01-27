import { useEffect, useRef, useState } from 'react'
import { Close } from '../../SvgContainer'
import { use } from 'react'

export function MemberPicker({ info, onUpdate }) {
	if (!info || !info.boardMembers) return

	const [boardMembersList, setBoardMembersList] = useState(addIsInCard())
	const [srchPrm, setSrchPrm] = useState('')

	useEffect(() => {
		setBoardMembersList(
			addIsInCard().filter(member =>
				member.fullname.toUpperCase().includes(srchPrm.toUpperCase())
			)
		)
	}, [srchPrm])

	function addIsInCard() {
		const newBoardMembers = info.boardMembers.map(member => ({
			...member,
			isInCard: info.cardMembers.includes(member.id),
		}))
		return newBoardMembers
	}

	function getMembersInCard() {
		return boardMembersList.filter(member => member.isInCard)
	}

	function getMembersNotInCard() {
		return boardMembersList.filter(member => !member.isInCard)
	}

	function onUpdateMembers(id) {
		setBoardMembersList(prevMembers =>
			prevMembers.map(member => {
				if (member.id === id) member.isInCard = !member.isInCard
				return member
			})
		)
		onUpdate(id)
	}

	function onSearchMember(ev) {
		const prm = ev.target.value
		setSrchPrm(prm)
	}

	// FOR LATER >> implement search

	// const regex = new RegExp(filterBy.txt, 'i')
	// boards = boards.filter(
	// 	board => regex.test(board.vendor) || regex.test(board.description)
	// )

	return (
		<section className='member-picker'>
			<input
				type='text'
				className='search'
				value={srchPrm}
				placeholder='Search members'
				onChange={ev => onSearchMember(ev)}
			/>
			{getMembersInCard().length > 0 && (
				<section className='members-list'>
					<thead>Card members</thead>
					<ul>
						{getMembersInCard().map(member => (
							<li
								key={member.id}
								className='member'
								onClick={() => {
									onUpdateMembers(member.id)
								}}
							>
								<img
									src={member.imgUrl}
									alt={member.fullname}
									title={member.fullname}
									className='card-member-img'
								/>
								<div className='card-member-name'>
									{member.fullname}
								</div>
								<Close />
							</li>
						))}
					</ul>
				</section>
			)}
			{getMembersNotInCard().length > 0 && (
				<section className='members-list'>
					<thead>Board members</thead>
					<ul>
						{getMembersNotInCard().map(member => (
							<li
								key={member.id}
								className='member'
								onClick={() => {
									onUpdateMembers(member.id)
								}}
							>
								<img
									src={member.imgUrl}
									alt={member.fullname}
									title={member.fullname}
									className='card-member-img'
								/>
								<div className='card-member-name'>
									{member.fullname}
								</div>
							</li>
						))}
					</ul>
				</section>
			)}
		</section>
	)
}
