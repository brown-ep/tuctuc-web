import firebase from 'firebase/app'
import 'firebase/auth'

const initialState = {
  authenticated: false,
  user: null,
  error: null,
  unsub: () => null,
}

export default {
  state: initialState,
  reducers: {
    RESET_AUTH: () => initialState,
    SET_USER: (state, user) => ({ ...state, user, authenticated: !!user }),
    SET_ERROR: (state, error) => ({ ...state, error }),
    CLEAR_ERROR: state => ({ ...state, error: null }),

    SET_TMP_EMAIL: (state, tmpEmail) => ({ ...state, tmpEmail }),
    CLEAR_TMP_EMAIL: state => ({ tmpEmail: null }),

    SET_UNSUB: (state, fn) => ({ ...state, unsub: fn }),
  },

  effects: dispatch => ({
    listen: () => {
      const unsub = firebase.auth().onAuthStateChanged(user => {
        if (!user) dispatch.auth.RESET_AUTH()
        else {
          user
            .getIdToken()
            .then(idToken => {
              dispatch.auth.SET_USER({
                email: user.email,
                phone: user.phone,
                uid: user.uid,
                idToken,
              })
            })
            .catch(dispatch.auth.RESET_AUTH)
        }
      })

      dispatch.auth.SET_UNSUB(unsub)
    },

    getMatches: async (payload, rootState) => {
      const uid = rootState.auth.user.uid
      console.log(`getting matches for ${uid}`)
      const user = await firebase
        .firestore()
        .collection('users')
        .doc(uid)
        .get()

      if (!user.exists) return []
      return user.data()

      // const all = []
      // matches.forEach(doc => all.push({ id: doc.id, ...doc.data() }))
      // return all
    },

    logout: () =>
      firebase
        .auth()
        .signOut()
        .then(() => dispatch.auth.RESET_AUTH()),
  }),
}
