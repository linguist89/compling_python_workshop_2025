'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import Laptop from './Laptop'
import { useProgress } from '../contexts/ProgressContext'

export default function Navbar() {
  const pathname = usePathname()
  const { getOverallProgress } = useProgress()
  const progress = getOverallProgress()

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

          {/* Progress Section */}
          <div className="flex items-center gap-8 flex-1 max-w-md mx-8">
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

          <div className="flex items-center gap-6">
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
        </div>
      </div>
    </nav>
  )
} 