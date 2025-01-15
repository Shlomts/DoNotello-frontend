import {useState} from 'react'
import {Link} from 'react-router-dom'
import {AddBoard} from './board/AddBoard'
import {onToggleModal} from '../store/actions/system.actions'
import {Boards, EllipsisIcon, Members, Plus, Star, Unstar} from './SvgContainer'
import {useDispatch, useSelector} from 'react-redux'
import {removeBoard, toggleBoardStar} from '../store/actions/board.actions'
import {useNavigate} from 'react-router'
import { LeaveBoardModal } from './LeaveBoardModal'

export function SideBar() {
  const boards = useSelector((storeState) => storeState.boardModule.boards)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedBoard, setSelectedBoard] = useState(null)

  function NavToHome() {
    navigate('/board')
  }

  async function onRemoveBoard(boardId) {
    try {
      await dispatch(removeBoard(boardId)) // Dispatch the action to remove the board
      showSuccessMsg('Board removed')
    } catch (err) {
      showErrorMsg('Cannot remove board')
    } finally {
      setIsModalOpen(false)
      setSelectedBoard(null)
    }
  }
  
  function openLeaveModal(board) {
    setSelectedBoard(board) // Pass the full board object
    setIsModalOpen(true)
  }
  
  function closeLeaveModal() {
    setIsModalOpen(false)
  }


  function onAddBoard(event) {
    onToggleModal(
      {
        cmp: AddBoard,
        props: {
          onClose: onToggleModal,
        },
        trigger: 'sidebar', // Pass trigger location
      },
      event
    )
  }

  function handleStarToggle(boardId) {
    dispatch(toggleBoardStar(boardId))
  }

  function getStarIcon(isStarred) {
    return isStarred ? <Unstar /> : <Star  />
  }

  return (
    <div className="board-sidebar">
      <header className="sidebar-header">
        <div className="sidebar-logo" onClick={NavToHome}>
          <span className="sidebarlogo">D</span>
        </div>{' '}
        <p className="logo-link" onClick={NavToHome}>
          Donotello Workspace
        </p>
      </header>

      <ul className="sidebar-links">
        <li className="main-board">

          {/* CR */}
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
              <div  style={{backgroundImage: `url(${board.style.backgroundImage})`}}></div>
              <span>{board.title}</span>
            </Link>
            <div className="btn-actions">
              <button className="sort-by" onClick={() => openLeaveModal(board)}>
                <EllipsisIcon />
              </button>
              <button className="star-board" onClick={() => handleStarToggle(board._id)}>
                {getStarIcon(board.isStarred)}
              </button>
            </div>
          </li>
        ))}
      </ul>

      {isModalOpen && selectedBoard && (
     <LeaveBoardModal
     onClose={closeLeaveModal}
     onLeave={() => onRemoveBoard(selectedBoard._id)}
     boardTitle={selectedBoard.title}
   />
      )}
    </div>
  )
}
