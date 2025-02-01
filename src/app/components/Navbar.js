'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import Laptop from './Laptop'
import { useProgress } from '../contexts/ProgressContext'
import { useState } from 'react'

export default function Navbar() {
  const pathname = usePathname()
  const { getProgress } = useProgress()
  const progress = getProgress()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav 
      className="sticky top-0 z-40 border-b"
      style={{ 
        backgroundColor: 'var(--color-background)',
        borderColor: 'var(--card-border)'
      }}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-8 h-8">
              <Image
                src="/logo.svg"
                alt="PyCL Workshop Logo"
                fill
                priority
                className="transition-transform duration-300 group-hover:scale-110"
              />
            </div>
            <span 
              className="text-xl font-bold"
              style={{
                background: 'linear-gradient(to right, var(--text-accent), var(--color-secondary))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              PyCL Workshop
            </span>
          </Link>

          {/* Progress Section - Hidden on mobile */}
          <div className="hidden md:flex items-center gap-8 flex-1 max-w-md mx-8">
            <div className="relative w-32 h-16 -ml-4">
              <div className="absolute top-1/2 left-0 transform -translate-y-1/2 scale-[0.2]">
                <Laptop 
                  initialProgress={Math.min(progress || 0, 100)} 
                  color={progress >= 50 ? 'space' : 'silver'} 
                />
              </div>
            </div>
            <div className="flex-1 ml-4">
              <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                <div 
                  className="h-2.5 rounded-full transition-all duration-500"
                  style={{
                    width: `${Math.min(progress || 0, 100)}%`,
                    background: 'linear-gradient(to right, var(--text-accent), var(--color-secondary))'
                  }}
                ></div>
              </div>
              <div className="text-xs mt-1 text-center" style={{ color: 'var(--text-secondary)' }}>
                {Math.min(progress || 0, 100)}% Complete
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link
              href="/lessons"
              className="transition-colors duration-300"
              style={{
                color: pathname === '/lessons' ? 'var(--text-accent)' : 'var(--text-primary)',
                borderBottom: pathname === '/lessons' ? '2px solid var(--text-accent)' : 'none'
              }}
            >
              Lessons
            </Link>
            <Link
              href="/exercises"
              className="transition-colors duration-300"
              style={{
                color: pathname === '/exercises' ? 'var(--text-accent)' : 'var(--text-primary)',
                borderBottom: pathname === '/exercises' ? '2px solid var(--text-accent)' : 'none'
              }}
            >
              Exercises
            </Link>
            <Link
              href="/personalize"
              className="transition-colors duration-300"
              style={{
                color: pathname === '/personalize' ? 'var(--text-accent)' : 'var(--text-primary)',
                borderBottom: pathname === '/personalize' ? '2px solid var(--text-accent)' : 'none'
              }}
            >
              Settings
            </Link>
          </div>

          {/* Hamburger Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <div className="w-6 h-5 relative flex flex-col justify-between">
              <span 
                className={`w-full h-0.5 transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}
                style={{ backgroundColor: 'var(--text-primary)' }}
              />
              <span 
                className={`w-full h-0.5 transition-opacity duration-300 ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}
                style={{ backgroundColor: 'var(--text-primary)' }}
              />
              <span 
                className={`w-full h-0.5 transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}
                style={{ backgroundColor: 'var(--text-primary)' }}
              />
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        <div 
          className={`md:hidden transition-all duration-300 overflow-hidden ${isMenuOpen ? 'max-h-96' : 'max-h-0'}`}
          style={{ backgroundColor: 'var(--color-background)' }}
        >
          <div className="py-4 space-y-4">
            <Link
              href="/lessons"
              className="block px-4 py-2 transition-colors duration-300"
              style={{
                color: pathname === '/lessons' ? 'var(--text-accent)' : 'var(--text-primary)',
                backgroundColor: pathname === '/lessons' ? 'var(--color-hover)' : 'transparent'
              }}
              onClick={() => setIsMenuOpen(false)}
            >
              Lessons
            </Link>
            <Link
              href="/exercises"
              className="block px-4 py-2 transition-colors duration-300"
              style={{
                color: pathname === '/exercises' ? 'var(--text-accent)' : 'var(--text-primary)',
                backgroundColor: pathname === '/exercises' ? 'var(--color-hover)' : 'transparent'
              }}
              onClick={() => setIsMenuOpen(false)}
            >
              Exercises
            </Link>
            <Link
              href="/personalize"
              className="block px-4 py-2 transition-colors duration-300"
              style={{
                color: pathname === '/personalize' ? 'var(--text-accent)' : 'var(--text-primary)',
                backgroundColor: pathname === '/personalize' ? 'var(--color-hover)' : 'transparent'
              }}
              onClick={() => setIsMenuOpen(false)}
            >
              Settings
            </Link>

            {/* Mobile Progress Display */}
            <div className="px-4 pt-4 border-t" style={{ borderColor: 'var(--card-border)' }}>
              <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                <div 
                  className="h-2.5 rounded-full transition-all duration-500"
                  style={{
                    width: `${Math.min(progress || 0, 100)}%`,
                    background: 'linear-gradient(to right, var(--text-accent), var(--color-secondary))'
                  }}
                ></div>
              </div>
              <div className="text-xs mt-1 text-center" style={{ color: 'var(--text-secondary)' }}>
                {Math.min(progress || 0, 100)}% Complete
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
} 