import {useState} from 'react'
import {addBoard} from '../../store/actions/board.actions'
import {showErrorMsg, showSuccessMsg} from '../../services/event-bus.service'
import {BackgroundSelector} from '../BackgroundSelector'
//as i can see the cmp isnt keep the data when you close the tab
// and refresh the inputs. also isnt in the qparams
export function AddBoard({ onClose }) {
  const [boardTitle, setBoardTitle] = useState('')
  const [isTitleInvalid, setIsTitleInvalid] = useState(false) // Track invalid state
  const [workspace, setWorkspace] = useState('DoNotello Workspace')
  const [backgroundUrl, setBackgroundUrl] = useState('') // New state for background URL

  function handleSelectBackground(url) {
    setBackgroundUrl(url)
  }

  function handleSave() {
    if (!boardTitle) {
      setIsTitleInvalid(true) // Mark the input as invalid
      return
    }
    console.log({boardTitle, workspace, backgroundUrl})

    savedBoard({boardTitle, workspace, backgroundUrl})
    onClose()
  }

  // function onClose() {
  //   onToggleModal()
  // }

  function handleTitleChange(e) {
    setBoardTitle(e.target.value)
    if (e.target.value) setIsTitleInvalid(false) // Reset invalid state when input is valid
  }

  async function savedBoard() {
    try {
      const savedBoard = await addBoard(board)
      showSuccessMsg(`Board added (id: ${savedBoard._id})`)
    } catch (err) {
      showErrorMsg('Cannot add board')
    }
  }

  return (
    <div className="modal-overlay">
      <div className="add-board-modal">
        <header className="modal-heder">
          <h2 className="title">Create Board</h2>
          <button className="close-btn" onClick={onClose}>
            X
          </button>
        </header>
        <div className="modal-body">
          <BackgroundSelector onSelectBackground={handleSelectBackground} />

          <form onSubmit={handleSave}>
            <div className="title-input-container">
              <label className="title">Board Title *</label>
              <input
                className={`select ${isTitleInvalid ? 'invalid' : ''}`}
                type="text"
                placeholder="Enter board title"
                value={boardTitle}
                onChange={handleTitleChange}
                autoFocus
              />
              {isTitleInvalid && <span className="error-msg">👋 Board title is required</span>}
            </div>

            <div className="workspace-input-container">
              <label className="title">Workspace</label>
              <select className="select" value={workspace} onChange={(e) => setWorkspace(e.target.value)}>
                <option className="option">DoNotello Workspace</option>
                {/* Add more workspaces if needed */}
              </select>
            </div>

            <button type="submit" className="save-btn" disabled={!boardTitle}>
              Create
            </button>
          </form>
        </div>
        <footer className="modal-footer">
          <div className="warning">
            <div className="premium-container">
              <span className="premium-logo">premium</span>
            <p>
              Create unlimited boards in Premium
              <p>Free Workspaces can only have up to 10 boards.</p>
            </p>
            </div>
          </div>
          <p>By using images from Unsplash,you agree to their license and Terms of Service</p>
        </footer>
      </div>
    </div>

    /* <Modal show={true} onHide={onClose} className="add-board-modal">
       <Modal.Header closeButton className="modal-heder">
         <Modal.Title className="title">Create Board</Modal.Title>
      </Modal.Header>
      <Modal.Body className="modal-body">
        <BackgroundSelector onSelectBackground={handleSelectBackground} />

         <Form>
          <Form.Group className="title-input-container" controlId="formBoardTitle">
            <Form.Label className="title">Board Title *</Form.Label>
            <Form.Control
              className="select"
              type="text"
              placeholder="Enter board title"
              value={boardTitle}
              onChange={handleTitleChange}
              isInvalid={isTitleInvalid} // Add invalid style if needed
               autoFocus
             />
             <Form.Control.Feedback type="invalid">👋 Board title is required</Form.Control.Feedback>
           </Form.Group>

           <Form.Group className="workspace-input-container" controlId="formWorkspace">
             <Form.Label className="title">Workspace</Form.Label>
             <Form.Select className="select" value={workspace} onChange={(e) => setWorkspace(e.target.value)}>
               <option className="option">DoNotello Workspace</option>
               // { Add more workspaces if needed }
             </Form.Select>
           </Form.Group>
       <Button variant="primary" onClick={handleSave}>
         Create Board
       </Button>
         </Form>
       </Modal.Body>
       <Modal.Footer>
         <div class="warning">
           <div className="premium-container">
             <span className="premium-logo">premium</span>
           </div>
         </div>
       </Modal.Footer>
     </Modal> 
     */
  )
}
