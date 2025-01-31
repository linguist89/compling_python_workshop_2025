import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[#0A192F] opacity-50"></div>
        <div className="container mx-auto relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-6xl font-bold mb-6 heading-gradient float-animation">
              Master Python for Computational Linguistics
            </h1>
            <p className="text-xl mb-8 text-[#E6FFFF]/90">
              Join our interactive workshop to learn Python programming with a focus on
              computational linguistics. Perfect for beginners and intermediate learners.
            </p>
            <a
              href="/lessons"
              className="btn-accent hover-glow text-lg"
            >
              Start Learning
            </a>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-10">
          <div className="w-full h-full bg-[url('/grid.svg')] bg-repeat"></div>
        </div>
      </section>

      {/* Course Overview */}
      <section className="py-16">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 heading-gradient">What You'll Learn</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="tech-card hover-glow">
              <h3 className="text-xl font-semibold mb-4 text-[#00E6E6]">Python Fundamentals</h3>
              <ul className="space-y-2 text-[#E6FFFF]/80">
                <li className="flex items-center space-x-2">
                  <span className="text-[#00E6E6]">•</span>
                  <span>Variables and Data Types</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="text-[#00E6E6]">•</span>
                  <span>Control Flow</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="text-[#00E6E6]">•</span>
                  <span>Functions and Modules</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="text-[#00E6E6]">•</span>
                  <span>Object-Oriented Programming</span>
                </li>
              </ul>
            </div>
            <div className="tech-card hover-glow">
              <h3 className="text-xl font-semibold mb-4 text-[#00E6E6]">Data Analysis</h3>
              <ul className="space-y-2 text-[#E6FFFF]/80">
                <li className="flex items-center space-x-2">
                  <span className="text-[#00E6E6]">•</span>
                  <span>Pandas DataFrames</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="text-[#00E6E6]">•</span>
                  <span>Data Cleaning</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="text-[#00E6E6]">•</span>
                  <span>Statistical Analysis</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="text-[#00E6E6]">•</span>
                  <span>Data Visualization</span>
                </li>
              </ul>
            </div>
            <div className="tech-card hover-glow">
              <h3 className="text-xl font-semibold mb-4 text-[#00E6E6]">Practical Projects</h3>
              <ul className="space-y-2 text-[#E6FFFF]/80">
                <li className="flex items-center space-x-2">
                  <span className="text-[#00E6E6]">•</span>
                  <span>Text Processing</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="text-[#00E6E6]">•</span>
                  <span>Corpus Analysis</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="text-[#00E6E6]">•</span>
                  <span>Data Visualization</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="text-[#00E6E6]">•</span>
                  <span>Real-world Applications</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 heading-gradient">Why Choose This Workshop?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="tech-card hover-glow text-center">
              <div className="w-16 h-16 bg-[#00E6E6]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-[#00E6E6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-[#00E6E6]">Interactive Learning</h3>
              <p className="text-[#E6FFFF]/80">Practice with real-time code execution and instant feedback</p>
            </div>
            <div className="tech-card hover-glow text-center">
              <div className="w-16 h-16 bg-[#00E6E6]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-[#00E6E6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-[#00E6E6]">Comprehensive Content</h3>
              <p className="text-[#E6FFFF]/80">Well-structured lessons covering fundamentals to advanced topics</p>
            </div>
            <div className="tech-card hover-glow text-center">
              <div className="w-16 h-16 bg-[#00E6E6]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-[#00E6E6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-[#00E6E6]">Community Support</h3>
              <p className="text-[#E6FFFF]/80">Learn together with peers and get help when needed</p>
            </div>
            <div className="tech-card hover-glow text-center">
              <div className="w-16 h-16 bg-[#00E6E6]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-[#00E6E6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-[#00E6E6]">Hands-on Projects</h3>
              <p className="text-[#E6FFFF]/80">Apply your knowledge with real-world computational linguistics projects</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A192F] to-[#112240]"></div>
        <div className="container mx-auto text-center relative z-10">
          <h2 className="text-3xl font-bold mb-6 heading-gradient">Ready to Start Your Python Journey?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-[#E6FFFF]/90">
            Join our workshop and master Python programming for computational linguistics.
            Start learning today with our interactive platform.
          </p>
          <a
            href="/lessons"
            className="btn-accent hover-glow text-lg"
          >
            Begin Your First Lesson
          </a>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-1/2 opacity-10">
          <div className="w-full h-full bg-[url('/circuit.svg')] bg-repeat-x bg-bottom"></div>
        </div>
      </section>
    </div>
  );
}
