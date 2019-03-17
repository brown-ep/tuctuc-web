import React from 'react'

const ProfileBox = ({ name, propic }) => (
  <div className="mb-10 max-w-sm rounded overflow-hidden shadow-lg">
    <img className="w-full" src={propic} alt="Sunset in the mountains" />
    <div className="flex flex-col px-6 py-4">
      <p className="flex font-bold self-center text-xl mb-2">{name}</p>
    </div>
  </div>
)
export default ProfileBox
