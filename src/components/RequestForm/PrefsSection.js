import React from 'react'
import { ReactComponent as Settings } from '../..//media/undraw_personal_settings_kihd.svg'
import Section from './Section'

const Group = ({ title, value, onChange, children, ...props } = {}) => (
  <div className="mb-6 mx-6">
    <label
      htmlFor={title}
      className="block uppercase tracking-wide text-sm text-grey-400 font-bold mb-2"
    >
      {title}
    </label>
    {children}
  </div>
)

const PrefsSection = ({ value, onChange, done, back, rootState }) => {
  return (
    <Section title="Any prefrences?">
      {/* <Settings height={250} width={250} /> */}
      <div className="flex justify-center flex-wrap ">
        <Group title="Same-gender ride?">
          <select name="gender">
            <option value="none">No Preference</option>
            <option value="female">Female</option>
            <option value="male">Male</option>
          </select>
        </Group>

        <Group title="How talkative are you?">
          <select name="talking">
            <option value="none">No Preference</option>
            <option value="female">Please don't speak to me</option>
            <option value="male">Love to chat</option>
          </select>
        </Group>
      </div>

      <div className="mt-5">
        <button
          className="text-grey-500 px-4 py-2 bg-grey-050 focus:outline-none mr-5"
          onClick={back}
        >
          <i className="fas fa-arrow-left opacity-50 ml-2" /> Back
        </button>
        <button
          className="text-white font-bold rounded-sm px-4 py-2 bg-orange-500 focus:outline-none"
          onClick={done}
        >
          Find my Ride <i className="fas fa-plane-departure opacity-50 ml-2" />
        </button>
      </div>
    </Section>
  )
}

export default PrefsSection
