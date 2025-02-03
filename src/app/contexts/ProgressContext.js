'use client'
import { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { db } from '@/lib/firebase';
import { doc, updateDoc, getDoc } from 'firebase/firestore';

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
  const [userName, setUserName] = useState('');
  const completionCallbackRef = useRef(null);

  useEffect(() => {
    // Load progress from userDataPythonWorkshop on mount
    const loadData = async () => {
      const savedData = localStorage.getItem('userDataPythonWorkshop');
      let parsedData = {};
      
      if (savedData) {
        try {
          parsedData = JSON.parse(savedData);
          if (parsedData.userName) {
            setUserName(parsedData.userName);
          }
        } catch (e) {
          console.error('Error parsing saved progress:', e);
        }
      }

      // If we have a username but no progress data in localStorage, fetch from Firestore
      if (parsedData.userName && !parsedData.progress) {
        try {
          const userDoc = doc(db, 'users', parsedData.userName);
          const userSnapshot = await getDoc(userDoc);
          
          if (userSnapshot.exists()) {
            const firestoreData = userSnapshot.data();
            
            // Update localStorage with the Firestore data (excluding sensitive info)
            const updatedData = {
              ...parsedData,
              progress: firestoreData.progress,
              fontSize: firestoreData.fontSize,
              userCountry: firestoreData.userCountry,
              user_type: firestoreData.user_type,
              quizDone: firestoreData.quizDone,
              quizScore: firestoreData.quizScore,
              quizCompletedAt: firestoreData.quizCompletedAt,
              overallQuizScore: firestoreData.overallQuizScore
            };
            
            localStorage.setItem('userDataPythonWorkshop', JSON.stringify(updatedData));
            
            // Update progress state
            if (firestoreData.progress) {
              setProgress(prev => ({
                ...firestoreData.progress,
                hasReachedCompletion: firestoreData.progress.hasReachedCompletion || false
              }));
              return;
            }
          }
        } catch (error) {
          console.error('Error fetching Firestore data:', error);
        }
      }

      // If we have progress in localStorage or Firestore fetch failed, use localStorage data
      if (parsedData.progress) {
        setProgress(prev => ({
          ...parsedData.progress,
          hasReachedCompletion: parsedData.progress.hasReachedCompletion || false
        }));
      } else {
        setProgress(initialProgressState);
      }
    };

    loadData();
  }, []);

  const saveProgress = useCallback(async (newProgress) => {
    if (!userName) return;

    try {
      // Save to localStorage
      const savedData = localStorage.getItem('userDataPythonWorkshop');
      const parsedData = savedData ? JSON.parse(savedData) : {};
      localStorage.setItem('userDataPythonWorkshop', JSON.stringify({
        ...parsedData,
        progress: newProgress
      }));

      // Save to Firestore
      const userDoc = doc(db, 'users', userName);
      await updateDoc(userDoc, {
        progress: newProgress
      });
    } catch (error) {
      console.error('Error saving progress:', error);
    }
  }, [userName]);

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

      saveProgress(newProgress);
      return newProgress;
    });
  }, [saveProgress]);

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

      saveProgress(updatedProgress);
      return updatedProgress;
    });
  }, [saveProgress]);

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
      saveProgress(newProgress);
      return newProgress;
    });
  }, [saveProgress]);

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
    const newProgress = {
      ...initialProgressState,
      hasReachedCompletion: false
    };
    setProgress(newProgress);
    saveProgress(newProgress);

    // Also clear the hasShownComplete flag from localStorage
    const savedData = localStorage.getItem('userDataPythonWorkshop');
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      delete parsedData.hasShownComplete;
      localStorage.setItem('userDataPythonWorkshop', JSON.stringify(parsedData));
    }
  }, [saveProgress]);

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