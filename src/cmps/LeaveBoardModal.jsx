import {useState} from 'react'
import {Close, RightArrow} from './svgContainer'

export function LeaveBoardModal({onClose, onLeave, boardTitle}) {
  const [isConfirming, setIsConfirming] = useState(false)

  function handleLeaveClick() {
    setIsConfirming(true) // Show confirmation message
  }

  function handleClose() {
    console.log('Closing modal')
    onClose()
  }

  return (
    <section className="modal-overlay-remove">
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {!isConfirming ? (
          <>
            <header className="modal-title-remove">
              <h2 className="board-name">{boardTitle}</h2>
              <button onClick={handleClose} className="close-btn">
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

                <button onClick={onLeave} className="close-board-confirm">
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
