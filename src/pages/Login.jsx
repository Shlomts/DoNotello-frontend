import {useState, useEffect} from 'react'
import {useNavigate} from 'react-router'

import {userService} from '../services/user'
import {login} from '../store/actions/user.actions'

export function Login() {
  const [users, setUsers] = useState([])
  const [credentials, setCredentials] = useState({username: '', password: '', fullname: ''})
  const [userExists, setUserExists] = useState(true)
  const [isEmailValid, setIsEmailValid] = useState(true)

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
      const userFound = users.some((user) => user.email === value)
      setUserExists(userFound)
    }
    // setCredentials({ ...credentials, [field]: value })
  }

  return (
    <form className="login-form-input-container" onSubmit={onLogin}>
      <div className="input-container">
        <input
          className={!isEmailValid ? 'invalid email-input' : 'email-input'}
          type="email"
          name="email"
          placeholder="Enter your email"
          value={credentials.email}
          onChange={handleChange}
          required
        />
        {!isEmailValid && <span className="error-message">Enter a valid email address</span>}
      </div>
      {userExists && (
        <input
          className="password-input"
          type="password"
          name="password"
          placeholder="Enter your password"
          value={credentials.password}
          onChange={handleChange}
          required
        />
      )}{' '}
      <button>{userExists ? 'Log in' : 'Continue'}</button>
    </form>
  )
}
