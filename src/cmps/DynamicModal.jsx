import { useSelector } from 'react-redux';
import { onToggleModal } from '../store/actions/system.actions';

export function DynaminModal(){
    const modalData = useSelector((storeState) => storeState.systemModule.modalData)

	function onCloseModal() {
		onToggleModal()
	}

	if (!modalData) return <></>
	const Cmp = modalData.cmp
	return (
		<div className="dynamic-modal">
			<button className="close" onClick={onCloseModal}>X</button>
			<section className="content">
				{Cmp && <Cmp {...modalData.props} onClose={onCloseModal}/>}
			</section>
		</div>
	)
}