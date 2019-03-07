import React from 'react'

const Section = ({ title, children }) => (
  <div className="flex flex-no-shrink items-center justify-center w-full h-full my-8">
    <div className="flex flex-col items-center">
      <h1 className="mb-16">{title}</h1>
      {children}
    </div>
  </div>
)
export default Section
