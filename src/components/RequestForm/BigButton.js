import React from 'react'

const BigButton = ({ children, value, onClick, selected }) => (
  <button
    className={
      'px-10 py-4 bg-grey-050 border-2 border-grey-100 rounded-sm m-4 ' +
      ' text-xl text-grey-700 font-bold focus:outline-none ' +
      (selected ? 'border-orange-300 text-orange-500' : '')
    }
    onClick={() => onClick(value)}
  >
    {children}
  </button>
)
export default BigButton
