import React from 'react'
import ReactDOM from 'react-dom/client'

import {BrowserRouter as Router} from 'react-router-dom'
import {Provider} from 'react-redux'
import {GoogleOAuthProvider} from '@react-oauth/google'

import * as serviceWorkerRegistration from './serviceWorkerRegistration'

import {store} from './store/store'
import {RootCmp} from './RootCmp'

import 'bootstrap/dist/css/bootstrap.min.css'
import './assets/styles/main.scss'
const CLIENT_ID = '491690901077-bkjls46h24fercdsqa4jn42pft08sepn.apps.googleusercontent.com'
const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <Provider store={store}>
    <Router>
      <GoogleOAuthProvider clientId={CLIENT_ID}>
        <RootCmp />
      </GoogleOAuthProvider>
    </Router>
  </Provider>
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register()
