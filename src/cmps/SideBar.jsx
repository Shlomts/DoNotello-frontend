import {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import {AddBoard} from './board/AddBoard'
import {onToggleModal} from '../store/actions/system.actions'
import {Boards, EllipsisIcon, LeftArrow, Members, Plus, RightArrow, Star, Unstar} from './SvgContainer'
import {useDispatch, useSelector} from 'react-redux'
import {loadBoards, removeBoard, toggleBoardStar} from '../store/actions/board.actions'
import {useNavigate} from 'react-router'
import {LeaveBoardModal} from './LeaveBoardModal'
import {showErrorMsg, showSuccessMsg} from '../services/event-bus.service'

export function SideBar() {
  const boards = useSelector((storeState) => storeState.boardModule.boards)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedBoard, setSelectedBoard] = useState(null)
  const [isCollapsed, setIsCollapsed] = useState(false)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    loadBoards()
  }, [])

  function NavToHome() {
    navigate('/board')
  }

  async function onRemoveBoard(boardId) {
    try {
      dispatch(removeBoard(boardId))
      showSuccessMsg('Board removed')
    } catch (err) {
      showErrorMsg('Cannot remove board')
    } finally {
      setIsModalOpen(false)
      setSelectedBoard(null)
    }
  }

  function onAddBoard(event) {
    onToggleModal(
      {
        cmp: AddBoard,
        props: {
          onClose: onToggleModal,
        },
        trigger: 'sidebar-add-board', // Pass trigger location
      },
      event
    )
  }

  function openLeaveModal(board, event) {
    onToggleModal(
      {
        cmp: LeaveBoardModal,
        props: {
          boardTitle: board.title,
          onClose: onToggleModal, // Close modal
          onLeave: () => onRemoveBoard(board._id), // Pass callback instead of executing immediately
        },
        trigger: 'sidebar-leave-modal',
        position: {top: 0, left: 0},
      },
      event
    )
  }

  function handleStarToggle(boardId) {
    dispatch(toggleBoardStar(boardId))
  }

  function getStarIcon(isStarred) {
    return isStarred ? <Unstar /> : <Star />
  }
  return (
    <div
      className={`board-sidebar   ${isCollapsed ? 'collapsed' : ''}
`}
    >
      <header className="sidebar-header">
        <div className="sidebar-logo" onClick={NavToHome}>
          <span className="sidebarlogo">D</span>
        </div>{' '}
        <p className="logo-link" onClick={NavToHome}>
          DoNotello Workspace
        </p>
        <button className="toggle-btn" onClick={() => setIsCollapsed(!isCollapsed)}>
          {isCollapsed ? <RightArrow /> : <LeftArrow />}
        </button>
      </header>

      <ul className="sidebar-links">
        <li className="main-board">
          <Link to="/board">
            <div>
              <Boards />
            </div>
            <span>Boards</span>
          </Link>
        </li>
        <li className="members">
          <Link to="/members">
            <div>
              <Members />
            </div>
            <p>Members</p>
          </Link>
        </li>
        <div className="boards-action">
          <h2 className="title">Your boards</h2>
          <div className="boards-btn-actions">
            <button className="sort-by">
              <EllipsisIcon />
            </button>
            <button className="add-board" onClick={onAddBoard}>
              <Plus />
            </button>
          </div>
        </div>
        {boards.map((board) => (
          <li key={board._id} className="boards-list">
            <Link to={`/board/${board._id}`}>
              <div style={{backgroundImage: `url(${board.style.backgroundImage})`}}></div>
              <span>{board.title}</span>
            </Link>
            <div className="btn-actions">
              <button className="sort-by" onClick={() => openLeaveModal(board)}>
                <EllipsisIcon />
              </button>
              <button className={board.isStarred ? 'starred' : 'onstar'} onClick={() => handleStarToggle(board._id)}>
                {getStarIcon(board.isStarred)}
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
