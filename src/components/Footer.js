'use client'

export default function Footer() {
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