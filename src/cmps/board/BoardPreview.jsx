import {Link, useNavigate} from 'react-router-dom'
import {Star, Unstar} from '../SvgContainer'
import {useDispatch} from 'react-redux'
import {toggleBoardStar} from '../../store/actions/board.actions'

export function BoardPreview({board, onRemoveBoard, onUpdateBoard}) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  if (!board) {
    return <p>Board not available</p>
  }

  function handleStarToggle(ev, boardId) {
    ev.stopPropagation()
    dispatch(toggleBoardStar(boardId))
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
    >
      {' '}
      <div className="board-prew-container ">
        <Link to={`/board/${board._id}`}>
          <header>
            <div className="board-preview-title">
              <div className="title">{board.title}</div>
            </div>
          </header>
          <div className="space"></div>
        </Link>
        <div className="board-preview-action">
          <div className="star-btn-container">
            <button className="star-btn">
              <div className="star-container">
                <span className="star-icon" onClick={(ev) => handleStarToggle(ev, board._id)}>
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
