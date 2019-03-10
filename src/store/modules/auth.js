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

    logout: () =>
      firebase
        .auth()
        .logout()
        .then(() => dispatch.auth.RESET_AUTH()),
  }),
}
