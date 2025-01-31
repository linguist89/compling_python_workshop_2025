'use client'

import { useState, useEffect } from 'react'
import { useProgress } from '@/app/contexts/ProgressContext'
import ProgressBar from '@/app/components/ProgressBar'
import CountrySelector from '@/app/components/CountrySelector'

const lessonTitles = {
  '1': 'Introduction to Python',
  '2': 'Flow Control',
  '3': 'Pandas and Matplotlib'
}

export default function UserSettings({ onClose }) {
  const [userName, setUserName] = useState('')
  const [fontSize, setFontSize] = useState('16px')
  const [selectedCountry, setSelectedCountry] = useState(null)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [confirmName, setConfirmName] = useState('')
  const { getAllProgress, resetProgress } = useProgress()
  const allProgress = getAllProgress()

  useEffect(() => {
    const savedName = localStorage.getItem('userName')
    const savedFontSize = localStorage.getItem('fontSize')
    const savedCountry = localStorage.getItem('userCountry')
    if (savedName) setUserName(savedName)
    if (savedFontSize) setFontSize(savedFontSize)
    if (savedCountry) setSelectedCountry(JSON.parse(savedCountry))
  }, [])

  const handleNameChange = (e) => {
    const newName = e.target.value
    setUserName(newName)
    localStorage.setItem('userName', newName)
  }

  const handleCountrySelect = (country) => {
    setSelectedCountry(country)
    localStorage.setItem('userCountry', JSON.stringify(country))
  }

  const handleDeleteData = () => {
    setShowDeleteConfirm(true)
  }

  const handleConfirmDelete = () => {
    if (confirmName === userName) {
      // Reset all data
      localStorage.removeItem('userName')
      localStorage.removeItem('fontSize')
      localStorage.removeItem('userCountry')
      resetProgress()
      
      // Reset states
      setUserName('')
      setFontSize('16px')
      setSelectedCountry(null)
      setShowDeleteConfirm(false)
      setConfirmName('')
      
      // Reset font size to default
      document.documentElement.style.setProperty('--base-font-size', '16px')
    }
  }

  const handleFontSizeChange = (e) => {
    const newSize = e.target.value
    setFontSize(newSize)
    localStorage.setItem('fontSize', newSize)
    document.documentElement.style.setProperty('--base-font-size', newSize)
  }

  const calculateOverallProgress = () => {
    const totalLessons = Object.keys(lessonTitles).length
    let completedLessons = 0
    let totalPercentage = 0

    Object.keys(allProgress.totalProgress).forEach(lessonId => {
      const progress = allProgress.totalProgress[lessonId]
      totalPercentage += progress.percentage
      if (progress.percentage === 100) {
        completedLessons++
      }
    })

    return {
      completedLessons,
      totalLessons,
      averagePercentage: totalPercentage / totalLessons
    }
  }

  const { completedLessons, totalLessons, averagePercentage } = calculateOverallProgress()

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div 
        className="bg-opacity-95 rounded-lg p-8 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto"
        style={{ backgroundColor: 'var(--color-background)' }}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>User Settings</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="space-y-6">
          {/* User Information */}
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

          {/* Font Size Settings */}
          <div>
            <label className="block mb-2 font-medium" style={{ color: 'var(--text-primary)' }}>
              Font Size
            </label>
            <select
              value={fontSize}
              onChange={handleFontSizeChange}
              className="w-full px-4 py-2 rounded-lg"
              style={{
                backgroundColor: 'var(--card-background)',
                color: 'var(--text-primary)',
                border: '1px solid var(--card-border)'
              }}
            >
              <option value="14px">Small</option>
              <option value="16px">Medium</option>
              <option value="18px">Large</option>
              <option value="20px">Extra Large</option>
            </select>
          </div>

          {/* Delete Data Section */}
          <div className="border-t border-b py-6 my-6" style={{ borderColor: 'var(--card-border)' }}>
            <h3 className="text-xl font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>
              Danger Zone
            </h3>
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

          {/* Progress Overview */}
          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>
              Your Progress
            </h3>
            
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

            {/* Individual Lesson Progress */}
            <div className="space-y-4">
              {Object.entries(lessonTitles).map(([id, title]) => {
                const progress = allProgress.totalProgress[id] || { percentage: 0, completed: 0, total: 0 }
                return (
                  <div key={id} className="p-4 rounded-lg" style={{ backgroundColor: 'var(--card-background)' }}>
                    <div className="flex justify-between mb-2">
                      <span style={{ color: 'var(--text-primary)' }}>{title}</span>
                      <span style={{ color: 'var(--text-secondary)' }}>
                        {progress.completed} of {progress.total} sections
                      </span>
                    </div>
                    <ProgressBar percentage={progress.percentage} />
                  </div>
                )
              })}
            </div>
          </div>

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
    </div>
  )
} 