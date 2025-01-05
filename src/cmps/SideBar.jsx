import React from 'react'
import {Link} from 'react-router-dom'

export function SideBar() {
  return (
    <div className="board-sidebar">
      <ul className="sidebar-links">
        <li >
          <Link to="/boards">
            <div></div>
            <p>Boards</p>
          </Link>
        </li>
        <li>
          <Link to="/templates">
            <div></div>
            <p>Templates</p>
          </Link>
        </li>
        <li>
          <Link to="/home">
            <div></div>
            <p>Home</p>
          </Link>
        </li>
        <div className="saparete"></div>
        <p>Workspace</p>
        <div className="sidebar-bomerang">
          <h6>
           
            <div className="sidebar-logo">
              <div className="sidebarlogo">D</div>
            </div>{' '}
            Donotello Workspace <span className="bomerang-icon">🇻</span>
          </h6>
          <li className="active">
            <Link to="/boards">
              <div></div> <p>Boards</p>
            </Link>
          </li>
          <li>
            <Link to="/collections">
              <div></div> <p>Collections</p>
            </Link>
          </li>
          <li>
            <Link to="/highlights">
              <div></div>
              <p>Highlights</p>
            </Link>
          </li>
          <li>
            <Link to="/members">
              <div></div>
              <p>Members</p>
            </Link>
          </li>
          <li>
            <Link to="/settings">
              <div></div>
              <p>Settings</p>
            </Link>
          </li>
        </div>
      </ul>
    </div>
  )
}
