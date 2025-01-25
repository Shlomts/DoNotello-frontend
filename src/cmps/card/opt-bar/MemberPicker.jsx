import { useRef, useState } from 'react'
import { Close } from '../../SvgContainer'

export function MemberPicker({ info, onUpdate }) {
	if (!info || !info.boardMembers) return 

	const [boardMembersList, setBoardMembersList] = useState(addIsInCard())

	function addIsInCard() {
		const newBoardMembers = info.boardMembers.map(member => ({
			...member, isInCard: info.cardMembers.includes(member.id)
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
		setBoardMembersList(prevMembers => prevMembers.map(member => {
			if(member.id === id) member.isInCard = !member.isInCard
			return member
		}))
		onUpdate(id)
	}

	return (
		<section className='member-picker'>
			<input
				type='text'
				className='search'
				placeholder='Search members'
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
								<div>{member.fullname}</div>
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
								<div>{member.fullname}</div>
							</li>
						))}
					</ul>
				</section>
			)}
		</section>
	)
}
