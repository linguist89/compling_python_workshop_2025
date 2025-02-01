'use client'

import { useParams } from 'next/navigation'
import { useState, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism'

const exerciseTitles = {
  '1': 'String and List Manipulation',
  '2': 'Grade Calculator',
  '3': 'COVID-19 Data Analysis'
};

export default function ExercisePage() {
  const params = useParams()
  const id = params.id
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function loadContent() {
      try {
        const response = await fetch(`/api/exercises/${id}`)
        if (!response.ok) {
          throw new Error('Exercise not found')
        }
        const data = await response.json()
        setContent(data.content)
        setLoading(false)
      } catch (error) {
        setError(error.message)
        setLoading(false)
      }
    }
    loadContent()
  }, [id])

  if (loading) {
    return (
      <div className="min-h-screen py-12" style={{ backgroundColor: 'var(--color-dark)' }}>
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>Loading exercise...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error || !exerciseTitles[id]) {
    return (
      <div className="min-h-screen py-12" style={{ backgroundColor: 'var(--color-dark)' }}>
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-red-500">Exercise not found</h1>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-12" style={{ backgroundColor: 'var(--color-dark)' }}>
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 
            className="text-4xl font-bold mb-8"
            style={{
              background: 'linear-gradient(to right, var(--text-accent), var(--color-secondary))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            {exerciseTitles[id]}
          </h1>
          
          <div 
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
                        borderRadius: '0.25em',
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
          </div>

          <div className="mt-12">
            <a
              href="/exercises"
              className="px-6 py-3 rounded-lg font-medium transition-all duration-300"
              style={{
                backgroundColor: 'var(--card-background)',
                borderColor: 'var(--text-accent)',
                color: 'var(--text-accent)',
                border: '1px solid'
              }}
            >
              Back to Exercises
            </a>
          </div>
        </div>
      </div>
    </div>
  )
} 