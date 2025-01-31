'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useProgress } from '@/app/contexts/ProgressContext'
import ProgressBar from '@/app/components/ProgressBar'

const lessonTitles = {
  '1': 'Introduction to Python',
  '2': 'Flow Control',
  '3': 'Pandas and Matplotlib'
}

export default function Navbar() {
  const [userName, setUserName] = useState('')
  const pathname = usePathname()
  const { getAllProgress } = useProgress()
  const allProgress = getAllProgress()

  useEffect(() => {
    const savedName = localStorage.getItem('userName')
    if (savedName) {
      setUserName(savedName)
    }
  }, [])

  const calculateOverallProgress = () => {
    const totalLessons = Object.keys(lessonTitles).length
    let completedLessons = 0
    let totalPercentage = 0
    let totalSections = 0
    let completedSections = 0

    Object.keys(allProgress.totalProgress).forEach(lessonId => {
      const progress = allProgress.totalProgress[lessonId]
      totalPercentage += progress.percentage
      totalSections += progress.total
      completedSections += progress.completed
      if (progress.percentage === 100) {
        completedLessons++
      }
    })

    return {
      completedLessons,
      totalLessons,
      averagePercentage: totalPercentage / totalLessons,
      totalSections,
      completedSections
    }
  }

  const { averagePercentage, completedSections, totalSections } = calculateOverallProgress()

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
              <div className="flex items-center space-x-4">
                <div className="flex flex-col" style={{ minWidth: '200px' }}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                      Overall Progress
                    </span>
                    <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                      {completedSections}/{totalSections} sections
                    </span>
                  </div>
                  <ProgressBar percentage={averagePercentage} height="6px" />
                </div>
                <Link 
                  href="/personalize" 
                  className="px-4 py-2 rounded-lg border transition-all duration-300 whitespace-nowrap"
                  style={{
                    borderColor: 'var(--interactive-hover)',
                    color: 'var(--text-accent)',
                    backgroundColor: pathname === '/personalize' 
                      ? 'var(--interactive-hover)10' 
                      : 'transparent',
                  }}
                >
                  Settings
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
} 