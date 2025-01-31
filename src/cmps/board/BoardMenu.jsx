import { useSelector } from 'react-redux'
import { Fragment, useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router'
import { Close, Description, InfoIcon, LeftArrow, Members } from '../SvgContainer'
import { updateBoard } from '../../store/actions/board.actions'
import { showErrorMsg, showSuccessMsg } from '../../services/event-bus.service'

export function BoardMenu({ board, onClose }) {
  const { boardId } = useParams()
  const users = useSelector((storeState) => storeState.userModule.users)
  // const board = useSelector((storeState) => storeState.boardModule.board)
  const [menuView, setMenuView] = useState('main')
  const [isOpen, setIsOpen] = useState(true)
  const [boardDescriptionInput, setBoardDescriptionInput] = useState(board?.description || '')
  const [isEditMode, setIsEditMode] = useState(false)
  const [desInEdit, setDesInEdit] = useState(boardDescriptionInput)
  const [comment, setComment] = useState('')
  const txtareaRef = useRef(null)

  useEffect(() => {
    if (board) {
      setBoardDescriptionInput(board.description || '')
      setDesInEdit(board.description || '')
    }
  }, [board])

  useEffect(() => {
    handleResize()
  }, [desInEdit])

  const images = [
    'https://res.cloudinary.com/dphepumae/image/upload/v1738062039/coffeMag_vezhli.jpg',
    'https://res.cloudinary.com/dphepumae/image/upload/v1738062049/cityFizza_kml6re.jpg',
    'https://res.cloudinary.com/dphepumae/image/upload/v1738062046/citySunset_nsfwyh.jpg',
    'https://res.cloudinary.com/dphepumae/image/upload/v1734955438/samples/balloons.jpg',
    'https://res.cloudinary.com/dphepumae/image/upload/v1734955440/samples/cup-on-a-table.jpg',
    'https://res.cloudinary.com/dphepumae/image/upload/v1734955432/samples/landscapes/beach-boat.jpg',
    'https://res.cloudinary.com/dphepumae/image/upload/v1734955432/samples/landscapes/architecture-signs.jpg',
    'https://res.cloudinary.com/dphepumae/image/upload/v1734955433/samples/landscapes/nature-mountains.jpg',
    'https://res.cloudinary.com/dphepumae/image/upload/v1734955432/samples/landscapes/girl-urban-view.jpg',
    'https://res.cloudinary.com/dphepumae/image/upload/v1734955429/sample.jpg',
    'https://res.cloudinary.com/dphepumae/image/upload/v1734955441/cld-sample-4.jpg',
    'https://res.cloudinary.com/dphepumae/image/upload/v1734955440/samples/coffee.jpg',
  ]

  async function handleBackgroundChange(newImageUrl) {
    if (!board) return
    try {
      const updatedBoard = {
        ...board,
        style: { ...board.style, backgroundImage: newImageUrl },
      }
      console.log(updatedBoard)

      await updateBoard(updatedBoard)
      showSuccessMsg('Board updated')
    } catch (err) {
      showErrorMsg('Cannot update board')
    }
  }

  function onChangeBoardDescription(ev) {
    setDesInEdit(ev.target.value)
  }

  function handleResize() {
    const txtarea = txtareaRef.current

    if (txtarea) {
      txtarea.style.height = 'auto'
      txtarea.style.height = `${txtarea.scrollHeight}px`
    }
  }

  async function onSaveBoardDescription() {
    if (!desInEdit || desInEdit === boardDescriptionInput) {
      setIsEditMode(false)
      return
    }

    const updatedBoard = { ...board, description: desInEdit }
    console.log(updatedBoard, 'before updating in the action ')

    try {
      await updateBoard(updatedBoard)
      console.log(updatedBoard, 'after updating in the action ')

      showSuccessMsg('Description updated')
      setBoardDescriptionInput(desInEdit)
    } catch (err) {
      showErrorMsg('Error updating description')
    } finally {
      setIsEditMode(false)
    }
  }

  function addMsgOnBoard() {
    if (!comment.trim()) return
    const updatedBoard = {
      ...board,
      comments: [...(board.comments || []), { text: comment, createdAt: Date.now() }], // ✅ Adds new comment properly
    }
    console.log(updatedBoard)

    try {
      addBoardMsg(updatedBoard)
      showSuccessMsg('Comment added')
      setComment('')
    } catch (err) {
      showErrorMsg('Error adding comment')
    }
  }

  function renderContent() {
    switch (menuView) {
      case 'background':
        return (
          <div className="selector">
            <div className="picker-container">
              {images.map((img, index) => (
                <div className="img-container" key={index}>
                  <button className="background-option" onClick={() => handleBackgroundChange(img)}>
                    <img src={img} alt={`Background ${index + 1}`} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )

      case 'boardDetails':
        return (
          <div className="board-details-menu">
            <div className="board-admin-container">
              <header>
                <div className="one-p-icon icon">
                  <Members />
                </div>
                <h4>Board admins</h4>
              </header>

              <div className="admin-info">
                {/* add here hen`s member modal */}
                <img
                  src={board?.createdBy?.imgUrl}
                  alt="Admin img"
                />
                <div className="name">
                  <h3>{board?.createdBy?.fullname}</h3>
                  <p>@{board?.createdBy?.username}</p>
                </div>
              </div>
            </div>

            <section className="board-description">
              <header>
                <div className="board-description icon">
                  <Description />
                </div>
                <h4 className="title">Description </h4>
                {boardDescriptionInput && !isEditMode && (
                  <button onClick={() => setIsEditMode(true)} className="edit-des">
                    Edit
                  </button>
                )}
              </header>
              {isEditMode ? (
                <Fragment>
                  <textarea
                    ref={txtareaRef}
                    className="grdatxt"
                    value={desInEdit}
                    onChange={onChangeBoardDescription}
                    placeholder="Add a more detailed description..."
                    autoFocus
                  />
                  <div className="desbtns">
                    <button className="save" onClick={onSaveBoardDescription}>
                      Save
                    </button>
                    <button
                      className="cancel"
                      onClick={() => {
                        setIsEditMode(false)
                        setDesInEdit(boardDescriptionInput)
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </Fragment>
              ) : boardDescriptionInput ? (
                <div
                  className="des-input grdatxt"
                  onClick={() => setIsEditMode(true)}
                  dangerouslySetInnerHTML={{
                    __html: boardDescriptionInput.replace(/\n/g, '<br>'),
                  }}
                ></div>
              ) : (
                <div className="no-des-plchldr grdatxt" onClick={() => setIsEditMode(true)}>
                  Add a description to let your teammates know what this board is used for. You’ll get bonus points if
                  you add instructions for how to collaborate!{' '}
                </div>
              )}
            </section>

            {/* <div className="board-comments">
        <h4>Comments</h4>
        <div className="comments-list">
          {board?.comments?.map((comment, index) => (
            <div key={index} className="comment-item">
              <p>{comment.text}</p>
              <span>{new Date(comment.createdAt).toLocaleString()}</span>
            </div>
          ))}
        </div>

   
        <h4>Any DoNotello user can…</h4>
        <textarea
          placeholder="Comment on cards"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button onClick={addMsgOnBoard}>Post</button>
      </div> */}
          </div>
        )

      default:
        return (
          <ul>
            <li>
              <button className="board-info-container" onClick={() => setMenuView('boardDetails')}>
                <div className="boaed-info-icon icon">
                  <InfoIcon />
                </div>
                <div className="title">
                  Board Details
                  <div className="sub-title">Add a description to your board</div>
                </div>
              </button>
            </li>
            <hr />
            <li>
              <button className="board-background-container" onClick={() => setMenuView('background')}>
                <div className="icon" style={{ backgroundImage: `url(${board?.style?.backgroundImage})` }}></div>
                <p>Change Background</p>
              </button>
            </li>
          </ul>
        )
    }
  }
  return (
    <div className={`board-menu ${isOpen ? 'open' : 'closed'}`}>
      <div className="board-container">
        <header className="menu-header">
          <div className="header-container">
            {menuView !== 'main' && (
              <button className="back-btn icon" onClick={() => setMenuView('main')}>
                <LeftArrow />
              </button>
            )}
            <h3 className="title">
              {menuView === 'main' ? 'Menu' : menuView === 'background' ? 'Photos from Cloudinary' : 'About this board'}
            </h3>
            <button className="close-btn" onClick={onClose}>
              <span className="icon">
                <Close />
              </span>
            </button>
          </div>
          <hr />
        </header>

        <section className="panel-container">
          <div className="board-menu-panel">{renderContent()}</div>
        </section>
      </div>
    </div>
  )
}
