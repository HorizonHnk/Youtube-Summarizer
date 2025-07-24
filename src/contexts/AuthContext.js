import { createContext, useContext, useState, useEffect, createElement } from 'react'

// Create the Auth Context
const AuthContext = createContext({})

// Custom hook to use the auth context
export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

// Auth Provider Component
export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [firebase, setFirebase] = useState(null)

  // Initialize Firebase
  useEffect(() => {
    async function loadFirebase() {
      try {
        const fb = await import('../firebase/config.js')
        setFirebase(fb)
      } catch (error) {
        console.error('Firebase initialization failed:', error)
        setError('Firebase configuration failed')
        setLoading(false)
      }
    }
    loadFirebase()
  }, [])

  // Sign up function
  async function signup(email, password, displayName = '') {
    if (!firebase) {
      throw new Error('Firebase not initialized')
    }

    try {
      setError('')
      setLoading(true)
      
      const { user } = await firebase.createUserWithEmailAndPassword(firebase.auth, email, password)
      
      if (displayName.trim()) {
        await firebase.updateProfile(user, { displayName: displayName.trim() })
      }
      
      return user
    } catch (error) {
      setError(error.message)
      throw error
    } finally {
      setLoading(false)
    }
  }

  // Login function
  async function login(email, password) {
    if (!firebase) {
      throw new Error('Firebase not initialized')
    }

    try {
      setError('')
      setLoading(true)
      const result = await firebase.signInWithEmailAndPassword(firebase.auth, email, password)
      return result.user
    } catch (error) {
      setError(error.message)
      throw error
    } finally {
      setLoading(false)
    }
  }

  // Logout function
  async function logout() {
    if (!firebase) {
      throw new Error('Firebase not initialized')
    }

    try {
      setError('')
      await firebase.signOut(firebase.auth)
    } catch (error) {
      setError(error.message)
      throw error
    }
  }

  // Google Sign In
  async function signInWithGoogle() {
    if (!firebase) {
      throw new Error('Firebase not initialized')
    }

    try {
      setError('')
      setLoading(true)
      const provider = new firebase.GoogleAuthProvider()
      const result = await firebase.signInWithPopup(firebase.auth, provider)
      return result.user
    } catch (error) {
      setError(error.message)
      throw error
    } finally {
      setLoading(false)
    }
  }

  // Reset Password
  async function resetPassword(email) {
    if (!firebase) {
      throw new Error('Firebase not initialized')
    }

    try {
      setError('')
      await firebase.sendPasswordResetEmail(firebase.auth, email)
      return true
    } catch (error) {
      setError(error.message)
      throw error
    }
  }

  // Clear error
  function clearError() {
    setError('')
  }

  // Monitor auth state changes
  useEffect(() => {
    if (!firebase) return

    const unsubscribe = firebase.onAuthStateChanged(firebase.auth, (user) => {
      setCurrentUser(user)
      setLoading(false)
      
      if (user) {
        setError('')
      }
    }, (error) => {
      console.error('Auth state change error:', error)
      setError(error.message)
      setLoading(false)
    })

    return unsubscribe
  }, [firebase])

  // Context value
  const value = {
    currentUser,
    loading,
    error,
    signup,
    login,
    logout,
    signInWithGoogle,
    resetPassword,
    clearError,
    isAuthenticated: !!currentUser,
    userEmail: currentUser?.email || '',
    userDisplayName: currentUser?.displayName || '',
    userPhotoURL: currentUser?.photoURL || '',
    userId: currentUser?.uid || ''
  }

  // Return Provider using createElement instead of JSX
  return createElement(AuthContext.Provider, { value }, children)
}

// Export the context
export { AuthContext }

// Default export
export default AuthProvider