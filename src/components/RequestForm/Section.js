import React from 'react'

const Section = ({ title, children }) => (
  <div className="flex flex-no-shrink items-center justify-center w-full h-full mt-8 mb-24">
    <div className="flex flex-col items-center">
      <h1 className="mb-16 sm:text-3xl text-xl">{title}</h1>
      {children}
    </div>
  </div>
)
export default Section
