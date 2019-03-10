import React, { useState, useContext } from 'React'
import { useLocalStorage } from 'react-use'

const AuthProvider = React.createContext({
  token: null,
  uid: null,
  email: null,
  name: null,
})

const useAuthState = () => {
  useContext()
}
