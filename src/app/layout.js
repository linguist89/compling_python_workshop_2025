import './globals.css'
import { Inter, Fira_Code } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })
const firaCode = Fira_Code({ subsets: ['latin'] })

export const metadata = {
  title: 'Python CompLing Workshop 2025',
  description: 'Interactive Python Learning Hub for Computational Linguistics',
}

function Navbar() {
  return (
    <nav className="backdrop-blur-md bg-[#0A192F]/90 border-b border-[#00E6E6]/20 sticky top-0 z-50">
      <div className="container mx-auto py-4">
        <div className="flex items-center justify-between">
          <a href="/" className="text-2xl font-bold heading-gradient hover:opacity-80 transition-all duration-300">PyCL Workshop</a>
          <div className="space-x-6">
            <a href="/lessons" className="neon-link">Lessons</a>
            <a href="/exercises" className="neon-link">Exercises</a>
            <a href="/projects" className="neon-link">Projects</a>
            <a href="/resources" className="neon-link">Resources</a>
          </div>
        </div>
      </div>
    </nav>
  )
}

function Footer() {
  return (
    <footer className="bg-[#050B18] border-t border-[#00E6E6]/20 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <h3 className="text-xl font-bold text-[#00E6E6] mb-4">Python CompLing Workshop</h3>
            <p className="text-[#E6FFFF]/70">Learn Python for Computational Linguistics</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-[#00E6E6] mb-4">Quick Links</h4>
            <ul className="space-y-3">
              <li><a href="/lessons" className="text-[#E6FFFF]/70 hover:text-[#00E6E6] transition-colors">Lessons</a></li>
              <li><a href="/exercises" className="text-[#E6FFFF]/70 hover:text-[#00E6E6] transition-colors">Exercises</a></li>
              <li><a href="/projects" className="text-[#E6FFFF]/70 hover:text-[#00E6E6] transition-colors">Projects</a></li>
              <li><a href="/resources" className="text-[#E6FFFF]/70 hover:text-[#00E6E6] transition-colors">Resources</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-[#00E6E6] mb-4">Connect</h4>
            <ul className="space-y-3">
              <li><a href="https://github.com/chcaa" className="text-[#E6FFFF]/70 hover:text-[#00E6E6] transition-colors">GitHub</a></li>
              <li><a href="#" className="text-[#E6FFFF]/70 hover:text-[#00E6E6] transition-colors">Contact Us</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-[#00E6E6]/10 text-center">
          <p className="text-[#E6FFFF]/50">&copy; {new Date().getFullYear()} Python CompLing Workshop. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#0A192F] to-[#050B18]">
          <Navbar />
          <main className="flex-grow container mx-auto px-4 py-8">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
