import React from 'react'
import { ReactComponent as Wait } from '../..//media/undraw_subway_7vh7.svg'
import Section from './Section'

const Input = ({ title, value, onChange, type = 'text', ...props } = {}) => (
  <div className="mb-6">
    <label
      htmlFor={title}
      className="block uppercase tracking-wide text-sm text-grey-400 font-bold mb-2"
    >
      {title}
    </label>
    <input
      type={type}
      name={title}
      {...props}
      value={value}
      onChange={onChange}
      className="block bg-grey-050 px-4 py-2 text-xl focus:outline-none"
    />
  </div>
)

const TimeSection = ({ value, onChange, done, back, rootState }) => {
  const titles = {
    in: 'When does your flight land?',
    out: 'When do you have to arrive by?',
    round: 'What are your time constraints?',
  }

  const Outbound = () => (
    <section className="outbound mx-4">
      <h2 className="mb-6 text-lg text-grey-700">
        Outbound Flight{' '}
        <span role="img" aria-label="takeoff">
          🛫
        </span>
      </h2>
      <Input type="date" title="Date" />
      <Input type="time" title="Latest Airport Arrival Time" />
    </section>
  )

  const Inbound = () => (
    <section className="inbound mx-4">
      <h2 className="mb-6 text-lg text-grey-700">
        Inbound Flight{' '}
        <span role="img" aria-label="landing">
          🛬
        </span>
      </h2>
      <Input type="date" title="Landing Date" />
      <Input type="time" title="Landing Time" />
    </section>
  )
  return (
    <Section title={titles[rootState.direction]}>
      {/* <Wait height={250} width={250} /> */}
      <div className="flex justify-center flex-wrap -m-4">
        {!(rootState.direction === 'in') && <Outbound />}
        {!(rootState.direction === 'out') && <Inbound />}
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
