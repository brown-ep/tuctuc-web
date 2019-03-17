import React, { useEffect, useState } from 'react'
import Section from '../components/RequestForm/Section'
import ProfileBox from '../components/ProfileBox'
import { connect } from 'react-redux'
import firebase from 'firebase/app'
import 'firebase/firestore'
import moment from 'moment'
import { parsePhoneNumberFromString } from 'libphonenumber-js'

const Results = ({ loadMatches, uid }) => {
  const [user, setUser] = useState(null)
  useEffect(() => {
    const unsub = firebase
      .firestore()
      .collection('users')
      .doc(uid)
      .onSnapshot(doc => {
        const data = doc.data()

        const promises = []
        const trips = []
        data.trips.forEach(trip =>
          promises.push(
            trip.get().then(doc => trips.push({ id: doc.id, ...doc.data() }))
          )
        )

        const matches = []
        data.matches.forEach(match => {
          promises.push(
            match.get().then(async doc => {
              const matchTrips = []
              const subPromises = []
              doc.data().trips.forEach(trip => {
                subPromises.push(
                  trip
                    .get()
                    .then(doc => matchTrips.push({ id: doc.id, ...doc.data() }))
                )
              })
              await Promise.all(subPromises)
              matches.push({ id: doc.id, ...doc.data(), trips: matchTrips })
            })
          )
        })

        Promise.all(promises).then(() =>
          setUser({ id: doc.id, trips, matches })
        )
      })
    return unsub
  }, [])

  useEffect(() => {
    console.log(user)
  }, [user])

  if (!user) return <div className="max-w-md mx-auto">Loading...</div>

  const formatLocation = key => {
    const opts = {
      BOS: 'Boston Logan',
      PVD: 'Providence T.F. Green',
      BROWN: 'Brown',
    }
    return opts[key]
  }

  const date = d => moment(d.toDate()).format('MMMM Do YYYY [at] h:mm a')

  const Date = ({ earliest, latest }) => {
    const start = earliest.toDate()
    const end = latest.toDate()

    if (start.getDate() === end.getDate()) {
      return (
        <div className="text-grey-600">
          <strong>{moment(start).format('MMMM Do')}</strong> between{' '}
          <strong>{moment(start).format('h:mm a')}</strong> and{' '}
          <strong>{moment(end).format('h:mm a')}</strong>
        </div>
      )
    }

    return (
      <div className="text-grey-600">
        Between <strong>{moment(start).format('MMMM Do [at] h:mm a')}</strong>{' '}
        and <strong>{moment(end).format('MMMM Do [at] h:mm a')}</strong>
      </div>
    )
  }

  const formatPhone = p => {
    const parsed = parsePhoneNumberFromString('+1' + p)
    if (!parsed) return p
    return parsed.formatNational()
  }

  return (
    <div className="container mx-auto text-left">
      <div className="max-w-md mx-auto">
        <h1 className="mb-4">Your Matches</h1>
        <section>
          {user.matches.map(match => (
            <div
              key={match.id}
              className="bg-white border border-grey-100 p-4 rounded  my-6"
            >
              <p className="uppercase text-lg font-bold text-orange-500 mb-2 tracking-wide">
                {formatLocation(match.from)} to {formatLocation(match.to)}
              </p>
              <div>
                <Date earliest={match.earliest} latest={match.latest} />
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide text-grey-400 font-bold mt-6 mb-2">
                  With
                </p>
                {match.trips.map(trip => (
                  <div key={trip.id}>
                    <div className="my-2">
                      <p className="text-grey-600 inline-block">{trip.name}</p>{' '}
                      <a
                        href={`sms:${trip.phone}`}
                        className="text-grey-300 inline-block"
                      >
                        {formatPhone(trip.phone)}
                      </a>
                    </div>
                  </div>
                ))}
              </div>
              <div className="my-4">
                <a
                  href={
                    'sms:/open?addresses=' +
                    match.trips.map(t => t.phone).join(',')
                  }
                  className="bg-orange-050 text-orange-600 font-bold block p-4 text-center
                             no-underline rounded-sm"
                >
                  Start Text Group
                </a>
              </div>
            </div>
          ))}
        </section>
      </div>
    </div>
  )
}

export default connect(
  ({ auth }) => ({ uid: auth.user.uid }),
  dispatch => ({
    loadMatches: dispatch.auth.getMatches,
  })
)(Results)
