import './globals.css'
import { Inter, Fira_Code } from 'next/font/google'
import WelcomePopup from '@/components/WelcomePopup'
import Welcome from '@/components/Welcome'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ThemeProvider from '@/components/ThemeProvider'
import { ProgressProvider } from './contexts/ProgressContext'

const inter = Inter({ subsets: ['latin'] })
const firaCode = Fira_Code({ subsets: ['latin'] })

export const metadata = {
  title: 'Python CompLing Workshop 2025',
  description: 'Interactive Python Learning Hub for Computational Linguistics',
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    apple: [
      { url: '/logo.svg' }
    ]
  }
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="apple-touch-icon" href="/logo.svg" />
      </head>
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <ThemeProvider>
          <ProgressProvider>
            <div className="min-h-screen flex flex-col bg-gradient-to-br from-[var(--color-background)] to-[var(--color-dark)]">
              <Navbar />
              <main className="flex-grow container mx-auto px-4 py-8">
                <Welcome />
                {children}
              </main>
              <Footer />
              <WelcomePopup />
            </div>
          </ProgressProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
