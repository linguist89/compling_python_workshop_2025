'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { getMarkdownContent } from '@/lib/markdown'

const lessonTitles = {
  '1': 'Introduction to Python',
  '2': 'Flow Control',
  '3': 'Pandas and Matplotlib'
}

export default function LessonPage() {
  const [content, setContent] = useState('')
  const [userName, setUserName] = useState('')
  const params = useParams()

  useEffect(() => {
    const savedName = localStorage.getItem('userName')
    if (savedName) {
      setUserName(savedName)
    }

    try {
      const lessonContent = getMarkdownContent(params.id)
      setContent(lessonContent)
    } catch (error) {
      console.error('Error loading lesson content:', error)
      setContent('# Lesson Not Found\n\nSorry, this lesson could not be found.')
    }
  }, [params.id])

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
              {`${params.id}. ${lessonTitles[params.id]}`}
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
        </div>
      </div>
    </div>
  )
} 