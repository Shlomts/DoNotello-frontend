import {useState, useEffect} from 'react'
import {useNavigate} from 'react-router'

import {login, loadUsers} from '../store/actions/user.actions'
import {useSelector} from 'react-redux'
import {EditMail} from '../cmps/svgContainer'

export function Login() {
  // const [users, setUsers] = useState([])
  const users = useSelector((storeState) => storeState.userModule.users)

  const [credentials, setCredentials] = useState({username: '', password: '', fullname: ''})
  const [userExists, setUserExists] = useState(false)
  const [isEditingEmail, setIsEditingEmail] = useState(true)
  const [isEmailValid, setIsEmailValid] = useState(true)
  const [isEmailConfirmed, setIsEmailConfirmed] = useState(false)

  const navigate = useNavigate()
  // console.log(users)

  // useEffect(() => {
  //   bringUsers()
  // }, [])

  // async function bringUsers() {
  //   const users = await loadUsers()

  //   setUsers(users)

  // }

  async function onLogin(ev = null) {
    if (ev) ev.preventDefault()

    if (!isEmailConfirmed) {
      // Validate email before confirming
      if (!credentials.username || !isEmailValid) return
      setIsEmailConfirmed(true)
      setIsEditingEmail(false)
    } else {
      // Handle login with confirmed email
      if (!credentials.password) return // Ensure password is filled
      await login(credentials)
      navigate('/board')
    }
  }

  function handleChange(ev) {
    const {name, value} = ev.target

    if (name === 'username') {
      const isValid = /\S+@\S+\.\S+/.test(value)
      setIsEmailValid(isValid || value === '')
      // const userFound = users.some((user) => user.email === value )
      setUserExists(isValid && value !== '')
    }
    // setCredentials({ ...credentials, [field]: value })
    setCredentials((prev) => ({...prev, [name]: value}))
  }

  return (
    <form className="login-form-input-container" onSubmit={onLogin}>
      <div className="input-container">
        <div className="email-container">
          {isEmailConfirmed && !isEditingEmail ? (
            <div className="email-content">
              <span className="user-mail" onClick={() => setIsEditingEmail(true)}>
                {credentials.username}
              </span>
              <span className="edit-icon" onClick={() => setIsEditingEmail(true)}>
                <EditMail style={{color: 'rgb(66, 82, 110)'}} />
              </span>
            </div>
          ) : (
            <input
              className={!isEmailValid ? 'invalid email-input' : 'email-input'}
              type="email"
              name="username"
              placeholder="Enter your email"
              value={credentials.username || ''}
              onChange={handleChange}
              onBlur={() => userExists && setIsEditingEmail(false)} // Switch to span on blur
              required
              autoComplete="on"
            />
          )}
          {!isEmailValid && <span className="error-message">Enter a valid email address</span>}
        </div>

        {isEmailConfirmed && (
          <div className="user-password">
            <input
              className="password-input"
              type="password"
              name="password"
              placeholder="Enter your password"
              value={credentials.password || ''}
              onChange={handleChange}
              required
            />
          </div>
        )}
      </div>
      <button className="login-btn">
        <span>{isEmailConfirmed ? 'Log in' : 'Continue'}</span>
      </button>
    </form>
  )
}
