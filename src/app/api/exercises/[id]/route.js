import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export async function GET(request, context) {
  const id = context.params.id;
  
  try {
    const filePath = path.join(process.cwd(), 'markdownContent', 'exercises', `${id}.md`);
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { content } = matter(fileContent);
    
    return NextResponse.json({ content });
  } catch (error) {
    console.error(`Error reading exercise file ${id}:`, error);
    return NextResponse.json(
      { error: 'Exercise not found' },
      { status: 404 }
    );
  }
} 