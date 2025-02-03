'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import Laptop from './Laptop'
import { useProgress } from '../contexts/ProgressContext'
import { useState, useEffect } from 'react'
import GenerateTestDataPopup from './GenerateTestDataPopup'

export default function Navbar() {
  const pathname = usePathname()
  const { getProgress } = useProgress()
  const progress = getProgress()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [quizDone, setQuizDone] = useState(false)
  const [isTeacher, setIsTeacher] = useState(false)
  const [showTestDataPopup, setShowTestDataPopup] = useState(false)

  useEffect(() => {
    const savedData = localStorage.getItem('userDataPythonWorkshop')
    if (savedData) {
      const parsedData = JSON.parse(savedData)
      setQuizDone(parsedData.quizDone || false)
      setIsTeacher(parsedData.user_type === 'teacher')
    }
  }, [pathname]) // Re-check when pathname changes

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
              <>
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
                <button
                  onClick={() => setShowTestDataPopup(true)}
                  className="transition-colors duration-300 text-blue-500 hover:text-blue-600"
                >
                  Generate Test Data
                </button>
              </>
            )}
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
                <button
                  onClick={() => {
                    setShowTestDataPopup(true)
                    setIsMenuOpen(false)
                  }}
                  className="block w-full text-left px-4 py-2 transition-colors duration-300 text-blue-500 hover:text-blue-600"
                >
                  Generate Test Data
                </button>
              </>
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