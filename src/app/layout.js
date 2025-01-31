import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Python CompLing Workshop 2025',
  description: 'Interactive Python Learning Hub for Computational Linguistics',
}

function Navbar() {
  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto py-4">
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold text-primary">PyCL Workshop</div>
          <div className="space-x-6">
            <a href="/" className="hover:text-primary transition-colors">Home</a>
            <a href="/lessons" className="hover:text-primary transition-colors">Lessons</a>
            <a href="/exercises" className="hover:text-primary transition-colors">Exercises</a>
            <a href="/projects" className="hover:text-primary transition-colors">Projects</a>
            <a href="/resources" className="hover:text-primary transition-colors">Resources</a>
          </div>
        </div>
      </div>
    </nav>
  )
}

function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Python CompLing Workshop</h3>
            <p className="text-gray-400">Learn Python for Computational Linguistics</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="/lessons" className="hover:text-white transition-colors">Lessons</a></li>
              <li><a href="/exercises" className="hover:text-white transition-colors">Exercises</a></li>
              <li><a href="/projects" className="hover:text-white transition-colors">Projects</a></li>
              <li><a href="/resources" className="hover:text-white transition-colors">Resources</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Connect</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="https://github.com/chcaa" className="hover:text-white transition-colors">GitHub</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Python CompLing Workshop. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
