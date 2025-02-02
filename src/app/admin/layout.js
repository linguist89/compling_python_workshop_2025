import Link from 'next/link';
import ThemeProvider from '@/app/contexts/ThemeContext';
import { ProgressProvider } from '@/app/contexts/ProgressContext';

export default function AdminLayout({ children }) {
  return (
    <ThemeProvider>
      <ProgressProvider>
        <div style={{ backgroundColor: 'var(--color-background)' }} className="min-h-screen">
          <nav style={{ 
            backgroundColor: 'var(--navbar-background)',
            borderBottom: '1px solid var(--card-border)',
            boxShadow: 'var(--card-shadow)'
          }}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between h-16">
                <div className="flex">
                  <Link 
                    href="/admin" 
                    className="flex items-center px-4 transition-colors hover:opacity-80"
                    style={{ 
                      color: 'var(--text-accent)'
                    }}
                  >
                    Admin Home
                  </Link>
                  <Link 
                    href="/admin/siteComponents" 
                    className="flex items-center px-4 transition-colors hover:opacity-80"
                    style={{ 
                      color: 'var(--text-accent)'
                    }}
                  >
                    Components
                  </Link>
                </div>
                <Link 
                  href="/" 
                  className="flex items-center px-4 transition-colors hover:opacity-80"
                  style={{ 
                    color: 'var(--text-accent)'
                  }}
                >
                  Back to Main Site
                </Link>
              </div>
            </div>
          </nav>
          <div style={{ backgroundColor: 'var(--color-background)' }} className="min-h-screen">
            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
              {children}
            </main>
          </div>
        </div>
      </ProgressProvider>
    </ThemeProvider>
  );
} 