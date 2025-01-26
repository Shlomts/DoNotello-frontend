import {useSelector} from 'react-redux'
import {useState} from 'react'
import {useParams} from 'react-router'
import {Close, LeftArrow} from '../SvgContainer'
import {BackgroundSelector} from '../BackgroundSelector'
import {updateBoard} from '../../store/actions/board.actions'
import {showErrorMsg, showSuccessMsg} from '../../services/event-bus.service'

export function BoardMenu({handleBackgroundChange}) {
  const {boardId} = useParams()
  const users = useSelector((storeState) => storeState.userModule.users)
  const board = useSelector((storeState) => storeState.boardModule.board)
  const [menuView, setMenuView] = useState('main')
  const [isOpen, setIsOpen] = useState(true)

  const images = [
    '/imgs/board1.jpg',
    '/imgs/board2.jpg',
    '/imgs/board3.jpg',
    '/imgs/board4.jpg',
    '/imgs/board5.jpg',
    '/imgs/board6.jpg',
    '/imgs/board7.jpg',
    '/imgs/board8.jpg',
  ]

  async function handleBackgroundChange(newImageUrl) {
    if (!board) return
    try {
      const updatedBoard = {
        ...board,
        style: {...board.style, backgroundImage: newImageUrl},
      }
      console.log(updatedBoard)

      await updateBoard(updatedBoard)
      showSuccessMsg('Board updated')
    } catch (err) {
      showErrorMsg('Cannot update board')
    }
  }

  return (
    <div className={`board-menu ${isOpen ? 'open' : 'closed'}`}>
      <div className="board-container">
        <header className="menu-header">
          <div className="header-container">
            {menuView === 'background' && (
              <button className="back-btn" onClick={() => setMenuView('main')}>
                <LeftArrow />
              </button>
            )}
            <h3 className="title">{menuView === 'main' ? 'Menu' : 'Photos from Unsplash'}</h3>

            <button className="close-btn" onClick={() => setIsOpen(false)}>
              <Close />
            </button>
          </div>
          <hr />
        </header>

        <section className="panel-container">
          <div className="board-menu-panel">
            {menuView === 'main' ? (
              <ul>
                <li onClick={() => setMenuView('background')}>Change Background</li>
              </ul>
            ) : (
              <div className="selector">
                {images.map((img, index) => (
                  <button key={index} className="background-option" onClick={() => handleBackgroundChange(img)}>
                    <img src={img} alt={`Background ${index + 1}`} />
                  </button>
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  )
}
