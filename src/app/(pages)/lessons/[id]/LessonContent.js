'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { useProgress } from '@/app/contexts/ProgressContext'
import ProgressBar from '@/app/components/ProgressBar'
import UserNameWithFlag from '@/app/components/UserNameWithFlag'
import LaptopPopup from '@/app/components/LaptopPopup'

const lessonTitles = {
  '1': 'Introduction to Python',
  '2': 'Flow Control',
  '3': 'Pandas and Matplotlib'
}

const Section = ({ children, onComplete, isCompleted }) => (
  <div className="mb-12 p-6 rounded-lg bg-opacity-5 relative" style={{ 
    backgroundColor: 'var(--card-background)',
    border: '1px solid var(--card-border)',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
  }}>
    {children}
    <div className="mt-6 flex justify-end">
      <button
        onClick={onComplete}
        disabled={isCompleted}
        className="px-4 py-2 rounded-lg font-medium transition-all duration-300 flex items-center space-x-2"
        style={{
          backgroundColor: isCompleted ? 'var(--text-secondary)' : 'var(--text-accent)',
          color: 'white',
          opacity: isCompleted ? 0.7 : 1
        }}
      >
        {isCompleted ? (
          <>
            <span>Completed</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </>
        ) : (
          <span>Mark as Complete</span>
        )}
      </button>
    </div>
  </div>
);

export default function LessonContent({ content, lessonId }) {
  const [userName, setUserName] = useState('')
  const [showPopup, setShowPopup] = useState(false)
  const [showCompletionPopup, setShowCompletionPopup] = useState(false)
  const [completedSections, setCompletedSections] = useState({})
  const [processedContent, setProcessedContent] = useState({ introduction: '', subsections: [] })
  const router = useRouter()
  const currentLessonId = parseInt(lessonId)
  const maxLessonId = Object.keys(lessonTitles).length
  const hasNextLesson = currentLessonId < maxLessonId
  const { markSectionComplete, setTotalSections, getProgress, getLessonProgress, registerCompletionCallback, setProgress, resetProgress } = useProgress()
  const progress = getProgress()
  const lessonProgress = getLessonProgress(lessonId)

  // Process content on mount or when content changes
  useEffect(() => {
    // First, find the main heading and introduction
    const [mainSection, ...restContent] = content.split('\n# ');
    const mainContent = restContent[0] || mainSection; // If no # found, use entire content
    
    // Then split the rest by ##
    const sections = mainContent.split('\n## ');
    const introduction = sections[0];
    const subsections = sections.slice(1);
    
    setProcessedContent({ introduction, subsections });
    
    // Set total sections count (only counting subsections)
    setTotalSections(lessonId, subsections.length);
  }, [content, lessonId, setTotalSections]);

  // Handle user name and completion callback
  useEffect(() => {
    const savedName = localStorage.getItem('userName')
    if (savedName) {
      setUserName(savedName)
    }
  }, []);

  // Register completion callback
  useEffect(() => {
    const handleCompletion = () => {
      setShowCompletionPopup(true);
    };

    registerCompletionCallback(handleCompletion);
  }, [registerCompletionCallback]);

  const goToNextLesson = () => {
    if (hasNextLesson) {
      router.push(`/lessons/${currentLessonId + 1}`)
    }
  }

  const handleSectionComplete = (index) => {
    markSectionComplete(lessonId)
    setCompletedSections(prev => ({
      ...prev,
      [index]: true
    }))
    setShowPopup(true)
  }

  const renderMarkdown = (content) => (
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
  )

  // Add test functions to control progress
  const setProgressTo100 = () => {
    setProgress(prev => {
      const newProgress = {
        ...prev,
        lessons: {
          1: { completedSections: 10, totalSections: 10 },
          2: { completedSections: 10, totalSections: 10 },
          3: { completedSections: 10, totalSections: 10 }
        },
        hasReachedCompletion: false // Set to false to trigger completion celebration
      };
      localStorage.setItem('progress', JSON.stringify(newProgress));
      return newProgress;
    });
  };

  const setProgressTo0 = () => {
    resetProgress();
  };

  return (
    <div className="min-h-screen">
      <LaptopPopup 
        show={showPopup}
        progress={progress}
        onClose={() => setShowPopup(false)}
      />
      <LaptopPopup 
        show={showCompletionPopup}
        progress={100}
        onClose={() => setShowCompletionPopup(false)}
      />
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
            <div 
              className="text-lg"
              style={{ color: 'var(--text-secondary)' }}
            >
              Hi <UserNameWithFlag />! Here are your Python lessons for today.
            </div>
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
            <div className="mb-8">
              <div className="mb-4">
                <div className="flex justify-between mb-2">
                  <span style={{ color: 'var(--text-primary)' }}>Lesson Progress</span>
                  <span style={{ color: 'var(--text-secondary)' }}>
                    {lessonProgress}%
                  </span>
                </div>
                <ProgressBar percentage={lessonProgress} height="8px" />
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span style={{ color: 'var(--text-primary)' }}>Overall Course Progress</span>
                  <span style={{ color: 'var(--text-secondary)' }}>
                    {progress}%
                  </span>
                </div>
                <ProgressBar percentage={progress} height="12px" />
              </div>
            </div>

            {/* Main introduction section without completion button */}
            <div className="mb-12">
              {renderMarkdown(processedContent.introduction)}
            </div>
            
            {/* Subsections with completion buttons */}
            {processedContent.subsections.map((section, index) => (
              <Section 
                key={index}
                onComplete={() => handleSectionComplete(index)}
                isCompleted={completedSections[index]}
              >
                {renderMarkdown(`## ${section}`)}
              </Section>
            ))}
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