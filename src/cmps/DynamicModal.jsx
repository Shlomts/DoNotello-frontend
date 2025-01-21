import {useSelector} from 'react-redux'
import {useEffect, useRef, useState} from 'react'

import {onToggleModal} from '../store/actions/system.actions'

export function DynaminModal() {
  const modalData = useSelector((storeState) => storeState.systemModule.modalData)
  const modalRef = useRef(null)
  const [modalHeight, setModalHeight] = useState(null)

  useEffect(() => {
    if (modalRef.current) {
      setModalHeight(modalRef.current.clientHeight)
    }
  }, [modalData])

  function onCloseModal() {
    onToggleModal(null)
  }

  if (!modalData) return null
  console.log(modalData, 'modal data')

  const {trigger, position} = modalData
  const Cmp = modalData.cmp

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
      top: position.top - 255,
      left: 215,
    }
  } else if (trigger === 'board-index') {
    // const offset = 145

    modalStyle = {
      ...modalStyle,
      top: 150,
      left : 400,
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
    <div className={`modal-overlay ${overlayClass}`} style={modalStyle} ref={modalRef}>
      <section className="content">{Cmp && <Cmp {...modalData.props} onClose={onCloseModal} />}</section>
    </div>
  )
}
