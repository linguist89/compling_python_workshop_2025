'use client'

import { useState, useEffect } from 'react'
import { useProgress } from '@/app/contexts/ProgressContext'
import { useTheme } from '@/app/contexts/ThemeContext'
import ProgressBar from '@/app/components/ProgressBar'
import CountrySelector from '@/app/components/CountrySelector'
import Laptop from '@/app/components/Laptop'
import { useRouter } from 'next/navigation'
import { auth } from '@/lib/firebase'
import { getUserData, createUser, updateUserData, deleteUserData } from '@/lib/userService'
import { onAuthStateChanged } from 'firebase/auth'

const DEFAULT_FONT_SIZE = 16
const DEFAULT_THEME = 'neon'

// Add default theme values
const defaultThemeValues = {
  currentTheme: {
    name: 'Neon Night',
    isDark: true,
    primary: {
      background: '#0A192F',
      dark: '#050B18'
    }
  },
  themes: {
    neon: {
      name: 'Neon Night',
      isDark: true,
      primary: {
        background: '#0A192F',
        dark: '#050B18'
      }
    }
  },
  updateTheme: () => {} // noop function as default
}

const lessonTitles = {
  '1': 'Introduction to Python',
  '2': 'Flow Control',
  '3': 'Pandas and Matplotlib'
}

export default function UserSettings({ onClose }) {
  const [userName, setUserName] = useState('')
  const [fontSize, setFontSize] = useState(DEFAULT_FONT_SIZE)
  const [selectedCountry, setSelectedCountry] = useState(null)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [confirmName, setConfirmName] = useState('')
  const [userId, setUserId] = useState(null)
  const [userType, setUserType] = useState('student')
  const [isInitialLoad, setIsInitialLoad] = useState(true)
  const { getProgress, getLessonProgress, resetProgress } = useProgress()
  
  // Use try-catch to handle potential theme context errors
  const themeContext = (() => {
    try {
      const context = useTheme()
      return context || defaultThemeValues
    } catch (error) {
      console.warn('Theme context not available, using default values')
      return defaultThemeValues
    }
  })()
  
  const { currentTheme, themes, updateTheme } = themeContext
  const router = useRouter()
  const progress = getProgress()

  // Load data from localStorage
  const loadFromLocalStorage = () => {
    const savedData = localStorage.getItem('userDataPythonWorkshop')
    if (savedData) {
      const parsedData = JSON.parse(savedData)
      setUserName(parsedData.userName || '')
      const size = parsedData.fontSize || DEFAULT_FONT_SIZE
      setFontSize(size)
      document.documentElement.style.fontSize = `${size}px`
      setSelectedCountry(parsedData.userCountry || null)
      setUserType(parsedData.user_type || 'student')
    }
  }

  // Save data to localStorage and optionally to Firestore
  const saveData = async (newData, updateFirestore = true) => {
    // Get current data from localStorage
    const currentData = localStorage.getItem('userDataPythonWorkshop')
    const parsedCurrentData = currentData ? JSON.parse(currentData) : {
      userName: '',
      fontSize: DEFAULT_FONT_SIZE,
      userCountry: null,
      user_type: 'student'
    }

    // Merge new data with current data
    const updatedData = {
      ...parsedCurrentData,
      ...newData
    }

    // Update localStorage
    localStorage.setItem('userDataPythonWorkshop', JSON.stringify(updatedData))

    // Update Firestore if needed
    if (updateFirestore && userId) {
      await updateUserData(userId, newData)
    }
  }

  // Initial load effect
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUserId(user.uid)
        try {
          // First load from localStorage for immediate display
          loadFromLocalStorage()

          // Then fetch from Firestore
          let userData = await getUserData(user.uid)
          if (!userData) {
            // If no Firestore data exists, create it from localStorage
            const localData = JSON.parse(localStorage.getItem('userDataPythonWorkshop') || '{}')
            userData = await createUser(user.uid, localData)
          } else {
            // Create complete data object
            const completeData = {
              userName: userData.userName || '',
              fontSize: userData.fontSize || DEFAULT_FONT_SIZE,
              userCountry: userData.userCountry || null,
              user_type: userData.user_type || 'student'
            }

            // Update localStorage with Firestore data
            localStorage.setItem('userDataPythonWorkshop', JSON.stringify(completeData))

            // Update state
            setUserName(completeData.userName)
            setFontSize(completeData.fontSize)
            setSelectedCountry(completeData.userCountry)
            setUserType(completeData.user_type)
            document.documentElement.style.fontSize = `${completeData.fontSize}px`
          }
        } catch (error) {
          console.error('Error loading user data:', error)
          // Fallback to localStorage if Firestore fails
          loadFromLocalStorage()
        }
      }
      setIsInitialLoad(false)
    })

    return () => unsubscribe()
  }, [])

  const handleNameChange = async (e) => {
    const newName = e.target.value
    setUserName(newName)
    await saveData({ userName: newName })
  }

  const handleCountrySelect = async (country) => {
    setSelectedCountry(country)
    await saveData({ userCountry: country })
  }

  const handleDeleteData = () => {
    setShowDeleteConfirm(true)
  }

  const handleConfirmDelete = async () => {
    if (confirmName === userName && userId) {
      try {
        // Clear localStorage
        localStorage.removeItem('userDataPythonWorkshop')

        // Reset Firestore data
        await deleteUserData(userId)
        
        // Reset states
        setUserName('')
        setFontSize(DEFAULT_FONT_SIZE)
        setSelectedCountry(null)
        setShowDeleteConfirm(false)
        setConfirmName('')
        setUserType('student')
        
        // Reset font size and theme to default
        document.documentElement.style.fontSize = `${DEFAULT_FONT_SIZE}px`
        updateTheme(DEFAULT_THEME)
        resetProgress()

        // Navigate to home and refresh if we're on the personalize page
        if (window.location.pathname === '/personalize') {
          router.push('/')
          setTimeout(() => {
            window.location.reload()
          }, 100)
        }
      } catch (error) {
        console.error('Error deleting user data:', error)
      }
    }
  }

  const handleThemeChange = (themeKey) => {
    try {
      if (themes && themes[themeKey] && typeof updateTheme === 'function') {
        updateTheme(themeKey)
      } else {
        console.warn('Theme change failed: invalid theme key or updateTheme not available')
      }
    } catch (error) {
      console.error('Error changing theme:', error)
    }
  }

  const adjustFontSize = async (change) => {
    const newSize = Math.max(12, Math.min(24, fontSize + change))
    setFontSize(newSize)
    document.documentElement.style.fontSize = `${newSize}px`
    await saveData({ fontSize: newSize })
  }

  const resetToDefaults = async () => {
    const defaultData = {
      fontSize: DEFAULT_FONT_SIZE,
      userName: '',
      userCountry: null,
      user_type: 'student'
    }

    // Update state
    setFontSize(DEFAULT_FONT_SIZE)
    setUserName('')
    setSelectedCountry(null)
    setUserType('student')
    document.documentElement.style.fontSize = `${DEFAULT_FONT_SIZE}px`

    // Save to localStorage and Firestore
    await saveData(defaultData)
    
    // Reset theme
    updateTheme(DEFAULT_THEME)
  }

  const calculateOverallProgress = () => {
    const totalLessons = Object.keys(lessonTitles).length
    const completedLessons = Math.floor(progress / (100 / totalLessons))
    
    return {
      completedLessons,
      totalLessons,
      averagePercentage: progress
    }
  }

  const { completedLessons, totalLessons, averagePercentage } = calculateOverallProgress()

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <h1 
            className="text-4xl font-bold"
            style={{
              background: 'linear-gradient(to right, var(--text-accent), var(--color-secondary))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            Personalize Your Experience
          </h1>
          {onClose && (
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {/* Progress Overview */}
        <section 
          className="rounded-lg p-6 border transition-all duration-300"
          style={{ 
            backgroundColor: 'var(--card-background)',
            borderColor: 'var(--card-border)',
            boxShadow: 'var(--card-shadow)'
          }}
        >
          <h2 className="text-2xl font-semibold mb-6" style={{ color: 'var(--text-primary)' }}>
            Your Progress
          </h2>
          
          {/* Overall Progress */}
          <div className="mb-6">
            <div className="flex justify-between mb-2">
              <span style={{ color: 'var(--text-primary)' }}>Overall Progress{' '}</span>
              <span style={{ color: 'var(--text-secondary)' }}>
                {completedLessons} of {totalLessons} lessons completed
              </span>
            </div>
            <ProgressBar percentage={averagePercentage} height="12px" />
          </div>

          {/* Interactive Laptop Progress */}
          <div className="mb-8 flex flex-col items-center bg-opacity-50 rounded-lg p-4" style={{ backgroundColor: 'var(--card-background)' }}>
            <div className="text-center mb-2" style={{ color: 'var(--text-primary)' }}>
              Build your CompLing laptop as you progress!
            </div>
            <Laptop 
              color={averagePercentage >= 50 ? 'space' : 'silver'} 
              initialProgress={Math.floor(averagePercentage)} 
            />
          </div>

          {/* Individual Lesson Progress */}
          <div className="space-y-4">
            {Object.entries(lessonTitles).map(([id, title]) => {
              const lessonProgress = getLessonProgress(id);
              return (
                <div key={id} className="p-4 rounded-lg" style={{ backgroundColor: 'var(--card-background)' }}>
                  <div className="flex justify-between mb-2">
                    <span style={{ color: 'var(--text-primary)' }}>{title}</span>
                    <span style={{ color: 'var(--text-secondary)' }}>
                      {lessonProgress}%
                    </span>
                  </div>
                  <ProgressBar percentage={lessonProgress} />
                </div>
              );
            })}
          </div>
        </section>

        {/* User Information */}
        <section 
          className="rounded-lg p-6 border transition-all duration-300"
          style={{ 
            backgroundColor: 'var(--card-background)',
            borderColor: 'var(--card-border)',
            boxShadow: 'var(--card-shadow)'
          }}
        >
          <h2 className="text-2xl font-semibold mb-6" style={{ color: 'var(--text-primary)' }}>
            Your Information
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block mb-2 font-medium" style={{ color: 'var(--text-primary)' }}>
                Your Name
              </label>
              <input
                type="text"
                value={userName}
                onChange={handleNameChange}
                className="w-full px-4 py-2 rounded-lg"
                style={{
                  backgroundColor: 'var(--card-background)',
                  color: 'var(--text-primary)',
                  border: '1px solid var(--card-border)'
                }}
                placeholder="Enter your name"
              />
            </div>

            <CountrySelector
              selectedCountry={selectedCountry}
              onSelect={handleCountrySelect}
            />
          </div>
        </section>

        {/* Theme Selection */}
        <section 
          className="rounded-lg p-6 border transition-all duration-300"
          style={{ 
            backgroundColor: 'var(--card-background)',
            borderColor: 'var(--card-border)',
            boxShadow: 'var(--card-shadow)'
          }}
        >
          <h2 className="text-2xl font-semibold mb-6" style={{ color: 'var(--text-primary)' }}>
            Choose Your Theme
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {themes && Object.entries(themes).map(([key, theme]) => theme && (
              <button
                key={key}
                onClick={() => handleThemeChange(key)}
                className="rounded-lg border transition-all duration-300"
                style={{
                  borderColor: currentTheme?.name === theme?.name 
                    ? 'var(--interactive-hover)'
                    : 'var(--card-border)',
                  backgroundColor: currentTheme?.name === theme?.name 
                    ? 'var(--interactive-hover)10'
                    : 'transparent',
                }}
              >
                <div className="p-4 space-y-3">
                  <div 
                    className="h-24 rounded-lg"
                    style={{
                      background: theme?.primary ? `linear-gradient(to right, ${theme.primary.background || '#000'}, ${theme.primary.dark || '#000'})` : '#000'
                    }}
                  />
                  <div className="flex items-center justify-between">
                    <span 
                      style={{ color: 'var(--text-primary)' }}
                      className="font-medium"
                    >
                      {theme?.name || 'Unknown Theme'}
                    </span>
                    {currentTheme?.name === theme?.name && (
                      <span style={{ color: 'var(--interactive-hover)' }}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </span>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* Font Size Settings */}
        <section 
          className="rounded-lg p-6 border transition-all duration-300"
          style={{ 
            backgroundColor: 'var(--card-background)',
            borderColor: 'var(--card-border)',
            boxShadow: 'var(--card-shadow)'
          }}
        >
          <h2 className="text-2xl font-semibold mb-6" style={{ color: 'var(--text-primary)' }}>
            Adjust Text Size
          </h2>
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => adjustFontSize(-1)}
                className="p-2 rounded-lg transition-all duration-300"
                style={{
                  backgroundColor: 'var(--card-background)',
                  borderColor: 'var(--interactive-hover)',
                  color: 'var(--interactive-hover)',
                  border: '1px solid'
                }}
                aria-label="Decrease font size"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                </svg>
              </button>
              
              <span 
                className="font-mono"
                style={{ color: 'var(--text-primary)' }}
              >
                {fontSize}px
              </span>
              
              <button
                onClick={() => adjustFontSize(1)}
                className="p-2 rounded-lg transition-all duration-300"
                style={{
                  backgroundColor: 'var(--card-background)',
                  borderColor: 'var(--interactive-hover)',
                  color: 'var(--interactive-hover)',
                  border: '1px solid'
                }}
                aria-label="Increase font size"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </button>
            </div>

            <div className="space-y-4" style={{ color: 'var(--text-primary)' }}>
              <h3 className="text-4xl font-bold">Heading 1</h3>
              <h4 className="text-3xl font-bold">Heading 2</h4>
              <h5 className="text-2xl font-bold">Heading 3</h5>
              <p className="text-xl">This is larger paragraph text that might be used for important information or introductions.</p>
              <p className="text-base">This is standard paragraph text used throughout the site. It should be comfortable to read and provide good contrast.</p>
              <p className="text-sm">This is smaller text that might be used for captions, notes, or less important information.</p>
              <span className="block text-base">
                <span 
                  className="block bg-opacity-20 rounded-lg p-4 overflow-x-auto font-mono" 
                  style={{ 
                    backgroundColor: 'var(--text-accent)20',
                    fontSize: `${fontSize}px`
                  }}
                >
{`# Python code example
def greet(name: str) -> str:
    """Return a personalized greeting."""
    return f"Hello, {name}!"

# Call the function
message = greet("Learner")
print(message)  # Output: Hello, Learner!`}
                </span>
                <span className="block mt-2 text-sm" style={{ color: 'var(--text-secondary)' }}>Code blocks will adjust with text size</span>
              </span>
              <div className="text-xs">
                <code 
                  className="bg-opacity-20 rounded px-1" 
                  style={{ 
                    backgroundColor: 'var(--text-accent)20',
                    fontSize: `${fontSize}px`
                  }}
                >
                  This is code or technical text
                </code>
              </div>
            </div>
          </div>
        </section>

        {/* Danger Zone */}
        <section 
          className="rounded-lg p-6 border transition-all duration-300"
          style={{ 
            backgroundColor: 'var(--card-background)',
            borderColor: 'var(--card-border)',
            boxShadow: 'var(--card-shadow)'
          }}
        >
          <h2 className="text-2xl font-semibold mb-6" style={{ color: 'var(--text-primary)' }}>
            Danger Zone
          </h2>
          <div className="space-y-6">
            <div>
              <p className="mb-4 text-sm" style={{ color: 'var(--text-secondary)' }}>
                This action will permanently delete all your data, including progress, settings, and preferences.
              </p>
              <button
                onClick={handleDeleteData}
                className="w-full px-4 py-3 text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                Delete All Data
              </button>
            </div>

            <div className="border-t pt-6" style={{ borderColor: 'var(--card-border)' }}>
              <button
                onClick={resetToDefaults}
                className="w-full px-6 py-3 rounded-lg font-medium transition-all duration-300"
                style={{
                  backgroundColor: 'var(--card-background)',
                  borderColor: 'var(--text-accent)',
                  color: 'var(--text-accent)',
                  border: '1px solid'
                }}
              >
                Reset to Defaults
              </button>
            </div>
          </div>
        </section>

        {/* Delete Confirmation Modal */}
        {showDeleteConfirm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div 
              className="bg-opacity-95 rounded-lg p-6 max-w-md w-full mx-4"
              style={{ backgroundColor: 'var(--color-background)' }}
            >
              <h3 className="text-xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
                Confirm Data Deletion
              </h3>
              <p className="mb-4" style={{ color: 'var(--text-primary)' }}>
                This action will delete all your data including progress, settings, and preferences. 
                To confirm, please type your name: <strong>{userName}</strong>
              </p>
              <input
                type="text"
                value={confirmName}
                onChange={(e) => setConfirmName(e.target.value)}
                className="w-full px-4 py-2 mb-4 rounded-lg"
                style={{
                  backgroundColor: 'var(--card-background)',
                  color: 'var(--text-primary)',
                  border: '1px solid var(--card-border)'
                }}
                placeholder="Type your name to confirm"
              />
              <div className="flex gap-4">
                <button
                  onClick={handleConfirmDelete}
                  className={`flex-1 px-4 py-2 text-white rounded-lg transition-colors ${
                    confirmName === userName ? 'bg-red-600 hover:bg-red-700' : 'bg-gray-400 cursor-not-allowed'
                  }`}
                  disabled={confirmName !== userName}
                >
                  Delete All Data
                </button>
                <button
                  onClick={() => {
                    setShowDeleteConfirm(false)
                    setConfirmName('')
                  }}
                  className="flex-1 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 