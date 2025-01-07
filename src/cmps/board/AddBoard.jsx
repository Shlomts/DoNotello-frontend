import {useState} from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import {onToggleModal} from '../../store/actions/system.actions'
import {addBoard} from '../../store/actions/board.actions'
import {showErrorMsg, showSuccessMsg} from '../../services/event-bus.service'
//as i can see the cmp isnt keep the data when you close the tab
// and refresh the inputs. also isnt in the qparams
export function AddBoard() {
  const [boardTitle, setBoardTitle] = useState('')
  const [isTitleInvalid, setIsTitleInvalid] = useState(false) // Track invalid state
  const [workspace, setWorkspace] = useState('DoNotello Workspace')
  const [backgroundUrl, setBackgroundUrl] = useState('') // New state for background URL

  function handleSave() {
    if (!boardTitle) {
      setIsTitleInvalid(true) // Mark the input as invalid
      return
    }
    // console.log({boardTitle, workspace, backgroundUrl})

    savedBoard({boardTitle, workspace, backgroundUrl})

    onClose() // Close the modal after successful submission
  }

  function onClose() {
    onToggleModal()
  }

  function handleTitleChange(e) {
    setBoardTitle(e.target.value)
    if (e.target.value) setIsTitleInvalid(false) // Reset invalid state when input is valid
  }

  function handleBackgroundUrlChange(e) {
    setBackgroundUrl(e.target.value)
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
    <Modal show={true} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Create Board</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formBackgroundUrl">
            <Form.Label>Background Image URL (Optional)</Form.Label>
            <Form.Control
              type="url"
              placeholder="Enter background image URL"
              value={backgroundUrl}
              onChange={handleBackgroundUrlChange}
            />
            <Form.Text className="text-muted">Use a URL from Unsplash or another image source.</Form.Text>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBoardTitle">
            <Form.Label>Board Title *</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter board title"
              value={boardTitle}
              onChange={handleTitleChange}
              isInvalid={isTitleInvalid} // Add invalid style if needed
              autoFocus
            />
            <Form.Control.Feedback type="invalid">👋 Board title is required</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formWorkspace">
            <Form.Label>Workspace</Form.Label>
            <Form.Select value={workspace} onChange={(e) => setWorkspace(e.target.value)}>
              <option>DoNotello Workspace</option>
              {/* Add more workspaces if needed */}
            </Form.Select>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Create Board
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
