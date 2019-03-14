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

const Nav = () => (
  <nav className="flex items-center">
    <div className="bg-orange-500 flex-no-shrink w-32 h-32 flex items-center justify-center text-orange-050 text-5xl font-black uppercase mr-6 overflow-hidden">
      Tuc
      <br />
      Tuc
    </div>
    <div className="px-4">
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
    </div>
  </nav>
)

const App = () => {
  useEffect(() => {}, [])
  return (
    <div className="bg-white min-h-full relative flex flex-col">
      <Nav />
      <ToastContainer />
      <div className="p-4 flex-1 flex flex-col">
        <Route path="/" exact component={RequestForm} />
        <Route path="/profile" exact component={Profile} />
        <Route path="/results" exact component={Results} />
      </div>
    </div>
  )
}

const mapDispatch = dispatch => ({
  listen: dispatch.auth.listen,
})

const Connected = connect(
  () => ({}),
  mapDispatch
)(App)

const Wrapped = () => (
  <Provider store={store}>
    <Router>
      <Connected />
    </Router>
  </Provider>
)

export default Wrapped
