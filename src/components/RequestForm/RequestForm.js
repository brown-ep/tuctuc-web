import React, { useState } from 'react'
import { useTransition, animated } from 'react-spring'

import DirectionSection from './DirectionSection'
import AirportSection from './AirportSection'
import TimeSection from './TimeSection'
import PrefsSection from './PrefsSection'

import moment from 'moment'

import firebase from 'firebase/app'
import 'firebase/firestore'
import { Redirect } from 'react-router-dom'

const steps = {
  direction: DirectionSection,
  airport: AirportSection,
  times: TimeSection,
  phone: PrefsSection,
}

const useSteps = initial => {
  const [step, setStep] = useState({ name: initial, dir: 1 })
  const [history, setHistory] = useState([initial])

  const next = to => {
    if (to === step) return
    setStep({ name: to, dir: 1 })
    setHistory([...history, to])
  }

  const back = () => {
    if (history.length <= 1) return
    const prev = history[history.length - 2]
    setStep({ name: prev, dir: -1 })
    setHistory(history.slice(0, -1))
  }

  return [step, next, back]
}

const RequestForm = () => {
  const [success, setSuccess] = useState(false)

  const start = moment(new Date())
  start.set({ minute: 0, second: 0, hour: 12 })
  const end = moment(start).add('3', 'hours')

  const [form, setForm] = useState({
    direction: '',
    airport: '',
    times: {
      outbound: {
        earliest: start.toDate(),
        latest: end.toDate(),
      },
      inbound: { earliest: start.toDate(), latest: end.toDate() },
    },
    phone: {
      phone: '',
      name: '',
      uid: '',
    },
  })

  const sign = n => (n >= 0 ? '' : '-')

  const [step, next, back] = useSteps('airport')
  const transitions = useTransition(step, step.name, {
    from: {
      transform: `translate3d(${sign(step.dir)}30%,0,0)`,
      opacity: 0,
      position: 'absolute',
    },
    enter: {
      transform: `translate3d(0,0px,0)`,
      opacity: 1,
      position: 'relative',
    },
    leave: {
      transform: `translate3d(${sign(-step.dir)}30%,0,0)`,
      opacity: 0,
      position: 'absolute',
    },
  })

  const nextStep = () => {
    console.log(`getting next for ${step.name}`)
    switch (step.name) {
      case 'airport':
        next('direction')
        break
      case 'direction':
        next('times')
        break
      case 'times':
        next('phone')
        break
      case 'phone':
        // console.log('submitting')
        submit()
        return true
      default:
        break
    }
    return false
  }

  const toFBDoc = dir => {
    const dirKey = dir === 'in' ? 'inbound' : 'outbound'
    return {
      phone: form.phone.phone,
      name: form.phone.name,
      uid: form.phone.uid,
      to: dir === 'in' ? 'BROWN' : form.airport,
      from: dir === 'in' ? form.airport : 'BROWN',
      earliest: form.times[dirKey].earliest,
      latest: form.times[dirKey].latest,
    }
  }

  const submit = async () => {
    const promises = []
    if (form.direction === 'round' || form.direction === 'in') {
      const body = toFBDoc('in')
      console.log('INBOUND: ')
      console.log(body)
      promises.push(
        firebase
          .firestore()
          .collection('trips')
          .add(body)
      )
    }

    if (form.direction === 'round' || form.direction === 'out') {
      const body = toFBDoc('out')
      console.log('OUTBOUND: ')
      console.log(body)
      promises.push(
        firebase
          .firestore()
          .collection('trips')
          .add(body)
      )
    }

    const docs = await Promise.all(promises)
    console.log(docs)
    setSuccess(true)
  }

  if (success) {
    return <Redirect to="/results" />
  }

  return (
    <div className="min-h-full flex items-start flex-no-wrap flex-1 relative">
      {transitions.map(({ item, props, key }) => {
        const CurrentStep = steps[item.name]
        return (
          <animated.div
            key={key}
            style={{
              ...props,
              width: '100%',
            }}
          >
            <CurrentStep
              value={form[step.name]}
              rootState={form}
              key={key}
              onChange={(val, next = false) => {
                if ((next && !form[step.name]) || form[step.name] === '') {
                  nextStep()
                }
                setForm({ ...form, [step.name]: val })
              }}
              done={() => {
                console.log('done called')
                if (nextStep()) {
                  // submit()
                }
              }}
              back={back}
            />
          </animated.div>
        )
      })}
    </div>
  )
}

export default RequestForm
