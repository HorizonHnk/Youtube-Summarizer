// Import Firebase functions
import { initializeApp } from 'firebase/app'
import { 
  getAuth, 
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
  connectAuthEmulator
} from 'firebase/auth'
import { 
  getFirestore, 
  connectFirestoreEmulator 
} from 'firebase/firestore'

// Firebase configuration from environment variables
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
}

// Validate configuration
console.log('🔥 Firebase Configuration:')
console.log('- API Key:', firebaseConfig.apiKey ? '✅ Set' : '❌ Missing')
console.log('- Auth Domain:', firebaseConfig.authDomain || '❌ Missing')
console.log('- Project ID:', firebaseConfig.projectId || '❌ Missing')
console.log('- App ID:', firebaseConfig.appId ? '✅ Set' : '❌ Missing')

// Initialize Firebase
let app = null
let auth = null
let db = null

try {
  // Initialize Firebase App
  app = initializeApp(firebaseConfig)
  console.log('✅ Firebase App initialized successfully')

  // Initialize Firebase Authentication
  auth = getAuth(app)
  console.log('✅ Firebase Auth initialized successfully')

  // Initialize Firestore (optional, for future use)
  db = getFirestore(app)
  console.log('✅ Firestore initialized successfully')

  // Connect to emulators in development (optional)
  if (import.meta.env.DEV && import.meta.env.VITE_USE_EMULATORS === 'true') {
    try {
      connectAuthEmulator(auth, 'http://localhost:9099')
      connectFirestoreEmulator(db, 'localhost', 8080)
      console.log('🔧 Connected to Firebase emulators')
    } catch (error) {
      console.log('ℹ️ Emulators not available or already connected')
    }
  }

  // Set up auth state persistence
  auth.useDeviceLanguage()

} catch (error) {
  console.error('❌ Firebase initialization failed:', error)
  console.error('Please check your environment variables in .env file')
}

// Export auth and database instances
export { auth, db }

// Export auth methods
export {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
  updateEmail,
  updatePassword,
  updateProfile
}

// Export configuration status
export const isFirebaseConfigured = !!(app && auth)
export const firebaseApp = app

// Export API URLs for backend calls
export const API_BASE_URL = import.meta.env.VITE_FIREBASE_FUNCTIONS_URL || import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'

// Default export
export default app