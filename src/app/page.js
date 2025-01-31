import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-blue-600 text-white py-20">
        <div className="container mx-auto">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold mb-6">
              Master Python for Computational Linguistics
            </h1>
            <p className="text-xl mb-8">
              Join our interactive workshop to learn Python programming with a focus on
              computational linguistics. Perfect for beginners and intermediate learners.
            </p>
            <a
              href="/lessons"
              className="bg-accent hover:bg-accent/90 text-white px-8 py-3 rounded-lg inline-block transition-colors text-lg font-semibold"
            >
              Start Learning
            </a>
          </div>
        </div>
      </section>

      {/* Course Overview */}
      <section className="py-16 bg-white">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">What You'll Learn</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-secondary rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Python Fundamentals</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Variables and Data Types</li>
                <li>• Control Flow</li>
                <li>• Functions and Modules</li>
                <li>• Object-Oriented Programming</li>
              </ul>
            </div>
            <div className="p-6 bg-secondary rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Data Analysis</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Pandas DataFrames</li>
                <li>• Data Cleaning</li>
                <li>• Statistical Analysis</li>
                <li>• Data Visualization</li>
              </ul>
            </div>
            <div className="p-6 bg-secondary rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Practical Projects</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Text Processing</li>
                <li>• Corpus Analysis</li>
                <li>• Data Visualization</li>
                <li>• Real-world Applications</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose This Workshop?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Interactive Learning</h3>
              <p className="text-gray-600">Practice with real-time code execution and instant feedback</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Comprehensive Content</h3>
              <p className="text-gray-600">Well-structured lessons covering fundamentals to advanced topics</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Community Support</h3>
              <p className="text-gray-600">Learn together with peers and get help when needed</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Hands-on Projects</h3>
              <p className="text-gray-600">Apply your knowledge with real-world computational linguistics projects</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Start Your Python Journey?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join our workshop and master Python programming for computational linguistics.
            Start learning today with our interactive platform.
          </p>
          <a
            href="/lessons"
            className="bg-accent hover:bg-accent/90 text-white px-8 py-3 rounded-lg inline-block transition-colors text-lg font-semibold"
          >
            Begin Your First Lesson
          </a>
        </div>
      </section>
    </div>
  );
}
