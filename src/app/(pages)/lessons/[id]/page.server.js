import matter from 'gray-matter';

export async function getMarkdownContent(id) {
  try {
    const fs = await import('fs/promises');
    const path = await import('path');
    
    const filePath = path.join(process.cwd(), 'markdownContent', `${id}.md`);
    const fileContent = await fs.readFile(filePath, 'utf8');
    const { content } = matter(fileContent);
    return content;
  } catch (error) {
    console.error(`Error reading markdown file ${id}:`, error);
    return null;
  }
} 