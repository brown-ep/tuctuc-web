import React, { useState } from 'react'
import './App.css'
import RequestForm from './components/RequestForm/RequestForm'

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
  return (
    <div className="bg-white min-h-full relative flex flex-col">
      <Nav />
      <div className="p-4 flex-1 flex flex-col">
        <RequestForm />
      </div>
    </div>
  )
}

export default App
