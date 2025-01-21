import {GoogleLogin} from '@react-oauth/google'
import {jwtDecode} from 'jwt-decode'
import {useEffect} from 'react'
import {Outlet, useNavigate} from 'react-router'
import {Login} from './Login'

export function LoginSignup() {
  const logoUrl = '/imgs/Logo.png'
  const rightLoginImg = '/imgs/Right-img-login.png'
  const leftLoginImg = '/imgs/Left-img-login.png'

  const navigate = useNavigate()

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-content">
          <div className="page-imgs">
            {/* <img src={rightLoginImg} alt="right-login" className="right-login" />
            <img src={leftLoginImg} alt="left-login" className="left-login" /> */}
            <div className="login-form-container">
              <section className="main-login-form">
                <div className="form-header">
                  <span className="logo">
                    <img src={logoUrl} alt="DoNotello Logo" />
                  </span>
                  <div className="sub-title">
                    <h5>Log in to continue</h5>
                  </div>
                </div>
                <div className="form-login-container">
                  <Login />
                </div>

                <div className="continue-with">
                  <GoogleLogin
                    onSuccess={(CredentialResponse) => {
                      const decodedToken = jwtDecode(CredentialResponse.credential)
                      console.log(decodedToken) // Check the full decoded JWT structure
                      navigate('/board')
                    }}
                    onError={() => console.log('Faild login')}
                  />
                </div>

                <div className="create-account">
                  <p>Create an account</p>
                </div>
                <div className="term-service">
                  This site is protected by Google
                  <a
                    href="https://policies.google.com/privacy"
                    target="_blank"
                    rel="noreferrer noopener"
                    class="css-1y8hiba"
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
