'use client'

import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0" style={{ backgroundColor: 'var(--color-dark)', opacity: 0.5 }}></div>
        <div className="container mx-auto relative z-10">
          <div className="max-w-3xl">
            <h1 
              className="text-6xl font-bold mb-6"
              style={{
                color: 'var(--text-accent)',
                animation: 'float 6s ease-in-out infinite'
              }}
            >
              Master Python for Computational Linguistics
            </h1>
            <p style={{ color: 'var(--text-secondary)' }} className="text-xl mb-8">
              Join our interactive workshop to learn Python programming with a focus on
              computational linguistics. Perfect for beginners and intermediate learners.
            </p>
            <a
              href="/lessons"
              className="inline-block px-8 py-3 rounded-lg text-lg font-medium transition-all duration-300"
              style={{
                backgroundColor: 'var(--card-background)',
                borderColor: 'var(--text-accent)',
                color: 'var(--text-accent)',
                border: '1px solid'
              }}
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
          <h2 
            className="text-3xl font-bold text-center mb-12"
            style={{ color: 'var(--text-accent)' }}
          >
            What You'll Learn
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Python Fundamentals',
                items: ['Variables and Data Types', 'Control Flow', 'Functions and Modules', 'Object-Oriented Programming']
              },
              {
                title: 'Data Analysis',
                items: ['Pandas DataFrames', 'Data Cleaning', 'Statistical Analysis', 'Data Visualization']
              },
              {
                title: 'Practical Projects',
                items: ['Text Processing', 'Corpus Analysis', 'Data Visualization', 'Real-world Applications']
              }
            ].map((section, index) => (
              <div 
                key={index}
                className="rounded-lg p-6"
                style={{
                  backgroundColor: 'var(--card-background)',
                  borderColor: 'var(--card-border)',
                  boxShadow: 'var(--card-shadow)',
                  border: '1px solid'
                }}
              >
                <h3 
                  className="text-xl font-semibold mb-4"
                  style={{ color: 'var(--text-accent)' }}
                >
                  {section.title}
                </h3>
                <ul className="space-y-2">
                  {section.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-center space-x-2">
                      <span style={{ color: 'var(--text-accent)' }}>•</span>
                      <span style={{ color: 'var(--text-secondary)' }}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto">
          <h2 
            className="text-3xl font-bold text-center mb-12"
            style={{ color: 'var(--text-accent)' }}
          >
            Why Choose This Workshop?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: (
                  <svg className="w-8 h-8" style={{ color: 'var(--text-accent)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                ),
                title: 'Interactive Learning',
                description: 'Learn by doing with hands-on exercises and real-time feedback'
              },
              {
                icon: (
                  <svg className="w-8 h-8" style={{ color: 'var(--text-accent)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                ),
                title: 'Community Support',
                description: 'Learn together with peers and get help when needed'
              },
              {
                icon: (
                  <svg className="w-8 h-8" style={{ color: 'var(--text-accent)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                  </svg>
                ),
                title: 'Hands-on Projects',
                description: 'Apply your knowledge with real-world computational linguistics projects'
              }
            ].map((feature, index) => (
              <div 
                key={index}
                className="rounded-lg p-6 text-center"
                style={{
                  backgroundColor: 'var(--card-background)',
                  borderColor: 'var(--card-border)',
                  boxShadow: 'var(--card-shadow)',
                  border: '1px solid'
                }}
              >
                <div 
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{ backgroundColor: 'var(--color-accent-muted)' }}
                >
                  {feature.icon}
                </div>
                <h3 
                  className="text-xl font-semibold mb-2"
                  style={{ color: 'var(--text-accent)' }}
                >
                  {feature.title}
                </h3>
                <p style={{ color: 'var(--text-secondary)' }}>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto text-center">
          <h2 
            className="text-3xl font-bold mb-8"
            style={{ color: 'var(--text-accent)' }}
          >
            Ready to Start Your Python Journey?
          </h2>
          <a
            href="/lessons/1"
            className="inline-block px-8 py-3 rounded-lg text-lg font-medium transition-all duration-300"
            style={{
              backgroundColor: 'var(--card-background)',
              borderColor: 'var(--text-accent)',
              color: 'var(--text-accent)',
              border: '1px solid'
            }}
          >
            Begin Your First Lesson
          </a>
        </div>
      </section>
    </div>
  );
}
