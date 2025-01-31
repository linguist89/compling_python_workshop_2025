'use client'

import { useState, useEffect } from 'react'
import { useTheme } from '@/components/ThemeProvider'

const DEFAULT_FONT_SIZE = 16
const DEFAULT_THEME = 'neon'

export default function PersonalizePage() {
  const [userName, setUserName] = useState('')
  const [fontSize, setFontSize] = useState(DEFAULT_FONT_SIZE)
  const { themes, currentTheme, updateTheme } = useTheme()

  useEffect(() => {
    const savedName = localStorage.getItem('userName')
    const savedFontSize = localStorage.getItem('fontSize')
    if (savedName) {
      setUserName(savedName)
    }
    if (savedFontSize) {
      setFontSize(parseInt(savedFontSize))
      document.documentElement.style.fontSize = `${savedFontSize}px`
    }
  }, [])

  const handleThemeChange = (themeKey) => {
    updateTheme(themeKey)
  }

  const adjustFontSize = (change) => {
    const newSize = Math.max(12, Math.min(24, fontSize + change))
    setFontSize(newSize)
    document.documentElement.style.fontSize = `${newSize}px`
    localStorage.setItem('fontSize', newSize.toString())
  }

  const resetToDefaults = () => {
    // Reset font size
    setFontSize(DEFAULT_FONT_SIZE)
    document.documentElement.style.fontSize = `${DEFAULT_FONT_SIZE}px`
    localStorage.setItem('fontSize', DEFAULT_FONT_SIZE.toString())
    
    // Reset theme
    updateTheme(DEFAULT_THEME)
    
    // Reset username (optional - uncomment if you want to reset this too)
    // localStorage.removeItem('userName')
    // setUserName('')
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 
        className="text-4xl font-bold mb-8"
        style={{
          background: 'linear-gradient(to right, var(--text-accent), var(--color-secondary))',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}
      >
        Personalize Your Experience, {userName}!
      </h1>

      <div className="space-y-8">
        {/* Theme Selection */}
        <section 
          style={{ 
            backgroundColor: 'var(--card-background)',
            borderColor: 'var(--card-border)',
            boxShadow: 'var(--card-shadow)'
          }} 
          className="rounded-lg p-6 border transition-all duration-300"
        >
          <h2 
            className="text-2xl font-semibold mb-6"
            style={{ color: 'var(--text-primary)' }}
          >
            Choose Your Theme
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(themes).map(([key, theme]) => (
              <button
                key={key}
                onClick={() => handleThemeChange(key)}
                className="rounded-lg border transition-all duration-300"
                style={{
                  borderColor: currentTheme.name === theme.name 
                    ? 'var(--interactive-hover)'
                    : 'var(--card-border)',
                  backgroundColor: currentTheme.name === theme.name 
                    ? 'var(--interactive-hover)10'
                    : 'transparent',
                }}
              >
                <div className="p-4 space-y-3">
                  <div 
                    className="h-24 rounded-lg"
                    style={{
                      background: `linear-gradient(to right, ${theme.primary.background}, ${theme.primary.dark})`
                    }}
                  />
                  <div className="flex items-center justify-between">
                    <span 
                      style={{ color: 'var(--text-primary)' }}
                      className="font-medium"
                    >
                      {theme.name}
                    </span>
                    {currentTheme.name === theme.name && (
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

        {/* Font Size Adjustment */}
        <section 
          style={{ 
            backgroundColor: 'var(--card-background)',
            borderColor: 'var(--card-border)',
            boxShadow: 'var(--card-shadow)'
          }} 
          className="rounded-lg p-6 border transition-all duration-300"
        >
          <h2 
            className="text-2xl font-semibold mb-6"
            style={{ color: 'var(--text-primary)' }}
          >
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
              <div className="text-xs">
                <code className="bg-opacity-20 rounded px-1" style={{ backgroundColor: 'var(--text-accent)20' }}>
                  This is code or technical text
                </code>
              </div>
            </div>
          </div>
        </section>

        {/* Reset Button */}
        <div className="flex justify-center pt-4">
          <button
            onClick={resetToDefaults}
            className="px-6 py-3 rounded-lg font-medium transition-all duration-300"
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
    </div>
  )
} 