'use client'
import { createContext, useContext, useState, useEffect } from 'react';

const ProgressContext = createContext();

export function ProgressProvider({ children }) {
  const [progress, setProgress] = useState({
    completedSections: 0,
    totalSections: 0,
  });

  useEffect(() => {
    // Load progress from localStorage on mount
    const savedProgress = localStorage.getItem('progress');
    if (savedProgress) {
      setProgress(JSON.parse(savedProgress));
    }
  }, []);

  const markSectionComplete = () => {
    setProgress(prev => {
      const newProgress = {
        ...prev,
        completedSections: prev.completedSections + 1
      };
      localStorage.setItem('progress', JSON.stringify(newProgress));
      return newProgress;
    });
  };

  const setTotalSections = (total) => {
    setProgress(prev => {
      // Add to the existing total sections count
      const newProgress = {
        ...prev,
        totalSections: prev.totalSections + total
      };
      localStorage.setItem('progress', JSON.stringify(newProgress));
      return newProgress;
    });
  };

  const getProgress = () => {
    // Calculate percentage based on completed sections out of total sections
    return progress.totalSections > 0 
      ? Math.floor((progress.completedSections / progress.totalSections) * 100)
      : 0;
  };

  const resetProgress = () => {
    const initialProgress = {
      completedSections: 0,
      totalSections: 0,
    };
    setProgress(initialProgress);
    localStorage.removeItem('progress');
  };

  return (
    <ProgressContext.Provider value={{
      markSectionComplete,
      setTotalSections,
      getProgress,
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