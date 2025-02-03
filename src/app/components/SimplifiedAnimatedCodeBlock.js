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

  // Process text to combine related lines into paragraphs
  const processText = (text) => {
    const lines = text.split('\n')
    const processedLines = []
    let currentParagraph = []

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i]
      const nextLine = lines[i + 1]
      
      // If the current line is not empty and either:
      // 1. The next line exists and is not empty
      // 2. The current line doesn't end with a special character
      if (line.trim() && 
          ((nextLine && nextLine.trim() && !line.trim().endsWith(':')) || 
           (!line.trim().endsWith(':') && !line.trim().endsWith('.')))) {
        currentParagraph.push(line)
      } else {
        if (currentParagraph.length > 0) {
          currentParagraph.push(line)
          processedLines.push(currentParagraph.join(' '))
          currentParagraph = []
        } else {
          processedLines.push(line)
        }
      }
    }

    // Add any remaining paragraph
    if (currentParagraph.length > 0) {
      processedLines.push(currentParagraph.join(' '))
    }

    return processedLines
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
          {processText(code).map((line, lineIndex) => {
            // Check if the line contains a comment
            const commentIndex = line.indexOf('#')
            if (commentIndex !== -1) {
              // Split the line into code and comment parts
              const codePart = line.substring(0, commentIndex)
              const commentPart = line.substring(commentIndex)
              
              return (
                <div key={lineIndex} className="min-w-0 flex flex-wrap">
                  {/* Render code part if it exists */}
                  {codePart && codePart.split(/(\s+)/).map((part, partIndex) => (
                    <span
                      key={`code-${partIndex}`}
                      style={{
                        color: getHighlightColor(part)
                      }}
                    >
                      {part}
                    </span>
                  ))}
                  {/* Render comment part in green */}
                  <span
                    style={{
                      color: '#6a9955' // Green for comments
                    }}
                  >
                    {commentPart}
                  </span>
                </div>
              )
            }
            
            // If no comment, process line normally
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