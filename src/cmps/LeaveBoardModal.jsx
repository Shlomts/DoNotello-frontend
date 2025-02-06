import {useState} from 'react'
import {Close, RightArrow} from './svgContainer'

export function LeaveBoardModal({onClose, onLeave, boardTitle}) {
  const [isConfirming, setIsConfirming] = useState(false)

  function handleLeaveClick() {
    setIsConfirming(true) // Show confirmation message
  }

  async function handleConfirmLeave() {
    await onLeave()
    onClose()
  }

  return (
    <section className="modal-overlay-remove">
      <div className="modal-content" >
        {!isConfirming ? (
          <>
            <header className="modal-title-remove">
              <h2 className="board-name">{boardTitle}</h2>
              <button onClick={onClose} className="close-btn">
                <Close />
              </button>
            </header>
            <div className="modal-actions">
              <button onClick={handleLeaveClick} className="btn leave-board">
                <span>Close board</span>
                <span className="arrow-icon">
                  <RightArrow />
                </span>
              </button>
            </div>
          </>
        ) : (
          <>
            <section className="comfirm">
              <header className="modal-title-remove">
                <h2 className="board-title">Close board?</h2>
                <button onClick={onClose} className="close-btn">
                  <Close />
                </button>
              </header>
              <div className="board-body">
                <p>You will be remove this board.</p>

                <button onClick={handleConfirmLeave} className="close-board-confirm">
                  Close
                </button>
              </div>
            </section>
          </>
        )}
      </div>
    </section>
  )
}
