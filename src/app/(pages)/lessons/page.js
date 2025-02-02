'use client'

import { useState, useEffect } from 'react'
import { useProgress } from '@/app/contexts/ProgressContext'
import ProgressBar from '@/app/components/ProgressBar'
import LaptopPopup from '@/app/components/LaptopPopup'
import Link from 'next/link'

const lessonTitles = {
  '1': 'Introduction to Python',
  '2': 'Flow Control',
  '3': 'Pandas and Matplotlib'
}

export default function LessonsPage() {
  const { getProgress, getLessonProgress, setProgress, resetProgress, registerCompletionCallback } = useProgress()
  const [showCompletionPopup, setShowCompletionPopup] = useState(false)
  const progress = getProgress()

  // Register completion callback
  useEffect(() => {
    const handleCompletion = () => {
      setShowCompletionPopup(true);
    };

    registerCompletionCallback(handleCompletion);
    
    // Cleanup on unmount
    return () => registerCompletionCallback(null);
  }, [registerCompletionCallback]);

  // Test functions to control progress
  const setProgressTo100 = () => {
    // First reset to ensure clean state
    resetProgress();
    
    // Then set to 100% with a slight delay to ensure state update
    setTimeout(() => {
      setProgress({
        lessons: {
          1: { completedSections: 10, totalSections: 10 },
          2: { completedSections: 10, totalSections: 10 },
          3: { completedSections: 10, totalSections: 10 }
        },
        hasReachedCompletion: false // This will trigger the celebration
      });
    }, 100);
  };

  const setProgressTo0 = () => {
    setShowCompletionPopup(false); // Hide popup if visible
    resetProgress();
  };

  return (
    <div className="min-h-screen py-16">
      {/* Completion Popup */}
      <LaptopPopup 
        show={showCompletionPopup}
        progress={100}
        onClose={() => setShowCompletionPopup(false)}
      />

      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Test Controls */}
          <div className="mb-8 flex justify-end gap-2">
            <button
              onClick={setProgressTo100}
              className="px-4 py-2 rounded-lg font-medium text-sm transition-all duration-300 hover:opacity-80"
              style={{
                backgroundColor: 'var(--text-accent)',
                color: 'white',
              }}
            >
              Set Progress 100%
            </button>
            <button
              onClick={setProgressTo0}
              className="px-4 py-2 rounded-lg font-medium text-sm transition-all duration-300 hover:opacity-80"
              style={{
                backgroundColor: 'var(--text-secondary)',
                color: 'white',
              }}
            >
              Reset Progress (0%)
            </button>
          </div>

          <h1 
            className="text-4xl font-bold mb-8"
            style={{ color: 'var(--text-accent)' }}
          >
            Python Lessons
          </h1>

          <div className="mb-8">
            <div className="flex justify-between mb-2">
              <span style={{ color: 'var(--text-primary)' }}>Overall Course Progress</span>
              <span style={{ color: 'var(--text-secondary)' }}>{progress}%</span>
            </div>
            <ProgressBar percentage={progress} height="12px" />
          </div>

          <div className="grid gap-6">
            {Object.entries(lessonTitles).map(([id, title]) => {
              const lessonProgress = getLessonProgress(id);
              return (
                <Link 
                  key={id}
                  href={`/lessons/${id}`}
                  className="block p-6 rounded-lg transition-all duration-300"
                  style={{ 
                    backgroundColor: 'var(--card-background)',
                    border: '1px solid var(--card-border)',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                  }}
                >
                  <div className="flex justify-between items-center mb-4">
                    <h2 
                      className="text-2xl font-semibold"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      {`${id}. ${title}`}
                    </h2>
                    <span 
                      className="text-sm font-medium"
                      style={{ color: 'var(--text-secondary)' }}
                    >
                      {lessonProgress}%
                    </span>
                  </div>
                  <ProgressBar percentage={lessonProgress} height="8px" />
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  )
} 