'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism'

const lessonTitles = {
  '1': 'Introduction to Python',
  '2': 'Flow Control',
  '3': 'Pandas and Matplotlib'
}

export default function LessonContent({ content, lessonId }) {
  const [userName, setUserName] = useState('')
  const router = useRouter()
  const currentLessonId = parseInt(lessonId)
  const maxLessonId = Object.keys(lessonTitles).length
  const hasNextLesson = currentLessonId < maxLessonId

  useEffect(() => {
    const savedName = localStorage.getItem('userName')
    if (savedName) {
      setUserName(savedName)
    }
  }, [])

  const goToNextLesson = () => {
    if (hasNextLesson) {
      router.push(`/lessons/${currentLessonId + 1}`)
    }
  }

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <header className="mb-12">
            <h1 
              className="text-4xl font-bold mb-4"
              style={{
                background: 'linear-gradient(to right, var(--text-accent), var(--color-secondary))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              {`${lessonId}. ${lessonTitles[lessonId]}`}
            </h1>
            {userName && (
              <p 
                className="text-lg"
                style={{ color: 'var(--text-secondary)' }}
              >
                Welcome to your lesson, {userName}! Let's learn something new.
              </p>
            )}
          </header>

          <article 
            className="prose prose-lg max-w-none"
            style={{
              '--tw-prose-body': 'var(--text-primary)',
              '--tw-prose-headings': 'var(--text-accent)',
              '--tw-prose-lead': 'var(--text-secondary)',
              '--tw-prose-links': 'var(--text-accent)',
              '--tw-prose-bold': 'var(--text-primary)',
              '--tw-prose-counters': 'var(--text-accent)',
              '--tw-prose-bullets': 'var(--text-accent)',
              '--tw-prose-hr': 'var(--card-border)',
              '--tw-prose-quotes': 'var(--text-primary)',
              '--tw-prose-quote-borders': 'var(--text-accent)',
              '--tw-prose-captions': 'var(--text-secondary)',
              '--tw-prose-code': 'var(--text-primary)',
              '--tw-prose-pre-code': 'var(--text-inverse)',
              '--tw-prose-pre-bg': 'var(--card-background)',
              '--tw-prose-th-borders': 'var(--card-border)',
              '--tw-prose-td-borders': 'var(--card-border)'
            }}
          >
            <ReactMarkdown
              components={{
                code({node, inline, className, children, ...props}) {
                  const match = /language-(\w+)/.exec(className || '')
                  return !inline && match ? (
                    <div className="rounded-lg overflow-hidden">
                      <SyntaxHighlighter
                        {...props}
                        children={String(children).replace(/\n$/, '')}
                        style={atomDark}
                        language={match[1]}
                        PreTag="div"
                      />
                    </div>
                  ) : (
                    <code
                      {...props}
                      className={className}
                      style={{
                        backgroundColor: 'var(--card-background)',
                        padding: '0.2em 0.4em',
                        borderRadius: '0.25rem',
                        fontSize: '0.875em'
                      }}
                    >
                      {children}
                    </code>
                  )
                }
              }}
            >
              {content}
            </ReactMarkdown>
          </article>

          {/* Navigation */}
          <div className="mt-12 flex justify-between items-center">
            <a
              href="/lessons"
              className="px-6 py-3 rounded-lg font-medium transition-all duration-300"
              style={{
                backgroundColor: 'var(--card-background)',
                borderColor: 'var(--text-accent)',
                color: 'var(--text-accent)',
                border: '1px solid'
              }}
            >
              Back to Lessons
            </a>
            {hasNextLesson && (
              <button
                onClick={goToNextLesson}
                className="px-6 py-3 rounded-lg font-medium transition-all duration-300 flex items-center space-x-2"
                style={{
                  backgroundColor: 'var(--card-background)',
                  borderColor: 'var(--text-accent)',
                  color: 'var(--text-accent)',
                  border: '1px solid'
                }}
              >
                <span>Next Lesson</span>
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-5 w-5" 
                  viewBox="0 0 20 20" 
                  fill="currentColor"
                >
                  <path 
                    fillRule="evenodd" 
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" 
                    clipRule="evenodd" 
                  />
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
} 