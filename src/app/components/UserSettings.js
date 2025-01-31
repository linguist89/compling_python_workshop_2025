'use client'

import { useState, useEffect } from 'react'
import { useProgress } from '@/app/contexts/ProgressContext'
import ProgressBar from '@/app/components/ProgressBar'

const lessonTitles = {
  '1': 'Introduction to Python',
  '2': 'Flow Control',
  '3': 'Pandas and Matplotlib'
}

export default function UserSettings({ onClose }) {
  const [userName, setUserName] = useState('')
  const [fontSize, setFontSize] = useState('16px')
  const { getAllProgress } = useProgress()
  const allProgress = getAllProgress()

  useEffect(() => {
    const savedName = localStorage.getItem('userName')
    const savedFontSize = localStorage.getItem('fontSize')
    if (savedName) setUserName(savedName)
    if (savedFontSize) setFontSize(savedFontSize)
  }, [])

  const handleNameChange = (e) => {
    const newName = e.target.value
    setUserName(newName)
    localStorage.setItem('userName', newName)
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
        </div>
      </div>
    </div>
  )
} 