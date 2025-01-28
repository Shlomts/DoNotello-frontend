import {Link, useNavigate} from 'react-router-dom'
import {Star, Unstar} from '../SvgContainer'
import {useDispatch} from 'react-redux'
import {updateBoard} from '../../store/actions/board.actions'

export function BoardPreview({board, onRemoveBoard, onUpdateBoard}) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  if (!board) {
    return <p>Board not available</p>
  }

  async function onSetStar(ev) {
    try {
      ev.stopPropagation()
      const updatedBoard = {...board, isStarred: !board.isStarred}
      await updateBoard(updatedBoard)
      showSuccessMsg('Board updated')
    } catch (err) {
      showErrorMsg('Cannot update board')
    }
  }

  function getStarIcon(isStarred) {
    return isStarred ? <Unstar /> : <Star />
  }

  function handleNavigate() {
    navigate(`/board/${board._id}`)
  }

  return (
    <article
      className={`board-preview-card ${board.isStarred ? 'isStarred' : ''}`}
      style={{backgroundImage: `url(${board.style.backgroundImage})`}}
      onClick={handleNavigate}
    >
      {' '}
      <div className="board-prew-container ">
        <header className="board-preview-title">
          <div className="title">{board.title}</div>
        </header>
        <div className="space"></div>
        <div className="board-preview-action">
          <div className="star-btn-container">
            <button className="star-btn">
              <div className="star-container">
                <span className="star-icon" onClick={(ev) => onSetStar(ev)}>
                  {getStarIcon(board.isStarred)}
                </span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </article>
  )
}
