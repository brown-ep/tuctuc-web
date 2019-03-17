/* global grecaptcha */

import React, { useState, useLayoutEffect, useEffect } from 'react'
import { Input } from '../components/Form'
import { toast } from 'react-toastify'
import firebase from 'firebase/app'
import 'firebase/auth'

const AuthPage = () => {
  const [step, setStep] = useState(0)
  const [cap, setCap] = useState(null)
  const [id, setId] = useState(null)
  const [code, setCode] = useState('')
  const [phone, setPhone] = useState('')

  useLayoutEffect(() => {
    const recap = (window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
      'recaptcha-container'
    ))

    recap.render().then(setId)
    setCap(recap)
  }, [])

  const submitPhone = () => {
    firebase
      .auth()
      .signInWithPhoneNumber(`+1${phone}`, cap)
      .then(function(confirmationResult) {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        window.confirmationResult = confirmationResult
        setStep(1)
      })
      .catch(function(error) {
        console.error(error)
        // Error; SMS not sent
        toast.error('Could not send text message')
        // Or, if you haven't stored the widget ID:
        grecaptcha.reset(id)
        // ...
      })
  }

  const confirm = () => {
    window.confirmationResult
      .confirm(code)
      .then(result => {
        const user = result.user
        console.log(user)
        console.log('is logged in')
      })
      .catch(() => toast.error('Error confirming'))
  }

  return (
    <div
      key="phone"
      title="Sign in to get your match"
      className="max-w-sm mx-auto"
    >
      <h1 className="mb-10">Login</h1>
      {step === 0 && (
        <div key="number">
          <div className="block ">
            <Input
              title="Phone Number"
              placeholder="Excluding country code"
              type="phone"
              className="text-2xl"
              value={phone}
              onChange={setPhone}
            />
            <div id="recaptcha-container" />
          </div>
          <div className="mt-10">
            <button
              id="sign-in-button"
              className="text-white font-bold rounded-sm px-4 py-2 bg-orange-500 focus:outline-none"
              onClick={submitPhone}
            >
              Verify Phone Number
            </button>
          </div>
        </div>
      )}
      {step === 1 && (
        <div key="verify">
          <div>
            <Input
              title="Verification Code"
              type="number"
              className="text-2xl"
              value={code}
              onChange={setCode}
            />
            <a
              href="#restart"
              className="text-orange-400 text-sm block"
              onClick={e => {
                e.preventDefault()
                setStep(0)
              }}
            >
              Back to Phone Number
            </a>
          </div>
          <div className="mt-10">
            <button
              className="sign-in-button text-white font-bold rounded-sm px-4 py-2 bg-orange-500 focus:outline-none"
              onClick={confirm}
            >
              Login to see Matches
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AuthPage
