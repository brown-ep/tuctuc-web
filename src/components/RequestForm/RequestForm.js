import React, { useState } from 'react'
import { useTransition, animated } from 'react-spring'

import DirectionSection from './DirectionSection'
import AirportSection from './AirportSection'
import TimeSection from './TimeSection'
import PrefsSection from './PrefsSection'

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
  const [form, setForm] = useState({
    direction: '',
    airport: '',
    times: '',
    phone: '',
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
        return true
      default:
        break
    }
    return false
  }

  const submit = () => {
    console.log(form)
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
              onChange={(val, next = true) => {
                if ((next && !form[step.name]) || form[step.name] === '')
                  nextStep()
                setForm({ ...form, [step.name]: val })
              }}
              done={() => {
                if (nextStep()) {
                  submit()
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
