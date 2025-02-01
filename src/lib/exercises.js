import matter from 'gray-matter';

const exerciseTitles = {
  '1': 'String and List Manipulation',
  '2': 'Grade Calculator',
  '3': 'COVID-19 Data Analysis'
};

export function getAllExercises() {
  return Object.entries(exerciseTitles).map(([id, title]) => {
    return {
      id,
      title
    };
  });
}

export async function getExerciseContent(id) {
  try {
    const response = await fetch(`/api/exercises/${id}`);
    if (!response.ok) {
      throw new Error(`Failed to load exercise ${id}`);
    }
    const data = await response.json();
    return data.content;
  } catch (error) {
    console.error(`Error loading exercise ${id}:`, error);
    throw error;
  }
} 