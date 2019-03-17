const functions = require('firebase-functions')
const match = require('./algo')

var accountSid = 'ACe7931fcb7aca9f9c18c7ef21955423ed' // Your Account SID from www.twilio.com/console
var authToken = 'fb04de4eba583349c8c571dd0fd58fbb' // Your Auth Token from www.twilio.com/console

var twilio = require('twilio')
var twilioClient = new twilio(accountSid, authToken)

// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin')
admin.initializeApp()

const db = admin.firestore()

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.algo = functions.firestore
  .document('trips/{tripId}')
  .onWrite(async () => {
    const trips = []
    const qs = await db.collection('trips').get()

    const batch = db.batch()

    const byUser = {}

    qs.forEach(doc => {
      trips.push({ id: doc.id, ...doc.data() })
      // if (!byUser[doc.data().uid]) {
      //   byUserTrips[doc.data().uid] = { trips: [doc.ref], matches: [] }
      // } else {
      //   byUser[doc.data().uid].trips.push(doc.ref)
      // }
    })

    const matchesQ = await db.collection('matches').get()
    matchesQ.forEach(doc => batch.delete(doc.ref))

    const matches = match(trips)
    matches.forEach(match => {
      const ref = db.collection('matches').doc()
      match.trips.forEach(({ uid, id, phone }) => {
        if (!byUser[uid]) byUser[uid] = { trips: [], matches: [], phone }
        byUser[uid].trips.push(db.collection('trips').doc(id))
        byUser[uid].matches.push(ref)
      })

      match.trips = match.trips.map(({ id }) => db.collection('trips').doc(id))
      batch.set(ref, match)
    })

    console.log(byUser)
    Object.keys(byUser).forEach(uid => {
      const userDoc = db.collection('users').doc(uid)

      userDoc
        .get()
        .then(user => {
          if (user.matches !== byUser[uid].matches) {
            return twilioClient.messages.create({
              body:
                'One of your TucTuc trips has been updated! Go to https://www.taketuctuc.com/results to see your matches',
              to: `+1${byUser[uid].phone}`, // Text this number
              from: '+17372041898 ', // From a valid Twilio number
            })
          }
          return { sid: 'NOPE' }
        })
        .then(message => console.log(message.sid))
        .catch(console.error)

      batch.set(userDoc, byUser[uid])
    })

    await batch.commit()
  })

// exports.onMatch = functions.firestore
//   .document('matches/{matchId}')
//   .onWrite(async (change, context) => {
//     const document = change.after.exists ? change.after.data() : null
//     // Remove from users's matches if deleted
//     const batch = db.batch()

//     const matches = []
//     const byUser = {}
//     const qs = await db.collection('matches').get()
//     qs.forEach(doc => {
//       matches.push({ id: doc.id, ...doc.data() })
//       const tripIds = doc.data().trips

//       tripIds.forEach(async tripDoc => {
//         // const tripDoc = await db
//         //   .collection('trips')
//         //   .doc(id)
//         //   .get()
//         // if (!tripDoc.exists) return
//         const trip = (await tripDoc.get()).data()

//         if (!byUser[trip.uid])
//           byUser[trip.uid] = { matches: [], phone: trip.phone }

//         // Add match ID for user
//         byUser[trip.uid].matches.push(doc.id)
//       })
//     })

//     Object.keys(byUser).forEach(async uid => {
//       const userDoc = db.collection('users').doc(uid)
//       const user = await userDoc.get()
//       if (user.matches === byUser[id].matches) return

//       twilioClient.messages
//         .create({
//           body:
//             'Your TucTuc trip has been updated! Go to https://www.taketuctuc.com/results to see your matches',
//           to: `+1${byUser[id].phone}`, // Text this number
//           from: '+17372041898 ', // From a valid Twilio number
//         })
//         .then(message => console.log(message.sid))
//         .catch(console.error)

//       batch.set(userDoc, byUser[uid])
//     })

//     batch.commit()
//   })
