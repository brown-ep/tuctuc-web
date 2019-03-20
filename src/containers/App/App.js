import React, { useEffect } from 'react'
import './App.css'
import RequestForm from '../../components/RequestForm/RequestForm'
import { connect, Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import store from '../../store/index'
import { Route } from 'react-router'
import { BrowserRouter as Router } from 'react-router-dom'
import Profile from '../../pages/Profile'
import Results from '../../pages/Results'
import { withRouter, Link, Switch } from 'react-router-dom'
import { getPersistor } from '@rematch/persist'
import { PersistGate } from 'redux-persist/lib/integration/react'

import PrivateRoute from '../auth/PrivateRoute'
import NoAuthRoute from '../auth/NoAuthRoute'
import AuthPage from '../../pages/Auth'
import { compose } from 'redux'
import logo from './logo.jpeg'

const persistor = getPersistor()

const Nav = ({ authenticated, logout }) => (
  <nav className="flex sm:items-center items-start px-4 pt-4">
    <Link
      to="/"
      className="no-underline bg-orange-500 flex-no-shrink w-24 h-24 sm:w-32 sm:h-32 flex items-center justify-center text-orange-050 sm:text-5xl text-2xl font-black uppercase mr-6 overflow-hidden"
    >
      <img src={logo} alt="Logo" />
    </Link>
    <div className="sm:px-4 py-4 w-full flex justify-between flex-wrap">
      <section>
        <p className="text-base sm:text-xl font-bold text-grey-600">
          Save $$$ on your ride to/from the airport by carpooling with Brown &
          RISD students
        </p>
        <p className="text-grey-300 mt-2 uppercase tracking-wide font-bold text-xs sm:text-sm leading-tight">
          Sign up and get jet set
        </p>
      </section>
      <section className="text-right my-3">
        <Link
          to="/results"
          className="mr-4 no-underline text-orange-500 font-bold"
        >
          See Matches
        </Link>
        <Link
          to="/"
          className="mr-4 no-underline text-white bg-orange-500 px-3 py-2 rounded shadow"
        >
          Request a Match
        </Link>
        {authenticated && (
          <>
            <a
              href="#logout"
              className="text-grey-500 font-bold no-underline"
              onClick={e => {
                e.preventDefault()
                logout()
              }}
            >
              Logout
            </a>
          </>
        )}
      </section>
    </div>
  </nav>
)

const App = ({ authenticated, listen, logout }) => {
  useEffect(() => {
    listen()
  }, [])

  return (
    <div className="bg-white min-h-full relative flex flex-col">
      <Nav authenticated={authenticated} logout={logout} />
      <ToastContainer />
      <div className="p-4 flex-1 flex flex-col">
        <Switch>
          <Route path="/" exact component={RequestForm} />
          <PrivateRoute path="/profile" exact component={Profile} />
          <PrivateRoute path="/results" exact component={Results} />
          <NoAuthRoute
            authenticated={authenticated}
            path="/login"
            exact
            component={AuthPage}
          />
        </Switch>
      </div>
    </div>
  )
}

const mapDispatch = dispatch => ({
  listen: dispatch.auth.listen,
  logout: dispatch.auth.logout,
})

const Connected = compose(
  withRouter,
  connect(
    state => ({ authenticated: state.auth.authenticated }),
    mapDispatch
  )
)(App)

const Wrapped = () => (
  <PersistGate persistor={persistor}>
    <Provider store={store}>
      <Router>
        <Connected />
      </Router>
    </Provider>
  </PersistGate>
)

export default Wrapped
