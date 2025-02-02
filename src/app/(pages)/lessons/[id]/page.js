import { Suspense } from 'react';
import { getMarkdownContent } from './page.server';
import LessonContent from './LessonContent';

export default async function LessonPage({ params }) {
  try {
    const content = await getMarkdownContent(params.id);
    
    if (!content) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>
            Lesson not found
          </p>
        </div>
      );
    }

    return (
      <Suspense fallback={
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>
            Loading lesson...
          </p>
        </div>
      }>
        <LessonContent content={content} />
      </Suspense>
    );
  } catch (error) {
    console.error('Error loading lesson:', error);
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>
          Error loading lesson
        </p>
      </div>
    );
  }
} 