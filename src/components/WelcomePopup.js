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
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-[#112240] rounded-lg p-8 max-w-md w-full mx-4 shadow-xl border border-[#00E6E6]/20">
        <h2 className="text-2xl font-bold text-[#00E6E6] mb-4">Welcome to PyCL Workshop!</h2>
        <p className="text-[#E6FFFF]/80 mb-6">Please tell us your name so we can personalize your experience.</p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            className="w-full p-3 rounded-lg bg-[#0A192F] border border-[#00E6E6]/30 text-[#E6FFFF] 
                     placeholder:text-[#E6FFFF]/50 focus:outline-none focus:border-[#00E6E6] mb-4"
            autoFocus
          />
          <button
            type="submit"
            disabled={!name.trim()}
            className="w-full bg-[#00E6E6] text-[#0A192F] py-3 px-6 rounded-lg font-medium
                     hover:bg-[#00E6E6]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Get Started
          </button>
        </form>
      </div>
    </div>
  )
} 