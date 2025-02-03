'use client';

import { useState, useEffect } from 'react';
import { getAllMarkdownFiles } from '@/lib/markdown';
import LessonContent from './components/LessonContent';
import LessonNavigation from './components/LessonNavigation';

export default function LessonsPage() {
  const [selectedLesson, setSelectedLesson] = useState('1');
  const [lessonContent, setLessonContent] = useState('');
  const [loading, setLoading] = useState(true);
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
        
        <div className="flex gap-8">
          <div className="w-1/4">
            <LessonNavigation
              lessons={lessons}
              selectedLesson={selectedLesson}
              onSelectLesson={setSelectedLesson}
            />
          </div>
          
          <div className="w-3/4">
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