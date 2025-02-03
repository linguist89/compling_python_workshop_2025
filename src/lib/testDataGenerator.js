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
  'DK', 'SE', 'NO', 'FI', 'DE', 'FR', 'ES', 'IT', 'GB', 'US',
  'CA', 'AU', 'NZ', 'JP', 'KR', 'CN', 'BR', 'AR', 'MX', 'ZA'
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
  const country = countries[Math.floor(Math.random() * countries.length)];
  const name = `${firstName} ${lastName}`;
  
  // Generate quiz data
  const quizData = generateRandomQuizAnswers();
  
  // Create the Firestore data
  const firestoreData = {
    name: name,
    country: country,
    user_type: 'student',
    encryptedPassword: CryptoJS.AES.encrypt('1234', ENCRYPTION_KEY).toString(),
    ...quizData,
    progress: {
      lesson1: {
        intro: getRandomPartScore('intro'),
        basics: getRandomPartScore('basics'),
        advanced: getRandomPartScore('advanced')
      },
      lesson2: {
        intro: getRandomPartScore('intro'),
        basics: getRandomPartScore('basics'),
        advanced: getRandomPartScore('advanced')
      },
      lesson3: {
        intro: getRandomPartScore('intro'),
        basics: getRandomPartScore('basics'),
        advanced: getRandomPartScore('advanced')
      }
    }
  };

  // Create localStorage data
  const localStorageData = {
    userName: name,
    user_type: 'student',
    country: country,
    quizDone: true,
    overallQuizScore: quizData.overallQuizScore,
    hasShownComplete: Math.random() < 0.5
  };

  // Save to localStorage
  localStorage.setItem('userDataPythonWorkshop', JSON.stringify(localStorageData));

  return firestoreData;
};

// Main function to generate and populate test data
export const generateTestStudents = async (count) => {
  const batch = [];
  
  for (let i = 0; i < count; i++) {
    const studentData = await generateStudentData(i);
    // Use the student's name as the document ID
    const userRef = doc(db, 'users', studentData.name);
    batch.push(setDoc(userRef, studentData));
  }
  
  await Promise.all(batch);
  return count;
}; 