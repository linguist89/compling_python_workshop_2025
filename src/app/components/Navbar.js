'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Image from 'next/image'

export default function Navbar() {
  const pathname = usePathname()

  return (
    <nav 
      className="sticky top-0 z-40 backdrop-blur-sm border-b"
      style={{ 
        backgroundColor: 'var(--color-background)80',
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