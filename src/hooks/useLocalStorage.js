import { useState, useEffect, useCallback } from 'react'

const useLocalStorage = (key, initialValue, options = {}) => {
  const {
    serialize = JSON.stringify,
    deserialize = JSON.parse,
    onError = console.error
  } = options

  // Get stored value or return initial value
  const getStoredValue = useCallback(() => {
    try {
      if (typeof window === 'undefined') {
        return initialValue
      }

      const item = window.localStorage.getItem(key)
      
      if (item === null) {
        return initialValue
      }

      return deserialize(item)
    } catch (error) {
      onError(`Error reading localStorage key "${key}":`, error)
      return initialValue
    }
  }, [key, initialValue, deserialize, onError])

  const [storedValue, setStoredValue] = useState(getStoredValue)

  // Update localStorage when state changes
  const setValue = useCallback((value) => {
    try {
      // Allow value to be a function so we have the same API as useState
      const valueToStore = value instanceof Function ? value(storedValue) : value
      
      setStoredValue(valueToStore)

      if (typeof window !== 'undefined') {
        if (valueToStore === undefined) {
          window.localStorage.removeItem(key)
        } else {
          window.localStorage.setItem(key, serialize(valueToStore))
        }
      }
    } catch (error) {
      onError(`Error setting localStorage key "${key}":`, error)
    }
  }, [key, storedValue, serialize, onError])

  // Remove item from localStorage
  const removeValue = useCallback(() => {
    try {
      setStoredValue(undefined)
      if (typeof window !== 'undefined') {
        window.localStorage.removeItem(key)
      }
    } catch (error) {
      onError(`Error removing localStorage key "${key}":`, error)
    }
  }, [key, onError])

  // Listen for changes to localStorage from other tabs/windows
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === key && e.newValue !== serialize(storedValue)) {
        try {
          setStoredValue(e.newValue ? deserialize(e.newValue) : undefined)
        } catch (error) {
          onError(`Error handling storage change for key "${key}":`, error)
        }
      }
    }

    if (typeof window !== 'undefined') {
      window.addEventListener('storage', handleStorageChange)
      return () => window.removeEventListener('storage', handleStorageChange)
    }
  }, [key, storedValue, serialize, deserialize, onError])

  // Sync with current localStorage value on mount
  useEffect(() => {
    const currentValue = getStoredValue()
    if (currentValue !== storedValue) {
      setStoredValue(currentValue)
    }
  }, [key]) // Only depend on key to avoid infinite loops

  return [storedValue, setValue, removeValue]
}

// Specialized hooks for common use cases
export const useLocalStorageState = (key, initialValue) => {
  return useLocalStorage(key, initialValue, {
    serialize: JSON.stringify,
    deserialize: JSON.parse
  })
}

export const useLocalStorageString = (key, initialValue = '') => {
  return useLocalStorage(key, initialValue, {
    serialize: (value) => value,
    deserialize: (value) => value
  })
}

export const useLocalStorageNumber = (key, initialValue = 0) => {
  return useLocalStorage(key, initialValue, {
    serialize: (value) => value.toString(),
    deserialize: (value) => {
      const num = Number(value)
      return isNaN(num) ? initialValue : num
    }
  })
}

export const useLocalStorageBoolean = (key, initialValue = false) => {
  return useLocalStorage(key, initialValue, {
    serialize: (value) => value ? 'true' : 'false',
    deserialize: (value) => value === 'true'
  })
}

// Hook for managing user preferences
export const useUserPreferences = () => {
  const [preferences, setPreferences, removePreferences] = useLocalStorage('userPreferences', {
    theme: 'dark',
    language: 'en',
    autoSave: true,
    notifications: true,
    aiModel: 'gemini-1.5-flash'
  })

  const updatePreference = useCallback((key, value) => {
    setPreferences(prev => ({
      ...prev,
      [key]: value
    }))
  }, [setPreferences])

  const resetPreferences = useCallback(() => {
    removePreferences()
  }, [removePreferences])

  return {
    preferences,
    updatePreference,
    resetPreferences
  }
}

// Hook for managing recent analysis history
export const useAnalysisHistory = () => {
  const [history, setHistory] = useLocalStorage('analysisHistory', [])

  const addToHistory = useCallback((analysis) => {
    setHistory(prev => {
      const newHistory = [analysis, ...prev]
      // Keep only the last 10 analyses
      return newHistory.slice(0, 10)
    })
  }, [setHistory])

  const removeFromHistory = useCallback((id) => {
    setHistory(prev => prev.filter(item => item.id !== id))
  }, [setHistory])

  const clearHistory = useCallback(() => {
    setHistory([])
  }, [setHistory])

  return {
    history,
    addToHistory,
    removeFromHistory,
    clearHistory
  }
}

export default useLocalStorage