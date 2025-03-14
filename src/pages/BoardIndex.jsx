import {useEffect} from 'react'
import {useSelector} from 'react-redux'

import {loadBoards, updateBoard, removeBoard, addBoardMsg} from '../store/actions/board.actions'

import {showSuccessMsg, showErrorMsg} from '../services/event-bus.service'
import {boardService} from '../services/board'
import {userService} from '../services/user'

import {BoardList} from '../cmps/board/BoardList'
import {AddBoard} from '../cmps/board/AddBoard'
import {onToggleModal} from '../store/actions/system.actions'
import {DownTriangle, Lock, Members, UpTriangle} from '../cmps/SvgContainer'

export function BoardIndex() {
  const boards = useSelector((storeState) => storeState.boardModule.boards)


  useEffect(() => {
    loadBoards()
  }, [])

  const starredBoards = boards.filter((board) => board.isStarred)

  async function onRemoveBoard(boardId) {
    try {
      await removeBoard(boardId)
      showSuccessMsg('Board removed')
    } catch (err) {
      showErrorMsg('Cannot remove board')
    }
  }

  function onAddBoard(event) {
    onToggleModal(
      {
        cmp: AddBoard,
        props: {
          onClose: onToggleModal,
        },
        trigger: 'board-index',
      },
      event
    )
  }

  // Dont think we need here to update the boards //////////////////////////////
  async function onUpdateBoard(board) {
    const speed = +prompt('New speed?', board.speed)
    if (speed === 0 || speed === board.speed) return

    const boardToSave = {...board, speed}
    try {
      const savedBoard = await updateBoard(boardToSave)
      showSuccessMsg(`Board updated, new speed: ${savedBoard.speed}`)
    } catch (err) {
      showErrorMsg('Cannot update board')
    }
  }

  return (
    <main className="board-index">
      <div className="board-conainer">
        <div className="workspace-content">
          <header className="workspace-header">
            <div className="logo-container">
              <div className="workspace-logo-container">
                <div className="workspace-logo">D</div>
              </div>{' '}
              <div className="title">
                <h2>DoNotello WorkSpace</h2>
                <span className="workspace-subtitle">
                  <Lock /> <span className="workspace-privacy">Private</span>{' '}
                </span>
              </div>
            </div>
          </header>
          <div className="saparete-boards"></div>
          <section className="all-boards">
            {starredBoards.length > 0 && (
              <section className="boards-container-stared-list">
                <div className="boards-page-board-heder">
                  <div className="one-p-icon">
                    <Members />
                  </div>
                  <h3>Starred boards</h3>
                </div>
                <BoardList
                  boards={starredBoards}
                  onRemoveBoard={onRemoveBoard}
                  onUpdateBoard={onUpdateBoard}
                  onAddBoard={onAddBoard}
                  className='starred-boards'
                />
              </section>
            )}
            <section className="boards-container1">
              <div className="boards-page-board-heder">
                <div className="one-p-icon">
                  <Members />
                </div>
                <h3>All boards in this Workspace</h3>
              </div>
              <BoardList
                boards={boards}
                onRemoveBoard={onRemoveBoard}
                onUpdateBoard={onUpdateBoard}
                onAddBoard={onAddBoard}
                className='full-boards-list'
              />
            </section>
            {/* <section className="boards-container2 ">
          <div className="boards-page-board-heder">
            <div className="all-p-icon"></div>
            <h3>All boards in this Workspace</h3>
          </div>
          <BoardList
            boards={boards}
            onRemoveBoard={onRemoveBoard}
            onUpdateBoard={onUpdateBoard}
            onAddBoard={onAddBoard}
          />
        </section> */}
          </section>
        </div>
      </div>
      <div className="svg-scroolbar">
        <UpTriangle className="up"/> 
        <DownTriangle className="down"/>
      </div>
    </main>
  )
}
