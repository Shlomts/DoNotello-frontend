import {Link, NavLink} from 'react-router-dom'
import {useNavigate} from 'react-router'
import {useSelector} from 'react-redux'
import {showErrorMsg, showSuccessMsg} from '../services/event-bus.service'
import {logout} from '../store/actions/user.actions'
import {useEffect, useState} from 'react'
import {AddBoard} from './board/AddBoard'
import {onToggleModal} from '../store/actions/system.actions'
import {Members} from './SvgContainer'

export function AppHeader() {
  //   const user = useSelector((storeState) => storeState.userModule.user)
  const navigate = useNavigate()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const logoUrl = '/imgs/Logo.png'


  const user = {
    fullname: 'User Usery',
    email: 'user@gmail.com',
  }
  async function onLogout() {
    try {
      await logout()
      //   can make login page so itll go there
      navigate('/')
      showSuccessMsg(`Bye now`)
    } catch (err) {
      showErrorMsg('Cannot logout')
    }
  }

  function toggleDropdown() {
    setIsDropdownOpen(!isDropdownOpen)
  }

  function onAddBoard(event) {
    onToggleModal(
      {
        cmp: AddBoard,
        props: {
          onClose: onToggleModal,
        },
        trigger: 'header',
      },
      event
    )
  }

  return (
    <header className="app-header full">
      <nav>
        <NavLink to="/" className="logo">
          <div className="logo-container">
            <img src={logoUrl} alt="DoNotello Logo" />{' '}
          </div>
        </NavLink>
        <div className="nav-actions action">
          <div className="board-link">
            <NavLink to="board">Workspaces</NavLink>
          </div>
          <div className="create-board">
            <button className="create-btn" onClick={onAddBoard}>
              <p>Create</p>
            </button>
          </div>
        </div>

        {user && (
          <div className="user-info" onClick={toggleDropdown}>
            <div className="user-avatar">
              <Members />
            </div>
            {/* {isDropdownOpen && (
              <ul className="user-dropdown">
                <li className="account">
                  <h2>Account</h2>
                  <div className="user-container">
                    <div className="user-avatar">
                      <svg width="32" height="32" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="32" cy="32" r="30" stroke="white" strokeWidth="4" />
                        <circle cx="32" cy="24" r="10" fill="white" />
                        <rect x="16" y="40" width="32" height="16" rx="8" fill="white" />
                      </svg>
                    </div>
                    <div className="user-info">
                      <p className="user-name">{user.fullname}</p>
                      <p className="user-email">{user.email}</p>
                    </div>
                  </div>{' '}
                </li>
                <li>
                  <Link to={`user/${user._id}`}>Profile and visibility</Link>
                </li>
                <li>
                  <Link to="/activity">Activity</Link>
                </li>
                <li className="log-out">
                  <p onClick={onLogout}>Log out</p>
                </li>
              </ul>
            )} */}
          </div>
        )}
      </nav>
    </header>
  )
}
