import {useState, useEffect} from 'react'
import {useSelector} from 'react-redux'

import {loadBoards, addBoard, updateBoard, removeBoard, addBoardMsg} from '../store/actions/board.actions'

import {showSuccessMsg, showErrorMsg} from '../services/event-bus.service'
import {boardService} from '../services/board'
import {userService} from '../services/user'

import {BoardList} from '../cmps/board/BoardList'

export function BoardIndex() {
  const boards = useSelector((storeState) => storeState.boardModule.boards)

  async function onRemoveBoard(boardId) {
    try {
      await removeBoard(boardId)
      showSuccessMsg('Board removed')
    } catch (err) {
      showErrorMsg('Cannot remove board')
    }
  }

  async function onAddBoard() {
    const board = boardService.getEmptyBoard()
    board.vendor = prompt('Vendor?')
    try {
      const savedBoard = await addBoard(board)
      showSuccessMsg(`Board added (id: ${savedBoard._id})`)
    } catch (err) {
      showErrorMsg('Cannot add board')
    }
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
      <header className="workspace-header">
        <div className="workspace-logo-container">
          <div className="workspace-logo">D</div>
        </div>{' '}
        <div className="title">
          <h2>Donotello WorkSpace</h2>
          <span className="workspace-subtitle">
            Permium 🔒 <span className="workspace-privacy">Private</span>{' '}
          </span>
        </div>
      </header>
      <div className="saparete"></div>

      <section className="boards-container1">
        <div className="one-p-icon"></div> <h3>Your Boards</h3>
        <BoardList boards={boards} onRemoveBoard={onRemoveBoard} onUpdateBoard={onUpdateBoard} />
        <button className="add-board" onClick={onAddBoard}>Create new board</button>
      </section>
      <section className="boards-container2">
        <div className="all-p-icon"></div>
        <h3>All boards in this Workspace</h3>
        <BoardList boards={boards} onRemoveBoard={onRemoveBoard} onUpdateBoard={onUpdateBoard} />
        <button className="add-board" onClick={onAddBoard}>Create new board</button>
      </section>
    </main>
  )
}
