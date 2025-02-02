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
  const { id } = params;
  
  // If id is 'all', return all lessons
  if (id === 'all') {
    try {
      const lessons = getAllLessons();
      return NextResponse.json({ lessons });
    } catch (error) {
      console.error('Error reading lesson files:', error);
      return NextResponse.json(
        { error: 'Failed to fetch lessons' },
        { status: 500 }
      );
    }
  }
  
  // Otherwise, return a single lesson
  try {
    const filePath = path.join(process.cwd(), 'markdownContent', 'lessons', `${id}.md`);
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { content } = matter(fileContent);
    
    return NextResponse.json({ content });
  } catch (error) {
    console.error(`Error reading markdown file ${id}:`, error);
    return NextResponse.json(
      { error: 'Lesson not found' },
      { status: 404 }
    );
  }
} 