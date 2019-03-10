import React from 'react'
import BigButton from './BigButton'
import Section from './Section'

const AirportSection = ({ value, onChange, done, back }) => {
  return (
    <Section title="What airport are you going to?">
      {/* <Plane height={250} width={250} /> */}
      <div className="flex justify-center flex-wrap">
        <BigButton
          onClick={() => onChange('green')}
          selected={value === 'green'}
        >
          TF Green (PVD)
        </BigButton>
        <BigButton
          onClick={() => onChange('logan')}
          selected={value === 'logan'}
        >
          Boston Logan (BOS)
        </BigButton>
      </div>
      <div className="mt-5">
        {/* <button
          className="text-grey-500 px-4 py-2 bg-grey-050 focus:outline-none mr-5"
          onClick={back}
        >
          <i className="fas fa-arrow-left opacity-50 ml-2" /> Back
        </button> */}
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

export default AirportSection
