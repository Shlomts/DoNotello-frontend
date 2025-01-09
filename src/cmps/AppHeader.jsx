import {Link, NavLink} from 'react-router-dom'
import {useNavigate} from 'react-router'
import {useSelector} from 'react-redux'
import {showErrorMsg, showSuccessMsg} from '../services/event-bus.service'
import {logout} from '../store/actions/user.actions'
import {useState} from 'react'
import {AddBoard} from './board/AddBoard'
import {onToggleModal} from '../store/actions/system.actions'

export function AppHeader() {
  //   const user = useSelector((storeState) => storeState.userModule.user)
  const navigate = useNavigate()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

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

  function openAddBoard() {
    onToggleModal({
      cmp: AddBoard, // Pass the AddBoard component
      props: {
        onClose: onToggleModal, // Pass onClose handler
      },
    })
  }

  return (
    <header className="app-header full">
      <nav>
        <NavLink to="/board" className="logo">
          <div className="logo-container">
            <svg
              width="48"
              height="48"
              viewBox="0 0 64 64"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="logo-icon"
            >
              <rect x="8" y="12" width="48" height="30" rx="2" stroke="white" strokeWidth="2" />
              <rect x="20" y="44" width="24" height="4" fill="white" />
              <circle cx="32" cy="54" r="2" fill="white" />
            </svg>
            <span className="logo-text">DoNotello</span>
          </div>
        </NavLink>
        <div className="nav-actions action">
          <div className="board-link">
            <NavLink to="board">Workspaces</NavLink>
          </div>
          <div className="create-board">
            <button onClick={openAddBoard}>
              <p>create</p>
            </button>
          </div>
        </div>

        {user && (
          <div className="user-info" onClick={toggleDropdown}>
            <div className="user-avatar">
              {/* Random User SVG */}
              <svg width="32" height="32" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="32" cy="32" r="30" stroke="white" strokeWidth="4" />
                <circle cx="32" cy="24" r="10" fill="white" />
                <rect x="16" y="40" width="32" height="16" rx="8" fill="white" />
              </svg>
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
