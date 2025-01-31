'use client'

import { useState, useEffect } from 'react'

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
  "Congratulations! You've built a powerful coding machine! 🎉"
]

export default function LaptopPopup({ show, progress, onClose }) {
  const [message, setMessage] = useState('')
  
  useEffect(() => {
    if (show) {
      // Select message based on progress
      const messageIndex = Math.min(
        Math.floor((progress / 100) * (messages.length - 1)),
        messages.length - 1
      )
      setMessage(messages[messageIndex])
      
      // Auto-hide after 3 seconds
      const timer = setTimeout(() => {
        onClose()
      }, 3000)
      
      return () => clearTimeout(timer)
    }
  }, [show, progress])
  
  if (!show) return null
  
  return (
    <div 
      className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none"
      style={{ perspective: '1000px' }}
    >
      <div 
        className="rounded-lg p-8 shadow-2xl transform-gpu animate-popup max-w-2xl mx-4"
        style={{
          backgroundColor: 'var(--card-background)',
          border: '3px solid var(--text-accent)',
          color: 'var(--text-primary)',
          animation: 'popup 3s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
          boxShadow: '0 0 20px rgba(0, 0, 0, 0.2), 0 0 40px var(--text-accent-transparent)'
        }}
      >
        <p className="text-2xl font-medium text-center">{message}</p>
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
    </div>
  )
} 