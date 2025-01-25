import { Close } from '../../SvgContainer'

export function MemberPicker(params) {
	console.log("mmbrpicker renderd", params)
	const { info, onUpdate } = params
	// console.log('ingo', info)
	// console.log('cmp', info)

	return (
		<section className='member-picker'>

			<input
				type='text'
				className='search'
				placeholder='Search members'
			/>

			<section className='members-list'>
				<thead>Card members</thead>
				<ul>
					{info.boardMembers.map(member => (
						<li
							key={member.id}
							className='member'
							onClick={onUpdate}
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
						</li>
					))}
				</ul>
			</section>
		</section>
	)
}
