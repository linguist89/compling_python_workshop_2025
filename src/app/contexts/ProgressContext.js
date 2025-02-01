'use client'
import { createContext, useContext, useState, useEffect } from 'react';

const ProgressContext = createContext();

const TOTAL_LESSONS = 3; // Total number of lessons in the course
const LESSON_WEIGHT = 100 / TOTAL_LESSONS; // Each lesson is worth 33.33% of total progress

const initialProgressState = {
  lessons: {
    1: { completedSections: 0, totalSections: 0 },
    2: { completedSections: 0, totalSections: 0 },
    3: { completedSections: 0, totalSections: 0 }
  }
};

export function ProgressProvider({ children }) {
  const [progress, setProgress] = useState(initialProgressState);

  useEffect(() => {
    // Load progress from localStorage on mount
    const savedProgress = localStorage.getItem('progress');
    if (savedProgress) {
      try {
        const parsed = JSON.parse(savedProgress);
        // Ensure the parsed data has the correct structure
        if (parsed && parsed.lessons) {
          setProgress(parsed);
        } else {
          setProgress(initialProgressState);
        }
      } catch (e) {
        console.error('Error parsing saved progress:', e);
        setProgress(initialProgressState);
      }
    }
  }, []);

  const markSectionComplete = (lessonId) => {
    if (!lessonId) return;
    
    setProgress(prev => {
      const lesson = prev?.lessons?.[lessonId];
      if (!lesson) return prev;

      const newProgress = {
        ...prev,
        lessons: {
          ...prev.lessons,
          [lessonId]: {
            ...lesson,
            completedSections: lesson.completedSections + 1
          }
        }
      };
      localStorage.setItem('progress', JSON.stringify(newProgress));
      return newProgress;
    });
  };

  const setTotalSections = (lessonId, total) => {
    if (!lessonId) return;

    setProgress(prev => {
      const newProgress = {
        ...prev,
        lessons: {
          ...prev.lessons,
          [lessonId]: {
            ...prev.lessons?.[lessonId],
            totalSections: total
          }
        }
      };
      localStorage.setItem('progress', JSON.stringify(newProgress));
      return newProgress;
    });
  };

  const getProgress = () => {
    // Calculate overall percentage based on all lessons contributing equally
    if (!progress?.lessons) return 0;

    let totalProgress = 0;
    
    // Each lesson contributes equally to the total progress
    Object.entries(progress.lessons).forEach(([_, lesson]) => {
      if (lesson && lesson.totalSections > 0) {
        // Calculate this lesson's contribution to the total progress
        const lessonCompletion = (lesson.completedSections / lesson.totalSections) * LESSON_WEIGHT;
        totalProgress += lessonCompletion;
      }
    });

    return Math.floor(totalProgress);
  };

  const getLessonProgress = (lessonId) => {
    const lesson = progress?.lessons?.[lessonId];
    if (!lesson || lesson.totalSections === 0) return 0;
    return Math.floor((lesson.completedSections / lesson.totalSections) * 100);
  };

  const resetProgress = () => {
    setProgress(initialProgressState);
    localStorage.removeItem('progress');
  };

  return (
    <ProgressContext.Provider value={{
      markSectionComplete,
      setTotalSections,
      getProgress,
      getLessonProgress,
      resetProgress,
    }}>
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
} 