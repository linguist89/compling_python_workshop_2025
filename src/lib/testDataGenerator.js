import { db } from './firebase';
import { doc, setDoc } from 'firebase/firestore';
import { quizQuestions } from './quizQuestions';
import CryptoJS from 'crypto-js';

const ENCRYPTION_KEY = 'pythonWorkshop2025';

// List of sample first names and last names for generating random names
const firstNames = [
  'Emma', 'Liam', 'Olivia', 'Noah', 'Ava', 'Ethan', 'Sophia', 'Mason',
  'Isabella', 'William', 'Mia', 'James', 'Charlotte', 'Benjamin', 'Amelia'
];

const lastNames = [
  'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller',
  'Davis', 'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez'
];

const countries = [
  { code: 'DK', name: 'Denmark' },
  { code: 'SE', name: 'Sweden' },
  { code: 'NO', name: 'Norway' },
  { code: 'FI', name: 'Finland' },
  { code: 'DE', name: 'Germany' },
  { code: 'FR', name: 'France' },
  { code: 'ES', name: 'Spain' },
  { code: 'IT', name: 'Italy' },
  { code: 'GB', name: 'United Kingdom' },
  { code: 'US', name: 'United States' },
  { code: 'CA', name: 'Canada' },
  { code: 'AU', name: 'Australia' },
  { code: 'NZ', name: 'New Zealand' },
  { code: 'JP', name: 'Japan' },
  { code: 'KR', name: 'South Korea' },
  { code: 'CN', name: 'China' },
  { code: 'BR', name: 'Brazil' },
  { code: 'AR', name: 'Argentina' },
  { code: 'MX', name: 'Mexico' },
  { code: 'ZA', name: 'South Africa' }
];

// Generate a random score for a specific lesson part
const getRandomPartScore = (part) => {
  switch (part) {
    case 'intro':
      return Math.floor(Math.random() * 2); // 0-1
    case 'basics':
      return Math.floor(Math.random() * 3); // 0-2
    case 'advanced':
      return Math.floor(Math.random() * 4); // 0-3
    default:
      return 0;
  }
};

// Generate random quiz answers based on actual quiz questions
const generateRandomQuizAnswers = () => {
  const selectedAnswers = {};
  let correctAnswers = 0;

  // Generate random answers and calculate score
  quizQuestions.forEach(question => {
    const randomAnswerIndex = Math.floor(Math.random() * question.options.length);
    selectedAnswers[question.id] = randomAnswerIndex;
    if (randomAnswerIndex === question.correctAnswer) {
      correctAnswers++;
    }
  });

  const score = (correctAnswers / quizQuestions.length) * 100;

  // Format quiz answers like in the Quiz component
  const formattedAnswers = quizQuestions.map(question => ({
    questionId: question.id,
    question: question.question,
    selectedAnswer: question.options[selectedAnswers[question.id]],
    correctAnswer: question.options[question.correctAnswer],
    isCorrect: selectedAnswers[question.id] === question.correctAnswer
  }));

  return {
    quizAnswers: formattedAnswers,
    quizScore: score,
    overallQuizScore: score,
    quizDone: true,
    quizCompletedAt: new Date().toISOString()
  };
};

// Generate a single student's data
const generateStudentData = async (index) => {
  const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
  const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
  const selectedCountry = countries[Math.floor(Math.random() * countries.length)];
  const name = `${firstName} ${lastName}`;
  
  // Generate quiz data
  const quizData = generateRandomQuizAnswers();
  
  // Create the Firestore data
  const firestoreData = {
    name: name,
    userCountry: {
      code: selectedCountry.code,
      name: selectedCountry.name
    },
    user_type: 'student',
    encryptedPassword: CryptoJS.AES.encrypt('1234', ENCRYPTION_KEY).toString(),
    ...quizData,
    progress: {
      hasReachedCompletion: true,
      lessons: {
        1: {
          completedSections: 7,
          totalSections: 7
        },
        2: {
          completedSections: 7,
          totalSections: 7
        },
        3: {
          completedSections: 4,
          totalSections: 4
        }
      }
    }
  };

  return firestoreData;
};

// Main function to generate and populate test data
export const generateTestStudents = async (count) => {
  const batch = [];
  
  for (let i = 0; i < count; i++) {
    const studentData = await generateStudentData(i);
    // Use the student's name as the document ID
    const userRef = doc(db, 'testUsers', studentData.name);
    batch.push(setDoc(userRef, studentData));
  }
  
  await Promise.all(batch);
  return count;
}; 