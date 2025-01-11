import React from 'react'
import {Link} from 'react-router-dom'
import { AddBoard } from './board/AddBoard'
import { onToggleModal } from '../store/actions/system.actions'

export function SideBar() {
  function goToBoard() {
   <Link to="/board"></Link>
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
    );
  }

  const boards = boardService.getRamdonBoards()
  return (
    <div className="board-sidebar">
      <header className="sidebar-header">
        <div className="sidebar-logo" onClick={goToBoard}>
          <span className="sidebarlogo">D</span>
        </div>{' '}
        <p className="logo-link" onClick={goToBoard}>
          Donotello Workspace
        </p>
      </header>

      <ul className="sidebar-links">
        <li className="main-board">
          <Link to="/board">
            <div></div>
            <span>Boards</span>
          </Link>
        </li>
        <li className="members">
          <Link to="/members">
            <div></div>
            <p>Members</p>
          </Link>
        </li>
        <div className="boards-action">
          <h2 className="title">Your boards</h2>
          <div className="btn-actions">
            <button className="sort-by">...</button>
            <button className="add-board" onClick={onAddBoard}>+</button>
          </div>
        </div>
        {boards.map((board) => (
          <li key={board._id} className="boards-list">
            <Link to={`/board/${board._id}`}>
              <div></div>
              <span>{board.title}</span>
            </Link>
            <div className="btn-actions">
              <button className="sort-by">...</button>
              <button className="star-board">⭐</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
