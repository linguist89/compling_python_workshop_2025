'use client'

import { useState, useEffect } from 'react'
import Celebration from './Celebration'
import Laptop from './Laptop'

const messages = [
  // Python learning messages
  "Great start! Your Python journey is booting up! 🚀",
  "You're coding like a pro! Keep building that Python knowledge! 💻",
  "Another piece of Python mastered! Your laptop is getting smarter! 🐍",
  
  // Laptop building messages
  "Your virtual laptop is taking shape! Keep going! 🔧",
  "The screen is getting brighter with each completion! ✨",
  "Your dedication is upgrading this laptop, bit by bit! ⚡",
  
  // Encouraging completion messages
  "You're unlocking new features with every section! 🔓",
  "The keyboard is lighting up with your progress! ⌨️",
  "Almost there! Your laptop is nearly fully powered! 🔋",
  
  // Final messages
  "You're a Python champion! Your laptop is glowing with pride! 🏆",
  "Full power achieved! Your laptop is ready for any challenge! 🌟",
  "🎉 Congratulations! 🎉\nYou've built your CompLing laptop!"
]

export default function LaptopPopup({ show, progress, onClose }) {
  const [message, setMessage] = useState('')
  const isComplete = progress >= 100
  
  useEffect(() => {
    if (show) {
      // Select message based on progress
      const messageIndex = Math.min(
        Math.floor((progress / 100) * (messages.length - 1)),
        messages.length - 1
      )
      setMessage(messages[messageIndex])
      
      // Auto-hide after longer duration for completion
      const timer = setTimeout(() => {
        onClose()
      }, isComplete ? 6000 : 3000)
      
      return () => clearTimeout(timer)
    }
  }, [show, progress, isComplete, onClose])
  
  if (!show) return null
  
  return (
    <>
      <Celebration show={isComplete} />
      <div 
        className="fixed inset-0 flex items-center justify-center z-50"
        style={{ perspective: '1000px' }}
      >
        <div 
          className={`rounded-lg p-8 shadow-2xl transform-gpu max-w-2xl mx-4 ${isComplete ? 'pointer-events-auto cursor-pointer' : 'pointer-events-none'}`}
          style={{
            backgroundColor: 'var(--card-background)',
            border: '3px solid var(--text-accent)',
            color: 'var(--text-primary)',
            animation: `popup ${isComplete ? 6 : 3}s cubic-bezier(0.68, -0.55, 0.265, 1.55)`,
            boxShadow: isComplete 
              ? '0 0 30px rgba(0, 0, 0, 0.3), 0 0 60px var(--text-accent-transparent), 0 0 90px var(--color-secondary-transparent)' 
              : '0 0 20px rgba(0, 0, 0, 0.2), 0 0 40px var(--text-accent-transparent)'
          }}
          onClick={isComplete ? onClose : undefined}
        >
          <p className={`font-medium text-center whitespace-pre-line ${isComplete ? 'text-2xl mb-8' : 'text-2xl'}`}>
            {message}
          </p>
          {isComplete && (
            <div className="flex flex-col items-center">
              <div className="transform scale-150 mb-8">
                <Laptop color="space" initialProgress={100} />
              </div>
              <p className="text-center text-sm opacity-75">
                Click anywhere to close
              </p>
            </div>
          )}
        </div>
      </div>
      <style jsx global>{`
        @keyframes popup {
          0% {
            opacity: 0;
            transform: scale(0.7) translateY(40px) rotateX(-30deg);
          }
          15% {
            opacity: 1;
            transform: scale(1.05) translateY(0) rotateX(0);
          }
          25% {
            transform: scale(1) translateY(0) rotateX(0);
          }
          85% {
            opacity: 1;
            transform: scale(1) translateY(0) rotateX(0);
          }
          100% {
            opacity: 0;
            transform: scale(0.95) translateY(-20px) rotateX(20deg);
          }
        }
      `}</style>
    </>
  )
} 