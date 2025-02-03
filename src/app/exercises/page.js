import { promises as fs } from 'fs';
import path from 'path';
import Link from 'next/link';

export default async function ExercisesPage() {
  // Get all exercise files
  const exercisesDir = path.join(process.cwd(), 'markdownContent', 'exercises');
  const files = await fs.readdir(exercisesDir);
  const exerciseFiles = files.filter(file => file.endsWith('_exercises.md'));

  // Read the first line (title) from each file
  const exercises = await Promise.all(
    exerciseFiles.map(async (file) => {
      const content = await fs.readFile(path.join(exercisesDir, file), 'utf8');
      const title = content.split('\n')[0].replace('# ', '');
      const exerciseId = file.split('_')[0];
      return { id: exerciseId, title };
    })
  );

  // Sort exercises by ID
  exercises.sort((a, b) => parseInt(a.id) - parseInt(b.id));

  return (
    <main className="container mx-auto px-4 py-8 max-w-5xl">
      <h1 
        className="text-4xl font-bold mb-8" 
        style={{ color: 'var(--text-primary)' }}
      >
        Python Exercises
      </h1>
      
      <div className="grid gap-6">
        {exercises.map((exercise) => (
          <Link 
            key={exercise.id}
            href={`/exercises/${exercise.id}`}
            className="block p-6 rounded-lg border transition-all duration-300 hover:scale-[1.02]"
            style={{
              backgroundColor: 'var(--lesson-background)',
              borderColor: 'var(--card-border)',
              color: 'var(--text-primary)'
            }}
          >
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold" style={{ color: 'var(--text-accent)' }}>
                {exercise.title}
              </h2>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-6 w-6" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M9 5l7 7-7 7" 
                />
              </svg>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
} 