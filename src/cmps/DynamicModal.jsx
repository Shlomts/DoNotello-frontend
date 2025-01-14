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

  // Default modal styles
  let modalStyle = {
    position: 'fixed',
    width: '304px', // Default width
    zIndex: 1000,
  }

  // Here i nned to update the style to aligh as i want

  // Apply different styles based on trigger location
  if (trigger === 'header') {
    modalStyle = {
      ...modalStyle,
      top: position.top + 40, // Default top if not provided
      left: position.left + 50, // Default left if not provided
    }
  } else if (trigger === 'sidebar') {
    modalStyle = {
      ...modalStyle,
      top: position.top,
      left: position.left + 25,
    }
  } else if (trigger === 'board-index') {
    modalStyle = {
      ...modalStyle,
      top: position.top + 115,
      left: position.left - 70,
    }
  }
  const overlayClass =
    trigger && trigger !== 'board-index' && trigger !== 'sidebar' && trigger !== 'header' ? 'centered' : ''
  console.log(position)

  if (!modalData) return <></>
  return (
    <div className={`modal-overlay ${overlayClass}`} style={modalStyle}>
      <section className="content">{Cmp && <Cmp {...modalData.props} onClose={onCloseModal} />}</section>
    </div>
  )
}
