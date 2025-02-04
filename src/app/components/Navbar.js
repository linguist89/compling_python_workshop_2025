'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import Laptop from './Laptop'
import { useProgress } from '../contexts/ProgressContext'
import { useTheme } from '../contexts/ThemeContext'
import { useState, useEffect } from 'react'
import GenerateTestDataPopup from './GenerateTestDataPopup'

export default function Navbar() {
  const pathname = usePathname()
  const { getProgress } = useProgress()
  const { currentTheme = { isDark: true }, updateTheme = () => {} } = useTheme() || {}
  const progress = getProgress()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [quizDone, setQuizDone] = useState(false)
  const [isTeacher, setIsTeacher] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const [showTestDataPopup, setShowTestDataPopup] = useState(false)

  useEffect(() => {
    const savedData = localStorage.getItem('userDataPythonWorkshop')
    if (savedData) {
      const parsedData = JSON.parse(savedData)
      setQuizDone(parsedData.quizDone || false)
      setIsTeacher(parsedData.user_type === 'teacher')
      setIsAdmin(parsedData.user_type === 'admin')
    }
  }, [pathname]) // Re-check when pathname changes

  return (
    <nav 
      className="sticky top-0 z-40"
      style={{ 
        backgroundColor: 'var(--color-background)',
        borderBottomWidth: '1px',
        borderBottomStyle: 'solid',
        borderBottomColor: 'var(--card-border)'
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
            {!quizDone && (
              <Link
                href="/quiz"
                className="transition-colors duration-300"
                style={{
                  color: pathname === '/quiz' ? 'var(--text-accent)' : 'var(--text-primary)',
                  borderBottom: pathname === '/quiz' ? '2px solid var(--text-accent)' : 'none'
                }}
              >
                Quiz
              </Link>
            )}
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
            {isTeacher && (
              <Link
                href="/class-groups"
                className="transition-colors duration-300"
                style={{
                  color: pathname === '/class-groups' ? 'var(--text-accent)' : 'var(--text-primary)',
                  borderBottom: pathname === '/class-groups' ? '2px solid var(--text-accent)' : 'none'
                }}
              >
                Class Groups
              </Link>
            )}
            {isAdmin && (
              <button
                onClick={() => setShowTestDataPopup(true)}
                className="transition-colors duration-300 text-blue-500 hover:text-blue-600"
              >
                Generate Test Data
              </button>
            )}
            {/* Theme Toggle Button */}
            <button
              onClick={() => updateTheme?.(currentTheme?.isDark ? 'daylight' : 'neon')}
              className="p-2 rounded-lg transition-colors duration-300 hover:bg-opacity-10"
              style={{
                backgroundColor: 'var(--interactive-hover)',
                color: 'var(--text-primary)',
              }}
              aria-label="Toggle theme"
            >
              {currentTheme?.isDark ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              )}
            </button>
          </div>

          {/* Hamburger Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <div className="w-6 h-6 relative">
              {isMenuOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6" style={{ color: 'var(--text-primary)' }}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <div className="w-full h-full flex flex-col justify-between">
                  <span className="w-full h-0.5" style={{ backgroundColor: 'var(--text-primary)' }} />
                  <span className="w-full h-0.5" style={{ backgroundColor: 'var(--text-primary)' }} />
                  <span className="w-full h-0.5" style={{ backgroundColor: 'var(--text-primary)' }} />
                </div>
              )}
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
            {!quizDone && (
              <Link
                href="/quiz"
                className="block px-4 py-2 transition-colors duration-300"
                style={{
                  color: pathname === '/quiz' ? 'var(--text-accent)' : 'var(--text-primary)',
                  backgroundColor: pathname === '/quiz' ? 'var(--color-hover)' : 'transparent'
                }}
                onClick={() => setIsMenuOpen(false)}
              >
                Quiz
              </Link>
            )}
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

            {/* Mobile Theme Toggle */}
            <button
              onClick={() => updateTheme?.(currentTheme?.isDark ? 'daylight' : 'neon')}
              className="w-full flex items-center justify-between px-4 py-2 transition-colors duration-300"
              style={{
                color: 'var(--text-primary)',
                backgroundColor: 'transparent',
              }}
            >
              <span>Toggle Theme</span>
              {currentTheme?.isDark ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              )}
            </button>

            {isTeacher && (
              <>
                <Link
                  href="/class-groups"
                  className="block px-4 py-2 transition-colors duration-300"
                  style={{
                    color: pathname === '/class-groups' ? 'var(--text-accent)' : 'var(--text-primary)',
                    backgroundColor: pathname === '/class-groups' ? 'var(--color-hover)' : 'transparent'
                  }}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Class Groups
                </Link>
              </>
            )}
            {isAdmin && (
              <button
                onClick={() => {
                  setShowTestDataPopup(true)
                  setIsMenuOpen(false)
                }}
                className="block w-full text-left px-4 py-2 transition-colors duration-300 text-blue-500 hover:text-blue-600"
              >
                Generate Test Data
              </button>
            )}
          </div>
        </div>

        {/* Test Data Generation Popup */}
        <GenerateTestDataPopup
          isOpen={showTestDataPopup}
          onClose={() => setShowTestDataPopup(false)}
        />
      </div>
    </nav>
  )
} 