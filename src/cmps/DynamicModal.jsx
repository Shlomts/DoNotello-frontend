import {useSelector} from 'react-redux'
import {onToggleModal} from '../store/actions/system.actions'

export function DynaminModal() {
  const modalData = useSelector((storeState) => storeState.systemModule.modalData)

  function onCloseModal() {
    onToggleModal(null)
  }

  function onCloseModal() {
    onToggleModal(null) // Clear modal data to close
  }

  if (!modalData) return null // Guard clause to return early if modalData is null or undefined

  const {trigger, position} = modalData // Only destructure trigger for now
  const Cmp = modalData.cmp

  // if (!position) {
  //   console.error('Modal position is undefined');
  //   return null; // Return early or handle the error accordingly
  // }

  // Default modal styles
  let modalStyle = {
    position: 'fixed',
    width: '304px', // Default width
    zIndex: 1000,
  }

  // Apply different styles based on trigger location
  if (trigger === 'header') {
    modalStyle = {
      ...modalStyle,
      top: position.top + 35,
      left: position.left + 45,
    }
  } else if (trigger === 'sidebar-add-board') {
    modalStyle = {
      ...modalStyle,
      top: position.top,
      left: position.left + 25,
    }
  } else if (trigger === 'sidebar-leave-modal') {
    modalStyle = {
      ...modalStyle,
      top:position.top -255,
      left: 215,
    }
  } else if (trigger === 'board-index') {
    modalStyle = {
      ...modalStyle,
      top: 280,
      left: position.left - 70,
    }
  }
  const overlayClass =
    trigger &&
    trigger !== 'board-index' &&
    trigger !== 'sidebar-add-board' &&
    trigger !== 'sidebar-add-board' &&
    trigger !== 'header'
      ? 'centered'
      : ''

  if (!modalData) return <></>
  return (
    <div className={`modal-overlay ${overlayClass}`} style={modalStyle}>
      <section className="content">{Cmp && <Cmp {...modalData.props} onClose={onCloseModal} />}</section>
    </div>
  )
}
