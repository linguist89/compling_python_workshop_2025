'use client'
import { createContext, useContext, useState, useEffect } from 'react';

const ProgressContext = createContext();

export function ProgressProvider({ children }) {
  const [progress, setProgress] = useState({
    completedSections: {},
    totalProgress: {},
  });

  useEffect(() => {
    // Load progress from localStorage on mount
    const savedProgress = localStorage.getItem('lessonProgress');
    if (savedProgress) {
      setProgress(JSON.parse(savedProgress));
    }
  }, []);

  const markSectionComplete = (lessonId, sectionIndex) => {
    setProgress(prev => {
      const newProgress = {
        ...prev,
        completedSections: {
          ...prev.completedSections,
          [lessonId]: {
            ...(prev.completedSections[lessonId] || {}),
            [sectionIndex]: true
          }
        }
      };

      // Store total sections per lesson in totalProgress
      newProgress.totalProgress = {
        ...prev.totalProgress,
        [lessonId]: {
          total: prev.totalProgress[lessonId]?.total || 0,
          completed: Object.keys(newProgress.completedSections[lessonId] || {}).length
        }
      };

      // Save to localStorage
      localStorage.setItem('lessonProgress', JSON.stringify(newProgress));
      return newProgress;
    });
  };

  const setTotalSections = (lessonId, total) => {
    setProgress(prev => {
      const completedCount = Object.keys(prev.completedSections[lessonId] || {}).length;
      const newProgress = {
        ...prev,
        totalProgress: {
          ...prev.totalProgress,
          [lessonId]: {
            total,
            completed: completedCount
          }
        }
      };
      localStorage.setItem('lessonProgress', JSON.stringify(newProgress));
      return newProgress;
    });
  };

  const getProgress = (lessonId) => {
    return {
      completedSections: progress.completedSections[lessonId] || {},
      totalProgress: progress.totalProgress[lessonId] || { total: 0, completed: 0 }
    };
  };

  const getAllProgress = () => {
    return progress;
  };

  const resetProgress = () => {
    const initialProgress = {
      completedSections: {},
      totalProgress: {},
    };
    setProgress(initialProgress);
    localStorage.removeItem('lessonProgress');
  };

  const getOverallProgress = () => {
    let totalSections = 0;
    let completedSections = 0;

    // Sum up all sections and completed sections across all lessons
    Object.values(progress.totalProgress).forEach(lessonProgress => {
      totalSections += lessonProgress.total;
      completedSections += lessonProgress.completed;
    });

    // Calculate overall percentage
    return totalSections > 0 ? Math.floor((completedSections / totalSections) * 100) : 0;
  };

  return (
    <ProgressContext.Provider value={{
      markSectionComplete,
      setTotalSections,
      getProgress,
      getAllProgress,
      resetProgress,
      getOverallProgress
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