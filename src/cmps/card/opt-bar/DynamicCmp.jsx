import { Fragment } from 'react'
import { Close } from '../../SvgContainer'
import { MemberPicker } from './MemberPicker'

export function DynamicCmp({ Cmp, title, onCloseModal, data, onUpdateCmp }) {
	return (
		<div className='dynamic'>
			<section className='dynamic-header'>
				<h4>{title}</h4>
				<button onClick={onCloseModal}>
					<Close />
				</button>
			</section>
			<section className='dynamic-body'>
				<Cmp
					info={data}
					onUpdate={data => {
						onUpdateCmp(data
							// console.log('this:', data.this)
							// console.log('data:', data)
							// cmp,
							// 'memberIds',
							// 'selectedMemberIds',
							// data,
							// `Changed members`
						)
					}}
				/>
			</section>
		</div>
	)
}

{
	/* 
 export function DynamicCmp({ cmp, onCloseModal }) {
	switch (cmp.type) {
		case 'MemberPicker':
			return (
				<MemberPicker
					info={cmp.info}
					onCloseModal={onCloseModal}
					onUpdate={(data) => {
						updateCmpInfo(
							cmp,
							'memberIds',
							"selectedMemberIds",
							data,
							`Changed members`
						)
					}}
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
} */
}
