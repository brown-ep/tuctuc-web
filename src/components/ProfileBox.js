import React from 'react'

const ProfileBox = ({ name, propic }) => (
  <div class="mb-10 max-w-sm rounded overflow-hidden shadow-lg">
    <img class="w-full" src={propic} alt="Sunset in the mountains"/>
    <div class="flex flex-col px-6 py-4">
      <p class="flex font-bold self-center text-xl mb-2">{name}</p>
    </div>
  </div>
)
export default ProfileBox