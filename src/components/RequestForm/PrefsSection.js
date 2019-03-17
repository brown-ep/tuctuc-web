/* global grecaptcha */

import React, { useState, useLayoutEffect, useEffect } from 'react'
import Section from './Section'
import { Input } from '../Form'
import { toast } from 'react-toastify'
import firebase from 'firebase/app'
import 'firebase/auth'

const PhoneSection = ({ value, onChange, done, back, rootState }) => {
  const [step, setStep] = useState(0)
  const [cap, setCap] = useState(null)
  const [id, setId] = useState(null)
  const [code, setCode] = useState('')

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
      .signInWithPhoneNumber(`+1${value.phone}`, cap)
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

  useEffect(() => {
    if (!!value.uid) {
      done()
    }
  }, [value.uid])

  const confirm = () => {
    window.confirmationResult
      .confirm(code)
      .then(result => {
        const user = result.user
        console.log(user)
        onChange({ ...value, uid: user.uid })
      })
      .catch(() => toast.error('Error confirming'))
  }

  return (
    <Section key="phone" title="Sign in to get your match">
      {step === 0 && (
        <div key="number">
          <div className="block ">
            <Input
              title="Name"
              type="text"
              className="text-2xl"
              value={value.name}
              onChange={name => onChange({ ...value, name })}
            />
            <Input
              title="Phone Number"
              placeholder="Excluding country code"
              type="phone"
              className="text-2xl"
              value={value.phone}
              onChange={phone => onChange({ ...value, phone })}
            />
            <div id="recaptcha-container" />
          </div>
          <div className="mt-10">
            <button
              className="text-grey-500 px-4 py-2 bg-grey-050 focus:outline-none mr-5"
              onClick={back}
            >
              <i className="fas fa-arrow-left opacity-50 ml-2" /> Back
            </button>
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
              className="text-grey-500 px-4 py-2 bg-grey-050 focus:outline-none mr-5"
              onClick={back}
            >
              <i className="fas fa-arrow-left opacity-50 ml-2" /> Back
            </button>
            <button
              className="sign-in-button text-white font-bold rounded-sm px-4 py-2 bg-orange-500 focus:outline-none"
              onClick={confirm}
            >
              Find my Ride{' '}
              <i className="fas fa-plane-departure opacity-50 ml-2" />
            </button>
          </div>
        </div>
      )}
    </Section>
  )
}

export default PhoneSection
