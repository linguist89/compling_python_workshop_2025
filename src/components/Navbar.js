'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navbar() {
  const [userName, setUserName] = useState('')
  const pathname = usePathname()

  useEffect(() => {
    const savedName = localStorage.getItem('userName')
    if (savedName) {
      setUserName(savedName)
    }
  }, [])

  return (
    <nav style={{
      backgroundColor: 'var(--navbar-background)',
      borderColor: 'var(--navbar-border)',
      backdropFilter: 'blur(8px)'
    }} className="sticky top-0 z-50 border-b">
      <div className="container mx-auto py-4">
        <div className="flex items-center justify-between">
          <Link 
            href="/" 
            className="text-2xl font-bold transition-all duration-300 hover:opacity-80"
            style={{
              background: `linear-gradient(to right, var(--text-accent), var(--color-secondary))`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            PyCL Workshop
          </Link>
          <div className="flex items-center space-x-6">
            {[
              { href: '/lessons', label: 'Lessons' },
              { href: '/exercises', label: 'Exercises' },
              { href: '/projects', label: 'Projects' },
              { href: '/resources', label: 'Resources' },
            ].map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="relative transition-colors duration-300"
                style={{
                  color: pathname === href ? 'var(--navbar-activeLink)' : 'var(--navbar-text)',
                }}
              >
                <span className="relative">
                  {label}
                  <span
                    className="absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-300"
                    style={{
                      backgroundColor: 'var(--navbar-hoverLink)',
                      width: pathname === href ? '100%' : '0',
                    }}
                  />
                </span>
              </Link>
            ))}
            {userName && (
              <Link 
                href="/personalize" 
                className="ml-6 px-4 py-2 rounded-lg border transition-all duration-300"
                style={{
                  borderColor: 'var(--interactive-hover)',
                  color: 'var(--text-accent)',
                  backgroundColor: pathname === '/personalize' 
                    ? 'var(--interactive-hover)10' 
                    : 'transparent',
                }}
              >
                Personalize your experience, {userName}
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
} 