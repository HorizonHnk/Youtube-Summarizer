import axios from 'axios'
import { auth } from '../firebase/config.js'

// API Configuration
const API_BASE_URL = import.meta.env.VITE_FIREBASE_FUNCTIONS_URL || 'https://us-central1-job-bot-125fd.cloudfunctions.net'
const API_TIMEOUT = parseInt(import.meta.env.VITE_API_TIMEOUT) || 60000

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: API_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  }
})

// Request interceptor to add auth token
api.interceptors.request.use(
  async (config) => {
    try {
      // Get current user's ID token
      if (auth.currentUser) {
        const idToken = await auth.currentUser.getIdToken()
        config.headers.Authorization = `Bearer ${idToken}`
        console.log('🔐 Added auth token to request')
      } else {
        console.warn('⚠️ No authenticated user for API request')
      }
    } catch (error) {
      console.error('❌ Failed to get auth token:', error)
    }
    
    console.log('📤 API Request:', config.method?.toUpperCase(), config.url)
    return config
  },
  (error) => {
    console.error('❌ Request interceptor error:', error)
    return Promise.reject(error)
  }
)

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    console.log('📥 API Response:', response.status, response.config.url)
    return response
  },
  (error) => {
    console.error('❌ API Error:', error.response?.status, error.config?.url)
    
    // Handle specific error cases
    if (error.response?.status === 401) {
      console.error('🔒 Unauthorized - user may need to re-authenticate')
    } else if (error.response?.status === 429) {
      console.error('⏱️ Rate limit exceeded')
    } else if (error.response?.status >= 500) {
      console.error('🔥 Server error')
    }
    
    return Promise.reject(error)
  }
)

// API Functions
export const apiService = {
  // Test API connection
  async healthCheck() {
    try {
      const response = await api.get('/health')
      return response.data
    } catch (error) {
      console.error('Health check failed:', error)
      throw error
    }
  },

  // YouTube video analysis
  async analyzeYouTubeVideo(videoUrl, model = 'gemini-1.5-flash', additionalPrompt = '') {
    try {
      const response = await api.post('/summarize', {
        youtube_link: videoUrl,
        model: model,
        additional_prompt: additionalPrompt
      })
      return response.data
    } catch (error) {
      console.error('YouTube analysis failed:', error)
      throw error
    }
  },

  // Ask question about video
  async askQuestion(contextId, question, chatHistory = []) {
    try {
      const response = await api.post('/ask-question', {
        context_id: contextId,
        question: question,
        chat_history: chatHistory
      })
      return response.data
    } catch (error) {
      console.error('Question failed:', error)
      throw error
    }
  },

  // Get user's analysis history (if implemented)
  async getAnalysisHistory() {
    try {
      const response = await api.get('/user/history')
      return response.data
    } catch (error) {
      console.error('Failed to get history:', error)
      throw error
    }
  },

  // Save analysis result (if implemented)
  async saveAnalysis(analysisData) {
    try {
      const response = await api.post('/user/save-analysis', analysisData)
      return response.data
    } catch (error) {
      console.error('Failed to save analysis:', error)
      throw error
    }
  }
}

// Utility function to check if API is available
export const checkAPIAvailability = async () => {
  try {
    await apiService.healthCheck()
    return true
  } catch (error) {
    return false
  }
}

// Export the axios instance for direct use if needed
export { api }

// Export API base URL
export { API_BASE_URL }

export default apiService