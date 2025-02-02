import { Suspense } from 'react';
import { getMarkdownContent } from './page.server';
import LessonContent from './LessonContent';

export default async function LessonPage({ params }) {
  // Ensure params.id is available before using it
  const lessonId = params?.id;
  if (!lessonId) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>
          Invalid lesson ID
        </p>
      </div>
    );
  }

  const content = await getMarkdownContent(lessonId);
  
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
      <LessonContent content={content} lessonId={lessonId} />
    </Suspense>
  );
} 