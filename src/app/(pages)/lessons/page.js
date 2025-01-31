'use client'

import Link from 'next/link';
import { getAllMarkdownFiles } from '@/lib/markdown';

const lessonTitles = {
  '1': 'Introduction to Python',
  '2': 'Flow Control',
  '3': 'Pandas and Matplotlib'
};

export default function LessonsIndex() {
  const lessons = getAllMarkdownFiles();

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--color-dark)' }}>
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 
            className="text-4xl font-bold mb-8"
            style={{
              background: 'linear-gradient(to right, var(--text-accent), var(--color-secondary))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            Python Workshop Lessons
          </h1>
          <div className="space-y-4">
            {lessons
              .sort((a, b) => parseInt(a.id) - parseInt(b.id))
              .map((lesson) => (
                <Link 
                  key={lesson.id}
                  href={`/lessons/${lesson.id}`}
                  className="block p-6 rounded-lg transition-all duration-300"
                  style={{
                    backgroundColor: 'var(--card-background)',
                    borderColor: 'var(--card-border)',
                    boxShadow: 'var(--card-shadow)',
                    ':hover': {
                      boxShadow: 'var(--effect-cardHover)',
                      transform: 'translateY(-2px)'
                    }
                  }}
                >
                  <h2 
                    className="text-xl font-semibold"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    {`${lesson.id}. ${lessonTitles[lesson.id]}`}
                  </h2>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
} 