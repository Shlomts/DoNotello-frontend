import { Close } from '../../SvgContainer'

export function MemberPicker({
	info,
	onCloseModal,
	onAddCardMember,
	onUpdate,
}) {
	console.log('ingo', info)

	return (
		<section className='member-picker'>
			<header>
				<h4>{info.title}</h4>

				<button onClick={onCloseModal}>
					<Close />
				</button>
			</header>

			<input
				type='text'
				className='search'
				placeholder='Search members'
			/>

			<section className='members-list'>
				<thead>Card members</thead>
				<ul>
					{info.boardMembers.map(member => (
						<li key={member.id} className='member'>
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
			<section className='members-list'>
				<thead>Board members</thead>
				<ul>
					{info.boardMembers.map(member => (
						<li key={member.id} className='member'>
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
		</section>
	)
}
