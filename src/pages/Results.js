import React from 'react'
import Section from '../components/RequestForm/Section'
import ProfileBox from '../components/ProfileBox'

const Results = () => {
  return (
    <Section title="Here are your fellow riders:">
      <ProfileBox name="Person 1" propic="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"/>
      <ProfileBox name="Person 2" propic="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"/>
      <ProfileBox name="Person 3" propic="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"/>
      <ProfileBox name="Person 4" propic="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"/>
    </Section>
  )
}

export default Results