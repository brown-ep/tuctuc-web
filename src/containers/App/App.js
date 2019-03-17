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
import Redirect from 'react-router/Redirect'

const persistor = getPersistor()

const Nav = ({ authenticated, logout }) => (
  <nav className="flex items-center">
    <div className="bg-orange-500 flex-no-shrink w-32 h-32 flex items-center justify-center text-orange-050 text-5xl font-black uppercase mr-6 overflow-hidden">
      Tuc
      <br />
      Tuc
    </div>
    <div className="px-4 w-full flex justify-between flex-wrap">
      <section>
        <p className="text-xl font-bold text-grey-600">
          Save{' '}
          <span role="img" aria-label="money" className="-ml-1">
            💰
          </span>
          to and from the airport carpooling with Brown & RISD students
        </p>
        <p className="text-grey-300 mt-2 uppercase tracking-wide font-bold text-sm">
          Sign up and get a match within 48 hours of your trip
        </p>
      </section>
      <section className="text-right">
        <Link to="/results" className="mr-4 no-underline text-orange-600">
          See Matches
        </Link>
        <Link to="/" className="mr-4 no-underline text-orange-600">
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
