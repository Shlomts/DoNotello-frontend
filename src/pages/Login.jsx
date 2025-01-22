import {useState, useEffect} from 'react'
import {useNavigate} from 'react-router'

import {userService} from '../services/user'
import {login, loadUsers} from '../store/actions/user.actions'
import {useSelector} from 'react-redux'

export function Login() {
  // const [users, setUsers] = useState([])
  const users = useSelector((storeState) => storeState.userModule.users)

  const [credentials, setCredentials] = useState({username: '', password: '', fullname: ''})
  const [userExists, setUserExists] = useState(false)
  const [isEditingEmail, setIsEditingEmail] = useState(true)
  const [isEmailValid, setIsEmailValid] = useState(true)

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

    // Dont forget to add this after tsting
    // || !credentials.password
    if (!credentials.email || !isEmailValid) return
    await login(credentials)
    navigate('/board')
  }

  function handleChange(ev) {
    const {name, value} = ev.target
    setCredentials((prev) => ({...prev, [name]: value}))

    if (name === 'email') {
      const isValid = /\S+@\S+\.\S+/.test(value)
      setIsEmailValid(isValid || value === '')
      // const userFound = users.some((user) => user.email === value )
      setUserExists(isValid && value !== '')
    }
    // setCredentials({ ...credentials, [field]: value })
  }

  return (
    <form className="login-form-input-container" onSubmit={onLogin}>
      <div className="input-container">
        <div className="emil-container">
          {userExists && !isEditingEmail ? (
            <span className="user-mail" onClick={() => setIsEditingEmail(false)}>
              {credentials.email}
            </span>
          ) : (
            <input
              className={!isEmailValid ? 'invalid email-input' : 'email-input'}
              type="email"
              name="email"
              placeholder="Enter your email"
              value={credentials.email || ''}
              onChange={handleChange}
              onBlur={() => userExists && setIsEditingEmail(true)} // Switch to span on blur
              required
            />
          )}
          {!isEmailValid && <span className="error-message">Enter a valid email address</span>}
        </div>
      </div>
      {userExists && (
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
      )}{' '}
      <button className="login-btn">{userExists ? 'Log in' : 'Continue'}</button>
    </form>
  )
}
