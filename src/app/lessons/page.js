'use client';

import { useState, useEffect } from 'react';
import { getAllMarkdownFiles } from '@/lib/markdown';
import LessonContent from './components/LessonContent';
import LessonNavigation from './components/LessonNavigation';
import ResourcesPopup from './components/ResourcesPopup';

export default function LessonsPage() {
  const [selectedLesson, setSelectedLesson] = useState('1');
  const [lessonContent, setLessonContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [showResources, setShowResources] = useState(false);
  const lessons = getAllMarkdownFiles();

  useEffect(() => {
    const fetchLessonContent = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/lessons/${selectedLesson}`);
        if (!response.ok) {
          throw new Error(`Failed to load lesson ${selectedLesson}`);
        }
        const data = await response.json();
        setLessonContent(data.content);
      } catch (error) {
        console.error('Error loading lesson:', error);
        setLessonContent('Failed to load lesson content. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchLessonContent();
  }, [selectedLesson]);

  return (
    <div className="min-h-screen p-8" style={{ backgroundColor: 'var(--color-background)' }}>
      <div className="max-w-7xl mx-auto">
        <h1 
          className="text-3xl font-bold mb-8"
          style={{
            background: 'var(--gradient-heading)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}
        >
          Python Programming Lessons
        </h1>
        
        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-1/4">
            <LessonNavigation
              lessons={lessons}
              selectedLesson={selectedLesson}
              onSelectLesson={setSelectedLesson}
            />
            
            {/* Resources Button */}
            <button
              onClick={() => setShowResources(true)}
              className="w-full mt-6 px-4 py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
              style={{
                backgroundColor: 'var(--card-background)',
                borderColor: 'var(--card-border)',
                border: '1px solid',
                color: 'var(--text-accent)'
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
              Resources
            </button>

            <ResourcesPopup 
              show={showResources}
              onClose={() => setShowResources(false)}
            />
          </div>
          
          <div className="w-full md:w-3/4">
            <div 
              className="rounded-lg p-6"
              style={{
                backgroundColor: 'var(--card-background)',
                borderColor: 'var(--card-border)',
                border: '1px solid'
              }}
            >
              {loading ? (
                <div className="animate-pulse">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                </div>
              ) : (
                <LessonContent 
                  content={lessonContent}
                  lessonId={selectedLesson}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 