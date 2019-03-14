import React from 'react'
import BigButton from './BigButton'
import Section from './Section'

const DirectionSection = ({ value, onChange, back, done }) => {
  const dirs = { in: 'in', out: 'out', round: 'round' }

  return (
    <Section key="dir" title="Where are you going?">
      {/* <Car height={250} width={250} /> */}
      <div className="flex justify-center flex-wrap">
        <BigButton
          onClick={() => onChange(dirs.out)}
          selected={value === dirs.out}
        >
          School{' '}
          <span role="img" aria-label="to">
            ➡️
          </span>{' '}
          Airport
        </BigButton>
        <BigButton
          onClick={() => onChange(dirs.in)}
          selected={value === dirs.in}
        >
          Airport{' '}
          <span role="img" aria-label="to">
            ➡️
          </span>{' '}
          School
        </BigButton>
        <BigButton
          onClick={() => onChange(dirs.round)}
          selected={value === dirs.round}
        >
          <span role="img" aria-label="to">
            🔁
          </span>{' '}
          Round Trip
        </BigButton>
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

export default DirectionSection
