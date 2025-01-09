import {Link} from 'react-router-dom'

export function BoardPreview({board}) {
  function boardName(board) {
    return board.title ? board.title : 'Donetello'
  }
  return (
    <article className="board-preview-card">
      {/* <Link to={`/board/${board._id}`}></Link> */}
      <div className="board-prew-container">
        <header>
          <div className="board-preview-title">
            <div className="title">{boardName(board)}</div>
          </div>
        </header>

        <div className="board-preview-action">

          <div className="star-btn-container">
            <button className="star-btn">
              <div className="star-container">
                <span className="star-icon">⭐</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </article>
  )
}
