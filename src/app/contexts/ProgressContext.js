'use client'
import { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';

export const ProgressContext = createContext();

const TOTAL_LESSONS = 3; // Total number of lessons in the course
const LESSON_WEIGHT = 100 / TOTAL_LESSONS; // Each lesson is worth 33.33% of total progress

const initialProgressState = {
  lessons: {
    1: { completedSections: 0, totalSections: 0 },
    2: { completedSections: 0, totalSections: 0 },
    3: { completedSections: 0, totalSections: 0 }
  },
  hasReachedCompletion: false
};

export function ProgressProvider({ children }) {
  const [progress, setProgress] = useState(initialProgressState);
  const completionCallbackRef = useRef(null);

  useEffect(() => {
    // Load progress from localStorage on mount
    const savedProgress = localStorage.getItem('progress');
    if (savedProgress) {
      try {
        const parsed = JSON.parse(savedProgress);
        // Ensure the parsed data has the correct structure
        if (parsed && parsed.lessons) {
          setProgress(prev => ({
            ...parsed,
            hasReachedCompletion: parsed.hasReachedCompletion || false
          }));
        } else {
          setProgress(initialProgressState);
        }
      } catch (e) {
        console.error('Error parsing saved progress:', e);
        setProgress(initialProgressState);
      }
    }
  }, []);

  const markSectionComplete = useCallback((lessonId) => {
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

      // Calculate if this completion brings us to 100%
      let totalProgress = 0;
      Object.entries(newProgress.lessons).forEach(([_, lesson]) => {
        if (lesson && lesson.totalSections > 0) {
          const lessonCompletion = (lesson.completedSections / lesson.totalSections) * LESSON_WEIGHT;
          totalProgress += lessonCompletion;
        }
      });

      // If we just reached 100% and haven't shown completion before
      if (totalProgress >= 100 && !prev.hasReachedCompletion) {
        newProgress.hasReachedCompletion = true;
        // Schedule the callback to run after the render phase
        if (completionCallbackRef.current) {
          Promise.resolve().then(() => {
            if (completionCallbackRef.current) {
              completionCallbackRef.current();
            }
          });
        }
      }

      localStorage.setItem('progress', JSON.stringify(newProgress));
      return newProgress;
    });
  }, []);

  // Update setProgress to handle completion checks
  const updateProgress = useCallback((newState) => {
    setProgress(prev => {
      const updatedProgress = typeof newState === 'function' ? newState(prev) : newState;
      
      // Calculate total progress
      let totalProgress = 0;
      Object.entries(updatedProgress.lessons).forEach(([_, lesson]) => {
        if (lesson && lesson.totalSections > 0) {
          const lessonCompletion = (lesson.completedSections / lesson.totalSections) * LESSON_WEIGHT;
          totalProgress += lessonCompletion;
        }
      });

      // Check for completion
      if (totalProgress >= 100 && !updatedProgress.hasReachedCompletion) {
        updatedProgress.hasReachedCompletion = true;
        // Schedule the callback to run after the render phase
        if (completionCallbackRef.current) {
          Promise.resolve().then(() => {
            if (completionCallbackRef.current) {
              completionCallbackRef.current();
            }
          });
        }
      }

      localStorage.setItem('progress', JSON.stringify(updatedProgress));
      return updatedProgress;
    });
  }, []);

  const setTotalSections = useCallback((lessonId, total) => {
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
  }, []);

  const getProgress = useCallback(() => {
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
  }, [progress]);

  const getLessonProgress = useCallback((lessonId) => {
    const lesson = progress?.lessons?.[lessonId];
    if (!lesson || lesson.totalSections === 0) return 0;
    return Math.floor((lesson.completedSections / lesson.totalSections) * 100);
  }, [progress]);

  const resetProgress = useCallback(() => {
    setProgress({
      ...initialProgressState,
      hasReachedCompletion: false
    });
    localStorage.removeItem('progress');
  }, []);

  const registerCompletionCallback = useCallback((callback) => {
    completionCallbackRef.current = callback;
  }, []);

  const contextValue = {
    progress,
    setProgress: updateProgress,
    markSectionComplete,
    setTotalSections,
    getProgress,
    getLessonProgress,
    resetProgress,
    registerCompletionCallback,
  };

  return (
    <ProgressContext.Provider value={contextValue}>
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  const context = useContext(ProgressContext);
  if (context === undefined) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
} 