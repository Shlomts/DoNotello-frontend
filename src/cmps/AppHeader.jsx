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
        <NavLink to="/board" className="logo">
        <div className="logo-container">
            {/* <svg
              width="24"
              height="24"
              role="presentation"
              focusable="false"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12.0254 3C9.25613 3 7.01123 5.23858 7.01123 8C7.01123 10.7614 9.25613 13 12.0254 13C14.7946 13 17.0395 10.7614 17.0395 8C17.0395 5.23858 14.7946 3 12.0254 3ZM9.01688 8C9.01688 9.65685 10.3638 11 12.0254 11C13.6869 11 15.0338 9.65685 15.0338 8C15.0338 6.34315 13.6869 5 12.0254 5C10.3638 5 9.01688 6.34315 9.01688 8Z"
                fill="currentColor"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12.0254 11C16.7803 11 20.6765 14.6667 21.0254 19.3194C20.8721 20.2721 20.0439 21 19.0452 21H18.9741C18.9741 21 18.9741 21 18.9741 21L5.0767 21C5.07671 21 5.0767 21 5.0767 21L5.00562 21C4.00691 21 3.1787 20.2721 3.02539 19.3193C3.37428 14.6667 7.27038 11 12.0254 11ZM5.0767 19H18.9741C18.4875 15.6077 15.5618 13 12.0254 13C8.48892 13 5.56331 15.6077 5.0767 19ZM19.0451 19.9769V20.0231C19.0452 20.0154 19.0452 20.0077 19.0452 20C19.0452 19.9923 19.0452 19.9846 19.0451 19.9769Z"
                fill="currentColor"
              />
            </svg> */}

            <span className="logo-text">DoNotello</span>
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
