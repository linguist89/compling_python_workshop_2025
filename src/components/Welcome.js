'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'

export default function Welcome() {
  const [name, setName] = useState('')
  const pathname = usePathname()

  useEffect(() => {
    const savedName = localStorage.getItem('userName')
    if (savedName) {
      setName(savedName)
    }
  }, [])

  if (!name) return null

  const getWelcomeMessage = () => {
    switch (pathname) {
      case '/':
        return `Welcome back, ${name}! Ready to continue your Python journey?`
      case '/lessons':
        return `Hi ${name}! Here are your Python lessons for today.`
      case '/exercises':
        return `Ready to practice, ${name}? Let's solve some Python challenges!`
      case '/projects':
        return `Hey ${name}! Check out these exciting Python projects.`
      case '/resources':
        return `Hi ${name}! Here are some helpful resources for your learning journey.`
      default:
        if (pathname.startsWith('/lessons/')) {
          return `Let's learn something new, ${name}!`
        }
        if (pathname.startsWith('/exercises/')) {
          return `Time to code, ${name}! You've got this!`
        }
        if (pathname.startsWith('/projects/')) {
          return `Ready to build something amazing, ${name}?`
        }
        return `Welcome, ${name}!`
    }
  }

  return (
    <div 
      className="rounded-lg p-4 mb-8 border transition-all duration-300"
      style={{ 
        backgroundColor: 'var(--card-background)',
        borderColor: 'var(--card-border)',
        boxShadow: 'var(--card-shadow)'
      }}
    >
      <p 
        className="text-lg"
        style={{ color: 'var(--text-primary)' }}
      >
        {getWelcomeMessage()}
      </p>
    </div>
  )
} 