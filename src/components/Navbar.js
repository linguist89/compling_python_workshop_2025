'use client'

import { useState, useEffect } from 'react'

export default function Navbar() {
  const [userName, setUserName] = useState('')

  useEffect(() => {
    const savedName = localStorage.getItem('userName')
    if (savedName) {
      setUserName(savedName)
    }
  }, [])

  return (
    <nav className="backdrop-blur-md bg-[#0A192F]/90 border-b border-[#00E6E6]/20 sticky top-0 z-50">
      <div className="container mx-auto py-4">
        <div className="flex items-center justify-between">
          <a href="/" className="text-2xl font-bold heading-gradient hover:opacity-80 transition-all duration-300">PyCL Workshop</a>
          <div className="flex items-center space-x-6">
            <a href="/lessons" className="neon-link">Lessons</a>
            <a href="/exercises" className="neon-link">Exercises</a>
            <a href="/projects" className="neon-link">Projects</a>
            <a href="/resources" className="neon-link">Resources</a>
            {userName && (
              <a 
                href="/personalize" 
                className="ml-6 px-4 py-2 rounded-lg border border-[#00E6E6]/30 
                         text-[#00E6E6] hover:bg-[#00E6E6]/10 transition-all duration-300"
              >
                Personalize your experience, {userName}
              </a>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
} 