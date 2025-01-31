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

      // Calculate total progress for the lesson
      const totalSections = prev.totalProgress[lessonId]?.total || 0;
      const completedCount = Object.keys(newProgress.completedSections[lessonId] || {}).length;
      
      newProgress.totalProgress = {
        ...prev.totalProgress,
        [lessonId]: {
          total: totalSections,
          completed: completedCount,
          percentage: totalSections > 0 ? (completedCount / totalSections) * 100 : 0
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
            completed: completedCount,
            percentage: (completedCount / total) * 100
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
      totalProgress: progress.totalProgress[lessonId] || { total: 0, completed: 0, percentage: 0 }
    };
  };

  const getAllProgress = () => {
    return progress;
  };

  return (
    <ProgressContext.Provider value={{
      markSectionComplete,
      setTotalSections,
      getProgress,
      getAllProgress
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