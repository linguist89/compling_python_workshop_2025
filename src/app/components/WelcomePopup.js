'use client'

import { useState, useEffect } from 'react'
import CountrySelector from '@/app/components/CountrySelector'
import Flag from 'react-world-flags'
import FlagRain from '@/app/components/FlagRain'

export default function WelcomePopup() {
  const [isOpen, setIsOpen] = useState(false)
  const [name, setName] = useState('')
  const [selectedCountry, setSelectedCountry] = useState(null)
  const [showFlagRain, setShowFlagRain] = useState(false)

  useEffect(() => {
    const savedName = localStorage.getItem('userName')
    const savedCountry = localStorage.getItem('userCountry')
    if (!savedName || !savedCountry) {
      setIsOpen(true)
    }
    if (savedCountry) {
      try {
        setSelectedCountry(JSON.parse(savedCountry))
      } catch (e) {
        console.error('Error parsing saved country:', e)
      }
    }
    if (savedName) {
      setName(savedName)
    }
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (name.trim() && selectedCountry) {
      // First save to localStorage
      localStorage.setItem('userName', name.trim())
      localStorage.setItem('userCountry', JSON.stringify(selectedCountry))
      
      // Then show the animation
      setShowFlagRain(true)
      
      // Close the popup after the animation (increased to 4 seconds)
      setTimeout(() => {
        setIsOpen(false)
      }, 4000)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50" style={{ backgroundColor: 'var(--color-dark)80' }}>
      {showFlagRain && selectedCountry && (
        <FlagRain
          countryCode={selectedCountry.code}
          onAnimationComplete={() => setShowFlagRain(false)}
        />
      )}
      <div 
        className="rounded-lg p-8 max-w-md w-full mx-4 border transition-all duration-300"
        style={{ 
          backgroundColor: 'var(--card-background)',
          borderColor: 'var(--card-border)',
          boxShadow: 'var(--card-shadow)'
        }}
      >
        <h2 
          className="text-2xl font-bold mb-4 flex items-center gap-3"
          style={{
            background: 'linear-gradient(to right, var(--text-accent), var(--color-secondary))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}
        >
          Welcome to PyCL Workshop!
          {selectedCountry && (
            <Flag code={selectedCountry.code} className="w-6 h-6 rounded shadow-sm" />
          )}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label 
              className="block mb-2 font-medium"
              style={{ color: 'var(--text-primary)' }}
            >
              Your Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 rounded-lg"
              style={{
                backgroundColor: 'var(--card-background)',
                color: 'var(--text-primary)',
                border: '1px solid var(--card-border)'
              }}
              placeholder="Enter your name"
              required
            />
          </div>

          <div>
            <label 
              className="block mb-2 font-medium"
              style={{ color: 'var(--text-primary)' }}
            >
              Your Country
            </label>
            <CountrySelector
              selectedCountry={selectedCountry}
              onSelect={setSelectedCountry}
            />
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 rounded-lg font-medium transition-all duration-300"
            style={{
              backgroundColor: name.trim() && selectedCountry ? 'var(--text-accent)' : 'var(--text-muted)',
              color: 'var(--color-dark)',
              opacity: name.trim() && selectedCountry ? 1 : 0.7,
              cursor: name.trim() && selectedCountry ? 'pointer' : 'not-allowed'
            }}
            disabled={!name.trim() || !selectedCountry}
          >
            Get Started
          </button>
        </form>
      </div>
    </div>
  )
} 