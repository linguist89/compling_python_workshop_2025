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
    <div className="min-h-screen bg-gray-900">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-white mb-8">Python Workshop Lessons</h1>
          <div className="space-y-4">
            {lessons
              .sort((a, b) => parseInt(a.id) - parseInt(b.id))
              .map((lesson) => (
                <Link 
                  key={lesson.id}
                  href={`/lessons/${lesson.id}`}
                  className="block p-6 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors border border-gray-700"
                >
                  <h2 className="text-xl font-semibold text-white">
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