import firebase from 'firebase/app'
import 'firebase/auth'

var config = {
  apiKey: 'AIzaSyCcWX1BKoSyERLU-7GIzAB6GuOx2_ZCFFI',
  authDomain: 'tuctuc.firebaseapp.com',
  databaseURL: 'https://tuctuc.firebaseio.com',
  projectId: 'tuctuc',
  storageBucket: 'tuctuc.appspot.com',
  messagingSenderId: '427485207205',
}

firebase.initializeApp(config)
firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
firebase.auth().useDeviceLanguage()
