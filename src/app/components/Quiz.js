'use client'

import { useState, useEffect } from 'react'
import { quizQuestions } from '@/lib/quizQuestions'
import { db } from '@/lib/firebase'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import CryptoJS from 'crypto-js'
import Link from 'next/link'

const ENCRYPTION_KEY = 'pythonWorkshop2025'

export default function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState({})
  const [showResults, setShowResults] = useState(false)
  const [score, setScore] = useState(0)
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const savedData = localStorage.getItem('userDataPythonWorkshop')
    if (savedData) {
      const parsedData = JSON.parse(savedData)
      if (parsedData.userName) {
        setUserName(parsedData.userName)
      }
    }
  }, [])

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const userDoc = await getDoc(doc(db, 'users', userName))
      if (!userDoc.exists()) {
        setError('User not found.')
        setLoading(false)
        return
      }

      const userData = userDoc.data()
      const decryptedPassword = CryptoJS.AES.decrypt(
        userData.encryptedPassword,
        ENCRYPTION_KEY
      ).toString(CryptoJS.enc.Utf8)

      if (password !== decryptedPassword) {
        setError('Incorrect password.')
        setLoading(false)
        return
      }

      setIsAuthenticated(true)
      setLoading(false)
    } catch (error) {
      console.error('Error logging in:', error)
      setError('Login failed. Please try again.')
      setLoading(false)
    }
  }

  const handleAnswerSelect = (questionId, answerIndex) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: answerIndex
    }))
  }

  const handleSubmit = async () => {
    let correctAnswers = 0
    quizQuestions.forEach(question => {
      if (selectedAnswers[question.id] === question.correctAnswer) {
        correctAnswers++
      }
    })

    const finalScore = (correctAnswers / quizQuestions.length) * 100
    setScore(finalScore)
    setShowResults(true)

    try {
      const userDoc = doc(db, 'users', userName)
      const userData = await getDoc(userDoc)
      
      // Calculate overall quiz score
      let overallQuizScore = finalScore
      if (userData.exists()) {
        const existingData = userData.data()
        if (existingData.quizScore) {
          // If there's an existing score, take the highest
          overallQuizScore = Math.max(finalScore, existingData.quizScore)
        }
      }

      // Format quiz answers for storage
      const quizAnswers = quizQuestions.map(question => ({
        questionId: question.id,
        question: question.question,
        selectedAnswer: question.options[selectedAnswers[question.id]],
        correctAnswer: question.options[question.correctAnswer],
        isCorrect: selectedAnswers[question.id] === question.correctAnswer
      }))

      // Save quiz results to Firestore
      await updateDoc(userDoc, {
        quizScore: finalScore, // Current attempt score
        overallQuizScore: overallQuizScore, // Best score across all attempts
        quizDone: true,
        quizAnswers: quizAnswers, // Store the detailed quiz answers
        quizCompletedAt: new Date().toISOString() // Add timestamp
      })

      // Save quizDone flag to localStorage
      const savedData = localStorage.getItem('userDataPythonWorkshop')
      const parsedData = JSON.parse(savedData)
      localStorage.setItem('userDataPythonWorkshop', JSON.stringify({
        ...parsedData,
        quizDone: true,
        overallQuizScore: overallQuizScore
      }))
    } catch (error) {
      console.error('Error saving quiz results:', error)
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto mt-8 p-6 rounded-lg" style={{ backgroundColor: 'var(--card-background)' }}>
        <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
          Python Workshop Quiz
        </h2>
        <p className="mb-4" style={{ color: 'var(--text-primary)' }}>
          Please enter your password to start the quiz
        </p>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 rounded-lg"
              style={{
                backgroundColor: 'var(--card-background)',
                color: 'var(--text-primary)',
                border: '1px solid var(--card-border)'
              }}
              placeholder="Enter your password"
              required
            />
          </div>
          {error && (
            <div className="text-red-500 text-sm">
              {error}
            </div>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full px-4 py-2 rounded-lg font-medium transition-all duration-300"
            style={{
              backgroundColor: 'var(--text-accent)',
              color: 'var(--color-dark)',
              opacity: loading ? 0.7 : 1,
              cursor: loading ? 'not-allowed' : 'pointer'
            }}
          >
            {loading ? 'Verifying...' : 'Start Quiz'}
          </button>
        </form>
      </div>
    )
  }

  if (showResults) {
    return (
      <div className="max-w-md mx-auto mt-8 p-6 rounded-lg text-center" style={{ backgroundColor: 'var(--card-background)' }}>
        <div className="flex flex-col items-center justify-center space-y-4">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-16 w-16 text-green-500" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M5 13l4 4L19 7" 
            />
          </svg>
          <h2 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
            Quiz Completed!
          </h2>
          <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>
            Thank you for completing the Python Workshop Quiz
          </p>
          <Link 
            href="/lessons" 
            className="mt-4 px-6 py-2 rounded-lg font-medium transition-all duration-300"
            style={{
              backgroundColor: 'var(--text-accent)',
              color: 'var(--color-dark)'
            }}
          >
            Back to Lessons
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-md mx-auto mt-8 p-6 rounded-lg" style={{ backgroundColor: 'var(--card-background)' }}>
      <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
        Question {currentQuestion + 1} of {quizQuestions.length}
      </h2>
      <div className="mb-6">
        <p className="text-lg mb-4" style={{ color: 'var(--text-primary)' }}>
          {quizQuestions[currentQuestion].question}
        </p>
        <div className="space-y-2">
          {quizQuestions[currentQuestion].options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswerSelect(quizQuestions[currentQuestion].id, index)}
              className="w-full p-3 text-left rounded-lg transition-all duration-300"
              style={{
                backgroundColor: selectedAnswers[quizQuestions[currentQuestion].id] === index
                  ? 'var(--text-accent)'
                  : 'var(--card-background-secondary)',
                color: selectedAnswers[quizQuestions[currentQuestion].id] === index
                  ? 'var(--color-dark)'
                  : 'var(--text-primary)',
                border: '1px solid var(--card-border)'
              }}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
      <div className="flex justify-between">
        <button
          onClick={() => setCurrentQuestion(prev => Math.max(0, prev - 1))}
          disabled={currentQuestion === 0}
          className="px-4 py-2 rounded-lg font-medium transition-all duration-300"
          style={{
            backgroundColor: 'var(--card-background-secondary)',
            color: 'var(--text-primary)',
            opacity: currentQuestion === 0 ? 0.5 : 1,
            cursor: currentQuestion === 0 ? 'not-allowed' : 'pointer'
          }}
        >
          Previous
        </button>
        {currentQuestion === quizQuestions.length - 1 ? (
          <button
            onClick={handleSubmit}
            disabled={Object.keys(selectedAnswers).length !== quizQuestions.length}
            className="px-4 py-2 rounded-lg font-medium transition-all duration-300"
            style={{
              backgroundColor: 'var(--text-accent)',
              color: 'var(--color-dark)',
              opacity: Object.keys(selectedAnswers).length !== quizQuestions.length ? 0.5 : 1,
              cursor: Object.keys(selectedAnswers).length !== quizQuestions.length ? 'not-allowed' : 'pointer'
            }}
          >
            Submit
          </button>
        ) : (
          <button
            onClick={() => setCurrentQuestion(prev => Math.min(quizQuestions.length - 1, prev + 1))}
            className="px-4 py-2 rounded-lg font-medium transition-all duration-300"
            style={{
              backgroundColor: 'var(--text-accent)',
              color: 'var(--color-dark)'
            }}
          >
            Next
          </button>
        )}
      </div>
    </div>
  )
} 