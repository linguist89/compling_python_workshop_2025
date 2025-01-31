'use client'

import Link from 'next/link'

export default function Footer() {
  return (
    <footer style={{
      backgroundColor: 'var(--footer-background)',
      borderColor: 'var(--footer-border)',
    }} className="border-t py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <h3 
              className="text-xl font-bold mb-4"
              style={{
                background: `linear-gradient(to right, var(--text-accent), var(--color-secondary))`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Python CompLing Workshop
            </h3>
            <p style={{ color: 'var(--footer-text)' }}>
              Learn Python for Computational Linguistics
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4" style={{ color: 'var(--text-accent)' }}>
              Quick Links
            </h4>
            <ul className="space-y-3">
              {[
                { href: '/lessons', label: 'Lessons' },
                { href: '/exercises', label: 'Exercises' },
                { href: '/projects', label: 'Projects' },
                { href: '/resources', label: 'Resources' },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="transition-colors duration-300"
                    style={{
                      color: 'var(--footer-text)',
                      ':hover': { color: 'var(--footer-hoverLink)' }
                    }}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4" style={{ color: 'var(--text-accent)' }}>
              Connect
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="https://github.com/chcaa"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors duration-300"
                  style={{
                    color: 'var(--footer-text)',
                    ':hover': { color: 'var(--footer-hoverLink)' }
                  }}
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="transition-colors duration-300"
                  style={{
                    color: 'var(--footer-text)',
                    ':hover': { color: 'var(--footer-hoverLink)' }
                  }}
                >
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 text-center" style={{ borderTopColor: 'var(--footer-border)' }}>
          <p style={{ color: 'var(--text-muted)' }}>
            &copy; {new Date().getFullYear()} Python CompLing Workshop. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
} 