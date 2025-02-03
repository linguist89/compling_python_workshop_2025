import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// Helper function to get all lessons
const getAllLessons = () => {
  const lessonsDirectory = path.join(process.cwd(), 'markdownContent', 'lessons');
  const lessonFiles = fs.readdirSync(lessonsDirectory);
  
  const lessons = lessonFiles.map(filename => {
    const filePath = path.join(lessonsDirectory, filename);
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { content } = matter(fileContent);
    const id = filename.replace('.md', '');
    
    return {
      id,
      content
    };
  });
  
  // Sort lessons by ID
  return lessons.sort((a, b) => parseInt(a.id) - parseInt(b.id));
};

export async function GET(request, { params }) {
  try {
    const { id } = params;  // No need to await, params is synchronously available
    
    // If id is 'all', return all lessons
    if (id === 'all') {
      const lessons = getAllLessons();
      return NextResponse.json({ lessons });
    }
    
    // Otherwise, return a single lesson
    const filePath = path.join(process.cwd(), 'markdownContent', 'lessons', `${id}.md`);
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { content } = matter(fileContent);
    
    return NextResponse.json({ content });
  } catch (error) {
    console.error(`Error in lessons API:`, error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch lesson' },
      { status: error.code === 'ENOENT' ? 404 : 500 }
    );
  }
} 