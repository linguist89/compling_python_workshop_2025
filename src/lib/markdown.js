import matter from 'gray-matter';

const lessonTitles = {
  '1': 'Introduction to Python',
  '2': 'Flow Control',
  '3': 'Pandas and Matplotlib'
};

export function getAllMarkdownFiles() {
  return Object.entries(lessonTitles).map(([id, title]) => {
    return {
      id,
      title
    };
  });
}

// This function is now only used by the client components
export async function getMarkdownContent(id) {
  try {
    const response = await fetch(`/api/lessons/${id}`);
    if (!response.ok) {
      throw new Error(`Failed to load lesson ${id}`);
    }
    const data = await response.json();
    return data.content;
  } catch (error) {
    console.error(`Error loading lesson ${id}:`, error);
    throw error;
  }
} 