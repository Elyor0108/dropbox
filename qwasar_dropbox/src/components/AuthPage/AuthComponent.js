import React, { useContext, useState, useEffect } from "react"
import { auth } from "../../firebase/firebase"

const AuthContext = React.createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState()
  const [loading, setLoading] = useState(true)
  
  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password)
  }

  function signup(email, password) {
    return auth.createUserWithEmailAndPassword(email, password)
  }
  
  function updatePassword(password) {
    return currentUser.updatePassword(password)
  }
  function logout() {
    return auth.signOut()
  }
  
  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email)
  }

  function updateEmail(email) {
    return currentUser.updateEmail(email)
  }


  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user)
      setLoading(false)
    })

    return unsubscribe
  }, [])

  const value = {
    currentUser,
    login,
    signup,
    updateEmail,
    logout,
    resetPassword,
    updatePassword
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}
