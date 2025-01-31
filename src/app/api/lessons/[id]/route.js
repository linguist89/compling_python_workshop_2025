import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export async function GET(request, { params }) {
  const { id } = params;
  
  try {
    const filePath = path.join(process.cwd(), 'markdownContent', `${id}.md`);
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