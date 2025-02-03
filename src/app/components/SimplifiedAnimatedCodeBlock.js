'use client'
import { motion } from 'framer-motion'

const SimplifiedAnimatedCodeBlock = ({ code }) => {
  // Container animation variant
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  }

  // Enhanced syntax highlighting logic
  const getHighlightColor = (text) => {
    // Keywords
    if (/\b(def|return|import|from|with|if|else|elif|for|in|while|try|except|class|lambda)\b/.test(text)) {
      return '#c586c0' // Purple for keywords
    }
    // Comments
    if (text.trim().startsWith('#')) {
      return '#6a9955' // Green for comments
    }
    // Function calls
    if (/\w+\(/.test(text)) {
      return '#dcdcaa' // Yellow for function calls
    }
    // String literals
    if (/"[^"]*"|'[^']*'/.test(text)) {
      return '#ce9178' // Orange for strings
    }
    // Numbers
    if (/\b\d+\.?\d*\b/.test(text)) {
      return '#b5cea8' // Light green for numbers
    }
    // Boolean and None
    if (/\b(True|False|None)\b/.test(text)) {
      return '#569cd6' // Blue for booleans and None
    }
    // Built-in functions
    if (/\b(len|sum|print|range|list|dict|set|int|str|float)\b/.test(text)) {
      return '#4ec9b0' // Teal for built-in functions
    }
    // Default color for other text
    return '#d4d4d4'
  }

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="visible"
      className="w-full rounded-lg overflow-hidden"
      style={{
        background: '#1e1e1e',
      }}
    >
      <motion.div
        animate={{
          scale: 1.02,
        }}
        transition={{
          type: "spring",
          damping: 15,
          stiffness: 200
        }}
        style={{
          background: '#2d2d2d',
          fontFamily: 'monospace',
        }}
      >
        <pre className="p-4 overflow-x-auto">
          {code.split('\n').map((line, lineIndex) => {
            // Split the line into parts to apply different colors
            const parts = line.split(/(\s+)/)
            
            return (
              <div
                key={lineIndex}
                className="min-w-0 flex flex-wrap"
              >
                {parts.map((part, partIndex) => (
                  <span
                    key={partIndex}
                    style={{
                      color: getHighlightColor(part)
                    }}
                  >
                    {part}
                  </span>
                ))}
              </div>
            )
          })}
        </pre>
      </motion.div>
    </motion.div>
  )
}

export default SimplifiedAnimatedCodeBlock 