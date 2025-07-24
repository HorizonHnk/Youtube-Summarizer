import React, { createContext, useContext, useState, useEffect } from 'react'
import { 
  auth, 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
  updateEmail,
  updatePassword,
  updateProfile,
  isFirebaseConfigured
} from '../firebase/config.js'

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
  const [isInitialized, setIsInitialized] = useState(false)

  // Initialize Firebase Auth monitoring
  useEffect(() => {
    if (!isFirebaseConfigured || !auth) {
      console.warn('⚠️ Firebase not properly configured')
      setLoading(false)
      setIsInitialized(true)
      return
    }

    console.log('🔥 Setting up Firebase Auth listener...')

    // Set up Firebase auth state listener
    const unsubscribe = onAuthStateChanged(
      auth,
      (user) => {
        console.log('🔄 Auth state changed:', user ? `User: ${user.email}` : 'No user')
        setCurrentUser(user)
        setLoading(false)
        setIsInitialized(true)
        
        // Clear error when user state changes successfully
        if (user) {
          setError('')
        }
      },
      (error) => {
        console.error('❌ Auth state change error:', error)
        setError(`Authentication error: ${error.message}`)
        setLoading(false)
        setIsInitialized(true)
      }
    )

    return () => {
      console.log('🧹 Cleaning up auth listener')
      unsubscribe()
    }
  }, [])

  // Sign up function
  async function signup(email, password, displayName = '') {
    if (!isFirebaseConfigured || !auth) {
      throw new Error('Firebase is not configured properly')
    }

    try {
      setError('')
      setLoading(true)
      
      console.log('📝 Creating new user account...')
      const { user } = await createUserWithEmailAndPassword(auth, email, password)
      
      // Update profile with display name if provided
      if (displayName.trim()) {
        await updateProfile(user, { displayName: displayName.trim() })
        console.log('✅ User profile updated with display name')
      }
      
      console.log('✅ Account created successfully')
      return user
    } catch (error) {
      console.error('❌ Signup error:', error)
      let errorMessage = 'Failed to create account'
      
      // Handle specific Firebase Auth errors
      switch (error.code) {
        case 'auth/email-already-in-use':
          errorMessage = 'An account with this email already exists'
          break
        case 'auth/weak-password':
          errorMessage = 'Password should be at least 6 characters'
          break
        case 'auth/invalid-email':
          errorMessage = 'Invalid email address'
          break
        case 'auth/operation-not-allowed':
          errorMessage = 'Email/password accounts are not enabled'
          break
        default:
          errorMessage = error.message || 'Failed to create account'
      }
      
      setError(errorMessage)
      throw new Error(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  // Login function
  async function login(email, password) {
    if (!isFirebaseConfigured || !auth) {
      throw new Error('Firebase is not configured properly')
    }

    try {
      setError('')
      setLoading(true)
      
      console.log('🔐 Signing in user...')
      const result = await signInWithEmailAndPassword(auth, email, password)
      console.log('✅ Login successful')
      return result.user
    } catch (error) {
      console.error('❌ Login error:', error)
      let errorMessage = 'Failed to sign in'
      
      // Handle specific Firebase Auth errors
      switch (error.code) {
        case 'auth/user-not-found':
          errorMessage = 'No account found with this email'
          break
        case 'auth/wrong-password':
          errorMessage = 'Incorrect password'
          break
        case 'auth/invalid-email':
          errorMessage = 'Invalid email address'
          break
        case 'auth/user-disabled':
          errorMessage = 'This account has been disabled'
          break
        case 'auth/too-many-requests':
          errorMessage = 'Too many failed attempts. Please try again later'
          break
        default:
          errorMessage = error.message || 'Failed to sign in'
      }
      
      setError(errorMessage)
      throw new Error(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  // Logout function
  async function logout() {
    if (!isFirebaseConfigured || !auth) {
      throw new Error('Firebase is not configured properly')
    }

    try {
      setError('')
      console.log('👋 Signing out user...')
      await signOut(auth)
      console.log('✅ Logout successful')
    } catch (error) {
      console.error('❌ Logout error:', error)
      setError(`Failed to sign out: ${error.message}`)
      throw error
    }
  }

  // Google Sign In
  async function signInWithGoogle() {
    if (!isFirebaseConfigured || !auth) {
      throw new Error('Firebase is not configured properly')
    }

    try {
      setError('')
      setLoading(true)
      
      console.log('🔍 Starting Google sign-in...')
      const provider = new GoogleAuthProvider()
      provider.addScope('email')
      provider.addScope('profile')
      
      const result = await signInWithPopup(auth, provider)
      console.log('✅ Google sign-in successful')
      return result.user
    } catch (error) {
      console.error('❌ Google sign-in error:', error)
      let errorMessage = 'Failed to sign in with Google'
      
      switch (error.code) {
        case 'auth/popup-closed-by-user':
          errorMessage = 'Sign-in cancelled'
          break
        case 'auth/popup-blocked':
          errorMessage = 'Please allow popups for this site'
          break
        default:
          errorMessage = error.message || 'Failed to sign in with Google'
      }
      
      setError(errorMessage)
      throw new Error(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  // Reset Password
  async function resetPassword(email) {
    if (!isFirebaseConfigured || !auth) {
      throw new Error('Firebase is not configured properly')
    }

    try {
      setError('')
      console.log('📧 Sending password reset email...')
      await sendPasswordResetEmail(auth, email)
      console.log('✅ Password reset email sent')
      return true
    } catch (error) {
      console.error('❌ Password reset error:', error)
      let errorMessage = 'Failed to send password reset email'
      
      switch (error.code) {
        case 'auth/user-not-found':
          errorMessage = 'No account found with this email'
          break
        case 'auth/invalid-email':
          errorMessage = 'Invalid email address'
          break
        default:
          errorMessage = error.message || 'Failed to send password reset email'
      }
      
      setError(errorMessage)
      throw new Error(errorMessage)
    }
  }

  // Update Email
  async function updateUserEmail(email) {
    if (!isFirebaseConfigured || !auth || !currentUser) {
      throw new Error('User not authenticated or Firebase not configured')
    }

    try {
      setError('')
      await updateEmail(currentUser, email)
      console.log('✅ Email updated successfully')
      return true
    } catch (error) {
      console.error('❌ Email update error:', error)
      setError(`Failed to update email: ${error.message}`)
      throw error
    }
  }

  // Update Password
  async function updateUserPassword(password) {
    if (!isFirebaseConfigured || !auth || !currentUser) {
      throw new Error('User not authenticated or Firebase not configured')
    }

    try {
      setError('')
      await updatePassword(currentUser, password)
      console.log('✅ Password updated successfully')
      return true
    } catch (error) {
      console.error('❌ Password update error:', error)
      setError(`Failed to update password: ${error.message}`)
      throw error
    }
  }

  // Update Profile
  async function updateUserProfile(profileData) {
    if (!isFirebaseConfigured || !auth || !currentUser) {
      throw new Error('User not authenticated or Firebase not configured')
    }

    try {
      setError('')
      await updateProfile(currentUser, profileData)
      console.log('✅ Profile updated successfully')
      
      // Update local state to reflect changes immediately
      setCurrentUser(prevUser => ({ ...prevUser, ...profileData }))
      return true
    } catch (error) {
      console.error('❌ Profile update error:', error)
      setError(`Failed to update profile: ${error.message}`)
      throw error
    }
  }

  // Clear error
  function clearError() {
    setError('')
  }

  // Context value
  const value = {
    // User state
    currentUser,
    loading,
    error,
    isInitialized,
    
    // Auth methods
    signup,
    login,
    logout,
    signInWithGoogle,
    resetPassword,
    
    // Profile management
    updateUserEmail,
    updateUserPassword,
    updateUserProfile,
    
    // Utility
    clearError,
    
    // User info helpers
    isAuthenticated: !!currentUser,
    userEmail: currentUser?.email || '',
    userDisplayName: currentUser?.displayName || currentUser?.email?.split('@')[0] || '',
    userPhotoURL: currentUser?.photoURL || '',
    userId: currentUser?.uid || '',
    
    // Configuration status
    isFirebaseConfigured: isFirebaseConfigured,
    isMockAuth: false // We're using real Firebase now
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

// Export the context
export { AuthContext }

// Default export
export default AuthProvider