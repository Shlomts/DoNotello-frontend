import {Link, NavLink} from 'react-router-dom'
import {useNavigate} from 'react-router'
import {useSelector} from 'react-redux'
import {logout} from '../store/actions/user.actions'
import {useState} from 'react'
import {AddBoard} from './board/AddBoard'
import {onToggleModal} from '../store/actions/system.actions'
import {Members} from './SvgContainer'
import {googleLogout} from '@react-oauth/google'
import {Avatar} from '@mui/material'

export function AppHeader() {
  const user = useSelector((storeState) => storeState.userModule.user)
  const navigate = useNavigate()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const logoUrl = '/imgs/Logo.png'

  async function onLogout() {
    try {
      await logout()
      googleLogout()
      navigate('/login')
    } catch (err) {
      console.error('Cannot log in')
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
            <img src={logoUrl} alt="DoNotello Logo" />
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
            <div className="user-img">
              <img src={user.imgUrl} alt="" />
            </div>
            {isDropdownOpen && (
              <ul className="user-dropdown">
                <li className="account">
                  <h2>Account</h2>
                  <div className="user-container">
                    <span className="user-avatar">
                      <Avatar src={user.imgUrl} alt={user.fullname} className="avatar" />
                    </span>
                    <div className="user-info-dropdown">
                      <div className="user-name">{user.fullname} </div>
                      <div className="user-email">{user.username}</div>
                    </div>
                  </div>
                </li>
                {/* <li>
                  <Link to={`user/${user._id}`}>Profile and visibility</Link>
                </li>
                <li>
                  <Link to="/activity">Activity</Link>
                </li> */}
                <li className="log-out">
                  <span onClick={onLogout}>Log out</span>
                </li>
              </ul>
            )}
          </div>
        )}
      </nav>
    </header>
  )
}
