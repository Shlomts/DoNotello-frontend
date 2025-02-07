import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'

import { login, loadUsers } from '../store/actions/user.actions'
import { useSelector } from 'react-redux'
import { EditMail } from '../cmps/SvgContainer'

export function Login() {

  const [users, setUsers] = useState([])
  const [credentials, setCredentials] = useState({ username: '', password: '' })
  const [userExists, setUserExists] = useState(false)
  const [isEditingEmail, setIsEditingEmail] = useState(true)
  const [isEmailValid, setIsEmailValid] = useState(true)
  const [isEmailConfirmed, setIsEmailConfirmed] = useState(false)

  const navigate = useNavigate()

  useEffect(() => {
    loadUsers()
  }, [])

  async function loadUsers() {
    const users = await userService.getUsers()
    setUsers(users)
  }

  async function onLogin(ev = null) {
    if (ev) ev.preventDefault()

    if (!isEmailConfirmed) {
      const userFound = users.some(user => user.username === credentials.username)
      if (!credentials.username || !isEmailValid || !userFound) return
      setIsEmailConfirmed(true)
      setIsEditingEmail(false)
    } else {
      if (!credentials.password) return

      try {
        await login(credentials)
        navigate('/board')
      } catch (err) {
        console.error('incorrect password', err)
      }
    }
  }

  function handleChange(ev) {
    const { name, value } = ev.target
    console.log(name, value)

    if (name === 'email') {
      const isValid = /\S+@\S+\.\S+/.test(value)
      setIsEmailValid(isValid || value === '')
      const userFound = users.some(user => user.username === value)
      setIsEmailConfirmed(userFound)
    }
    setCredentials((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <form className="login-form-input-container" onSubmit={onLogin}>
      <div className="input-container">
        <div className="email-container">
          {isEmailConfirmed && !isEditingEmail ? (
            <div className="email-content">
              <span className="user-mail" onClick={() => setIsEditingEmail(true)}>
                {credentials.email}
              </span>
              <span className="edit-icon" onClick={() => setIsEditingEmail(true)}>
                <EditMail style={{ color: 'rgb(66, 82, 110)' }} />
              </span>
            </div>
          ) : (
            <input
              className={!isEmailValid ? 'invalid email-input' : 'email-input'}
              type="username"
              name="username"
              placeholder="Enter your email"
              value={credentials.username || ''}
              onChange={handleChange}
              onBlur={() => isEmailConfirmed && setIsEditingEmail(false)}
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
