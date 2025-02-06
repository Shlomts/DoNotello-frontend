import {useState} from 'react'
import {useNavigate} from 'react-router'

import {signup} from '../store/actions/user.actions'

import {ImgUploader} from '../cmps/ImgUploader'
import {userService} from '../services/user'

export function Signup() {
  const [credentials, setCredentials] = useState(userService.getEmptyUser())
  const [isEmailValid, setIsEmailValid] = useState(true)

  const navigate = useNavigate()

  function clearState() {
    setCredentials(userService.getEmptyUser())
  }

  function handleChange(ev) {
    const type = ev.target.type

    const {name, value} = ev.target
    if (name === 'username') {
      const isValid = /\S+@\S+\.\S+/.test(value)
      setIsEmailValid(isValid)
    }
    setCredentials({...credentials, [name]: value})
  }

  async function onSignup(ev = null) {
    console.log('onSignUp', credentials)
    if (ev) ev.preventDefault()

    if (!credentials.username || !credentials.password || !credentials.fullname) return
    await signup(credentials)
    clearState()
    navigate('/board')
  }

  function onUploaded(imgUrl) {
    setCredentials({...credentials, imgUrl})
  }

  return (
    <form className="signup-form-input-container" onSubmit={onSignup}>
      <div className="input-container">
        <input
          type="text"
          name="nickname"
          value={credentials.nickname || ''}
          placeholder="Enter your nickname"
          onChange={handleChange}
          required
          className="signup-input"
        />
        <input
          type="email"
          name="username"
          value={credentials.username || ''}
          placeholder="Enter your email"
          onChange={handleChange}
          required
          className="signup-email-input"
        />
        <input
          type="text"
          name="fullname"
          value={credentials.fullname}
          placeholder="Fullname"
          onChange={handleChange}
          required
          className="signup-input"
        />
        <input
          type="password"
          name="password"
          value={credentials.password}
          placeholder="Password"
          onChange={handleChange}
          required
        />
      </div>
      <ImgUploader onUploaded={onUploaded} />

      <button className="signup-btn">Signup</button>
    </form>
  )
}
