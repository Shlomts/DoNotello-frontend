import {useState} from 'react'
import {addBoard} from '../../store/actions/board.actions'
import {showErrorMsg, showSuccessMsg} from '../../services/event-bus.service'
import {BackgroundSelector} from '../BackgroundSelector'
import {boardService} from '../../services/board'
import {Close} from '../SvgContainer'
import {onToggleModal} from '../../store/actions/system.actions'
import {useNavigate} from 'react-router'
//as i can see the cmp isnt keep the data when you close the tab
// and refresh the inputs. also isnt in the qparams
export function AddBoard({onClose}) {
  const [boardTitle, setBoardTitle] = useState('')
  const [workspace, setWorkspace] = useState('DoNotello Workspace')
  const [backgroundUrl, setBackgroundUrl] = useState('https://picsum.photos/seed/board1/400/200')
  const [isTitleInvalid, setIsTitleInvalid] = useState(true) // New state for title validation
  const navigate = useNavigate()
  function handleSelectBackground(url) {
    setBackgroundUrl(url)
  }

  async function saveBoard(ev) {
    ev.preventDefault()

    const boardToSave = boardService.getEmptyBoard()
    boardToSave.title = boardTitle
    boardToSave.workspace = workspace
    boardToSave.style.backgroundImage = backgroundUrl

    try {
      const savedBoard = await addBoard(boardToSave)

      if (savedBoard && savedBoard._id) {
        showSuccessMsg(`Board with title added: ${boardToSave.title}`)
        navigate(`/board/${savedBoard._id}`)
      } else {
        console.error('Board ID is missing', savedBoard)
      }
    } catch (err) {
      showErrorMsg('Cannot add board')
    } finally {
      onToggleModal(null)
    }
  }

  return (
    <div className="modal-overlay">
      <div className="add-board-modal">
        <header className="modal-header">
          <h2 className="title">Create Board</h2>
          <button className="close-btn" onClick={onClose}>
            <Close />
          </button>
        </header>
        <div className="modal-body">
          <BackgroundSelector onSelectBackground={handleSelectBackground} />

          <form onSubmit={saveBoard}>
            <div className="title-input-container">
              <label className="title">Board Title</label>
              <input
                className={`select ${isTitleInvalid ? 'invalid' : ''}`}
                type="text"
                placeholder="Enter board title"
                value={boardTitle}
                onChange={(e) => {
                  const newTitle = e.target.value
                  setBoardTitle(newTitle)
                  setIsTitleInvalid(newTitle.trim() === '') 
                }}
                autoFocus
              />
              {isTitleInvalid ? (
                <span className="error-msg">👋 Board title is required</span>
              ) : (
                <span className="error-msg-hidden"></span>
              )}
            </div>

            <div className="workspace-input-container">
              <label className="title">Workspace</label>
              <select className="select" value={workspace} onChange={setWorkspace}>
                <option className="option">DoNotello Workspace</option>
                {/* Add more workspaces if needed */}
              </select>
            </div>

            <button type="submit" className="save-btn" disabled={!boardTitle}>
              Create
            </button>
          </form>
        </div>
        <footer className="modal-footer"></footer>
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
