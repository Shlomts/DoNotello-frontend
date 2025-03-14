import { userService } from '../../services/user'
import { BoardPreview } from './BoardPreview'

export function BoardList({ boards, onRemoveBoard, onUpdateBoard, onAddBoard, className }) {
  if (!boards || boards.length === 0) {
    return <p>No boards available</p>
  }


  return (
    <section className="board-list-container">
      <div className="board-list">
        <ul className={`list ${className}`}>
          {boards.map((board) => (
            <li key={board._id}>
              <BoardPreview board={board} onRemoveBoard={onRemoveBoard} onUpdateBoard={onUpdateBoard} />
            </li>
          ))}
          <div className="add-board" onClick={onAddBoard}>
            <p>Create new board</p>
          </div>
        </ul>
      </div>
    </section>
  )
}
