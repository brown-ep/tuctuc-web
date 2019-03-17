import React, { useMemo, useEffect, useState } from 'react'
import Section from './Section'
import TimePicker from 'rc-time-picker'
import 'rc-time-picker/assets/index.css'

import DayPickerInput from 'react-day-picker/DayPickerInput'
import 'react-day-picker/lib/style.css'
import moment from 'moment'
import { Input } from '../Form'

const textInputStyle = error =>
  'shadow appearance-none border rounded w-full py-2 my-1 px-3 ' +
  'text-grey-500 leading-tight focus:outline-none focus:shadow-outline ' +
  (error ? 'border-red-400' : 'border-grey-200')

const textInputStyleSm = error =>
  'shadow appearance-none border rounded w-full py-2 my-1 px-3 ' +
  'text-grey-500 leading-tight text-sm focus:outline-none focus:shadow-outline ' +
  (error ? 'border-red-400' : 'border-grey-200')

// const Input = ({ title, value, onChange, type = 'text', ...props } = {}) => (
//   <div className="mb-6">
//     <label
//       htmlFor={title}
//       className="block uppercase tracking-wide text-sm text-grey-400 font-bold mb-2"
//     >
//       {title}
//     </label>
//     <input
//       type={type}
//       name={title}
//       {...props}
//       value={value}
//       onChange={e => onChange(e.target.value)}
//       className={textInputStyle()}
//     />
//   </div>
// )

const DateTimeInput = ({ title, value, onChange, ...props } = {}) => {
  const updateDay = date => {
    const d = new Date(value)
    d.setDate(date.getDate())
    onChange(d)
  }

  const updateTime = date => {
    const d = new Date(value)
    d.setTime(date.getTime())
    onChange(d)
  }

  return (
    <div className="mb-6">
      <label
        htmlFor={title}
        className="block uppercase tracking-wide text-sm text-grey-400 font-bold mb-2"
      >
        {title}
      </label>
      <DayPickerInput
        value={value}
        onDayChange={updateDay}
        classNames={{
          container: textInputStyleSm(),
          overlay: '',
          overlayWrapper:
            'absolute bg-white z-10  shadow border border-grey-200 rounded',
        }}
      />
      <TimePicker
        value={moment(value)}
        onChange={m => updateTime(m.toDate())}
        use12Hours
        showSecond={false}
        className="w-full block shadow my-1 text-lg font-sans appearance-none text-grey-500"
      />
    </div>
  )
}

const TripFields = ({ direction, onChange, value }) => {
  const isDateSupported = () => {
    const input = document.createElement('input')
    const value = 'a'
    input.setAttribute('type', 'datetime-local')
    input.setAttribute('value', value)
    return input.value !== value
  }

  return (
    <section className="outbound mx-4">
      <h2 className="mb-6 text-lg text-grey-700 capitalize">
        {direction} Flight{' '}
        <span role="img" aria-label="takeoff">
          {direction === 'outbound' ? '🛫' : '🛬'}
        </span>
      </h2>
      {isDateSupported() ? (
        <>
          <Input
            type="datetime-local"
            title="Earliest you can leave"
            value={moment(value[direction].earliest).format('YYYY-MM-DDTHH:mm')}
            onChange={earliest =>
              onChange(
                {
                  ...value,
                  [direction]: {
                    ...value[direction],
                    earliest: new Date(earliest),
                  },
                },
                false
              )
            }
          />
          <Input
            type="datetime-local"
            title="Latest you can leave"
            value={moment(value[direction].latest).format('YYYY-MM-DDTHH:mm')}
            onChange={latest =>
              onChange(
                {
                  ...value,
                  [direction]: {
                    ...value[direction],
                    latest: new Date(latest),
                  },
                },
                false
              )
            }
          />
        </>
      ) : (
        <>
          <DateTimeInput
            title="Earliest You can Leave"
            value={value[direction].earliest}
            onChange={earliest =>
              onChange(
                {
                  ...value,
                  [direction]: { ...value[direction], earliest },
                },
                false
              )
            }
          />
          <DateTimeInput
            title="Latest You can Leave"
            value={value[direction].latest}
            onChange={latest =>
              onChange(
                {
                  ...value,
                  [direction]: { ...value.outbound, latest },
                },
                false
              )
            }
          />
        </>
      )}
    </section>
  )
}

const TimeSection = ({ value, onChange, done, back, rootState }) => {
  const titles = {
    in: 'When does your flight land?',
    out: 'When do you have to arrive by?',
    round: 'What are your time constraints?',
  }

  return (
    <Section key="times" title={titles[rootState.direction]}>
      {/* <Wait height={250} width={250} /> */}
      <div className="flex justify-center flex-wrap -m-4">
        {value && value.inbound && value.outbound && (
          <>
            {rootState.direction === 'out' && (
              <TripFields
                direction="outbound"
                onChange={onChange}
                value={value}
              />
            )}
            {rootState.direction === 'in' && (
              <TripFields
                direction="inbound"
                onChange={onChange}
                value={value}
              />
            )}
          </>
        )}
      </div>

      <div className="mt-5">
        <button
          className="text-grey-500 px-4 py-2 bg-grey-050 focus:outline-none mr-5"
          onClick={back}
        >
          <i className="fas fa-arrow-left opacity-50 ml-2" /> Back
        </button>
        <button
          className="text-grey-500 px-4 py-2 bg-grey-050 focus:outline-none"
          onClick={done}
        >
          Next <i className="fas fa-arrow-right opacity-50 ml-2" />
        </button>
      </div>
    </Section>
  )
}

export default TimeSection
