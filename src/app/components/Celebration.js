'use client'

import { useEffect } from 'react'
import confetti from 'canvas-confetti'

const emojis = ['🎉', '🎊', '🎈', '🎆', '🎇', '✨', '🌟', '💫', '🎯', '🎓', '🏆', '💻', '🐍', '🚀']

export default function Celebration({ show }) {
  useEffect(() => {
    if (!show) return

    // Launch confetti
    const launchConfetti = () => {
      const end = Date.now() + 3000 // 3 seconds

      const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff']

      ;(function frame() {
        confetti({
          particleCount: 2,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: colors
        })

        confetti({
          particleCount: 2,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: colors
        })

        if (Date.now() < end) {
          requestAnimationFrame(frame)
        }
      }())
    }

    // Add floating emojis
    const container = document.createElement('div')
    container.style.position = 'fixed'
    container.style.inset = '0'
    container.style.pointerEvents = 'none'
    container.style.zIndex = '9999'
    document.body.appendChild(container)

    // Create 20 random emojis
    for (let i = 0; i < 20; i++) {
      const emoji = document.createElement('div')
      emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)]
      emoji.style.position = 'absolute'
      emoji.style.left = Math.random() * 100 + 'vw'
      emoji.style.top = '-50px'
      emoji.style.fontSize = (Math.random() * 20 + 20) + 'px'
      emoji.style.transform = `rotate(${Math.random() * 360}deg)`
      emoji.style.animation = `float ${Math.random() * 2 + 3}s linear forwards`
      container.appendChild(emoji)
    }

    // Add animation styles
    const style = document.createElement('style')
    style.textContent = `
      @keyframes float {
        0% {
          transform: translateY(0) rotate(0deg);
          opacity: 1;
        }
        100% {
          transform: translateY(100vh) rotate(360deg);
          opacity: 0;
        }
      }
    `
    document.head.appendChild(style)

    // Launch confetti
    launchConfetti()

    // Cleanup
    return () => {
      container.remove()
      style.remove()
    }
  }, [show])

  return null
} 