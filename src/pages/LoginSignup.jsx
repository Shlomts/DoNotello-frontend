import {GoogleLogin, useGoogleLogin} from '@react-oauth/google'
import {jwtDecode} from 'jwt-decode'
import {useEffect, useState} from 'react'
import {Outlet, useNavigate} from 'react-router'
import {Login} from './Login'
import {signup} from '../store/actions/user.actions'
import {GoogleIcon} from '../cmps/SvgContainer'
import {Signup} from './Signup'

export function LoginSignup() {
  const [isLogin, setIsLogin] = useState(true)
  const logoUrl = '/imgs/Logo.png'

  const navigate = useNavigate()

  const loginWithGoogle = useGoogleLogin({
    onSuccess: async (response) => {
      try {
        if (!response?.credential) {
          throw new Error('Invalid token')
        }

        const decodedToken = jwtDecode(response.credential)
        console.log(decodedToken)

        const userData = {
          _id: decodedToken.sub,
          fullname: decodedToken.name,
          username: decodedToken.email,
          imgUrl: decodedToken.picture,
        }

        await signup(userData)
        navigate('/board')
      } catch (err) {
        console.error('Signup failed', err)
        alert('Google login failed. Please try again.')
      }
    },
    onError: (err) => {
      console.log('Failed login', err)
    },
    useOneTap: true,
  })

  const handleToggleForm = () => {
    setIsLogin((prev) => !prev)
  }

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-content">
          <div className="page-imgs">
            <div className="login-form-container">
              <section className="main-login-form">
                <div className="form-header">
                  <span className="logo">
                    <img src={logoUrl} alt="DoNotello Logo" />
                  </span>
                  <div className="sub-title">
                    <h5>{isLogin ? 'Log in to continue' : 'Create your account'}</h5>
                  </div>
                </div>
                <div className="form-login-container">{isLogin ? <Login /> : <Signup />}</div>

                {/* <div className="continue-with">
                  <div className="with-google">
                    <button onClick={loginWithGoogle} className="google-btn">
                      <span className="google-icon">
                        <GoogleIcon />
                      </span>
                      <span className="buttonText">Google</span>
                    </button>
                  </div>
                </div> */}

                <div className="create-account">
                  <p onClick={handleToggleForm}>{isLogin ? 'Create an account' : 'Already have an account? Log in'}</p>
                </div>
                <div className="term-service">
                  This site is protected by Google
                  <a
                    href="https://policies.google.com/privacy"
                    target="_blank"
                    rel="noreferrer noopener"
                    className="css-1y8hiba"
                  >
                    Privacy Policy
                  </a>
                  and
                  <a
                    href="https://policies.google.com/terms"
                    target="_blank"
                    rel="noreferrer noopener"
                    className="google-terms"
                  >
                    Terms of Service
                  </a>
                  apply.
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
