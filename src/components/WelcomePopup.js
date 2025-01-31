'use client'

import { useState, useEffect } from 'react'

export default function WelcomePopup() {
  const [isOpen, setIsOpen] = useState(false)
  const [name, setName] = useState('')

  useEffect(() => {
    const savedName = localStorage.getItem('userName')
    if (!savedName) {
      setIsOpen(true)
    }
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (name.trim()) {
      localStorage.setItem('userName', name.trim())
      setIsOpen(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50" style={{ backgroundColor: 'var(--color-dark)80' }}>
      <div 
        className="rounded-lg p-8 max-w-md w-full mx-4 border transition-all duration-300"
        style={{ 
          backgroundColor: 'var(--card-background)',
          borderColor: 'var(--card-border)',
          boxShadow: 'var(--card-shadow)'
        }}
      >
        <h2 
          className="text-2xl font-bold mb-4"
          style={{
            background: 'linear-gradient(to right, var(--text-accent), var(--color-secondary))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}
        >
          Welcome to PyCL Workshop!
        </h2>
        <p 
          className="mb-6"
          style={{ color: 'var(--text-secondary)' }}
        >
          Please tell us your name so we can personalize your experience.
        </p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            className="w-full p-3 rounded-lg mb-4 transition-all duration-300"
            style={{
              backgroundColor: 'var(--input-background)',
              borderColor: 'var(--input-border)',
              color: 'var(--input-text)',
              '::placeholder': { color: 'var(--input-placeholder)' }
            }}
            autoFocus
          />
          <button
            type="submit"
            disabled={!name.trim()}
            className="w-full py-3 px-6 rounded-lg font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              background: 'linear-gradient(to right, var(--color-accent), var(--color-secondary))',
              color: 'var(--text-inverse)',
              boxShadow: 'var(--effect-buttonHover)'
            }}
          >
            Get Started
          </button>
        </form>
      </div>
    </div>
  )
} 