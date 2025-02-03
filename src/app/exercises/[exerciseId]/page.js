import { promises as fs } from 'fs';
import path from 'path';
import ExerciseContent from '../components/ExerciseContent';

export async function generateStaticParams() {
  return [
    { exerciseId: '1' },
    { exerciseId: '2' },
    { exerciseId: '3' }
  ];
}

export default async function ExercisePage({ params }) {
  const { exerciseId } = params;
  
  // Read the markdown content
  const markdownPath = path.join(process.cwd(), 'markdownContent', 'exercises', `${exerciseId}_exercises.md`);
  const content = await fs.readFile(markdownPath, 'utf8');

  return (
    <main className="container mx-auto px-4 py-8 max-w-5xl">
      <ExerciseContent content={content} />
    </main>
  );
} 