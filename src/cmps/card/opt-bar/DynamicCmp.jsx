import { Close } from '../../svgContainer'

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
						onUpdateCmp(data)
					}}
				/>
			</section>
		</div>
	)
}
