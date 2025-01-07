import React from 'react'
import {Link, NavLink} from 'react-router-dom'

export function HomePage() {
  return (
    <section className="home-page">
        <header className="home-app-header full">
          <nav>
            <NavLink to="/" className="logo">
              DoNote~llo
            </NavLink>

            <NavLink to="login" className="login-link">
              Log in
            </NavLink>

            <button className="demo-btn">Try Our Demo!</button>
          </nav>
      </header>
      <div className="space"></div>
      <div className="content">
        <div className="description">
          <h1>DoNotello brings all your tasks, teammates, and tools together</h1>
          <p>Keep everything in the same place—even if your team isn’t.</p>
          {/* here need to link to demo board */}
          <button className="demo-btn">Try Our Demo!</button>
        </div>

        <div className="image-section">
          <img src="https://merllo-0m15.onrender.com/assets/TrelloUICollage_4x.193e8069.webp" alt="Merllo UI Preview" />
        </div>

        <div className="space"></div>
        <div className="wave">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <path
              fill="#ffffff"
              fillOpacity="1"
              d="M0,224L48,213.3C96,203,192,181,288,192C384,203,480,245,576,240C672,235,768,181,864,165.3C960,149,1056,171,1152,176C1248,181,1344,171,1392,165.3L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            ></path>
          </svg>
        </div>
      </div>
    </section>
  )
}
