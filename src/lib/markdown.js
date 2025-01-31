import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// Get the markdown content directory path
const markdownDirectory = path.join(process.cwd(), 'markdownContent');

// Get all markdown files from the content directory
export function getAllMarkdownFiles() {
  const fileNames = fs.readdirSync(markdownDirectory);
  return fileNames.map((fileName) => {
    return {
      id: fileName.replace(/\.md$/, ''),
      fileName,
    };
  });
}

// Get markdown content by ID (filename without extension)
export function getMarkdownContent(id) {
  const fullPath = path.join(markdownDirectory, `${id}.md`);
  try {
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    
    // Use gray-matter to parse the markdown metadata
    const { data, content } = matter(fileContents);
    
    return {
      id,
      content,
      ...data,
    };
  } catch (error) {
    console.error(`Error reading markdown file ${id}:`, error);
    return null;
  }
}

// Get all lessons with their content
export function getAllLessons() {
  const files = getAllMarkdownFiles();
  const lessons = files.map((file) => {
    const lesson = getMarkdownContent(file.id);
    return {
      id: file.id,
      content: lesson.content,
      ...lesson,
    };
  });

  return lessons;
} 