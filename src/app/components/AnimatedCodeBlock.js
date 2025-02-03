'use client'
import { motion, useDragControls } from 'framer-motion'
import { useState } from 'react'

const DraggablePanel = ({ currentSection, totalSections, description, onNext, onPrevious, onClose }) => {
  const dragControls = useDragControls()
  const [isExpanded, setIsExpanded] = useState(true)

  return (
    <motion.div
      drag
      dragControls={dragControls}
      dragMomentum={false}
      initial={{ x: 20, y: 20 }}
      className="fixed top-0 left-0 z-50"
      style={{
        touchAction: "none"
      }}
    >
      <motion.div
        className="bg-gray-800 rounded-lg shadow-xl border border-gray-700"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        style={{
          cursor: "grab",
          width: "400px",
          maxHeight: "80vh"
        }}
      >
        {/* Header/Drag Handle */}
        <div 
          className="w-full h-10 bg-gray-700 rounded-t-lg flex items-center justify-between px-4 cursor-grab"
          style={{ touchAction: "none" }}
          onPointerDown={(e) => dragControls.start(e)}
        >
          <div className="text-sm text-gray-300">
            Section {currentSection + 1} of {totalSections}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-gray-400 hover:text-white transition-colors px-2"
            >
              {isExpanded ? '−' : '+'}
            </button>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors px-2"
            >
              ×
            </button>
          </div>
        </div>

        {/* Content */}
        <motion.div
          initial={false}
          animate={{
            height: isExpanded ? 'auto' : 0,
            opacity: isExpanded ? 1 : 0
          }}
          className="overflow-hidden"
        >
          <div className="p-6">
            <motion.div
              key={currentSection}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-gray-300 mb-4 max-h-[60vh] overflow-y-auto custom-scrollbar"
              style={{
                whiteSpace: 'pre-line'
              }}
            >
              {description}
            </motion.div>
            
            <div className="flex gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onPrevious}
                className="flex-1 px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={currentSection === 0}
              >
                Previous
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onNext}
                className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
              >
                {currentSection === totalSections - 1 ? "Restart" : "Next"}
              </motion.button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

// Add this CSS to your global styles or component
const styleSheet = document.createElement('style')
styleSheet.textContent = `
  .custom-scrollbar::-webkit-scrollbar {
    width: 8px;
  }
  .custom-scrollbar::-webkit-scrollbar-track {
    background: #2d2d2d;
    border-radius: 4px;
  }
  .custom-scrollbar::-webkit-scrollbar-thumb {
    background: #4a4a4a;
    border-radius: 4px;
  }
  .custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: #5a5a5a;
  }
`
document.head.appendChild(styleSheet)

const AnimatedCodeBlock = ({ code = '', description = '' }) => {
  const [currentSection, setCurrentSection] = useState(0)
  const [isPanelVisible, setIsPanelVisible] = useState(true)

  // If no code is provided, use the default code sections
  const codeSections = code ? [{ code, description }] : [
    {
      code: `# Basic Text Variables and String Operations
text = "Natural Language Processing is amazing!"
words = text.split()  # Split into words
word_count = len(words)
is_question = text.endswith("?")
lowercase_text = text.lower()`,
      description: `Let's explore fundamental string operations in NLP! 📝

These operations form the foundation of text processing:

• Core String Methods:
  - text.split(): Tokenization at its simplest form
  - text.lower(): Normalization for consistent processing
  - len(words): Token counting for text statistics
  - text.endswith("?"): Basic sentence type detection

🔍 Key Concepts:
String operations in NLP differ from general programming because:
- Words are our primary unit of computation (not just characters)
- Case sensitivity can affect meaning ("US" vs "us")
- Punctuation carries semantic meaning
- Word boundaries aren't always clear ("New York" vs "New" "York")

🎓 Advanced Concept:
These basic operations lead to more complex NLP tasks:
- Morphological analysis (studying word structure)
- Syntactic parsing (understanding sentence structure)
- Feature extraction for machine learning models
- Cross-lingual text processing considerations`
    },
    {
      code: `# Creating a Simple Word Frequency Counter
sentence = "The cat and the dog saw the bird"
word_list = sentence.lower().split()

# Count word frequencies
word_freq = {}
for word in word_list:
    if word in word_freq:
        word_freq[word] += 1
    else:
        word_freq[word] = 1

# Most common word
most_common = max(word_freq, key=word_freq.get)`,
      description: `Understanding frequency distributions in text analysis 📊

This implementation demonstrates key NLP concepts:

• Data Structure Choice:
  - Dictionary for O(1) lookup efficiency
  - Key-value pairs for word-frequency mapping
  - Hash table benefits for large text corpora

• Algorithm Breakdown:
  1. Normalization (lowercase conversion)
  2. Tokenization (splitting into words)
  3. Frequency counting (dictionary population)
  4. Statistical analysis (finding maximum)

🔍 Applications in Research:
This technique is fundamental for:
- Term frequency analysis in document retrieval
- Keyword extraction in text summarization
- Corpus linguistics studies
- Feature engineering for text classification

🎓 Advanced Concept:
This is a simplified version of statistical language modeling:
- Unigram model (single word frequencies)
- Foundation for tf-idf calculations
- Basis for Zipf's law analysis in linguistics
- Precursor to n-gram models`
    },
    {
      code: `# Basic Sentiment Analysis with Keywords
def analyze_sentiment(text):
    positive_words = ["good", "great", "amazing", "wonderful"]
    negative_words = ["bad", "terrible", "awful", "horrible"]
    
    words = text.lower().split()
    pos_count = sum(1 for word in words if word in positive_words)
    neg_count = sum(1 for word in words if word in negative_words)
    
    if pos_count > neg_count:
        return "Positive 😊"
    elif neg_count > pos_count:
        return "Negative 😔"
    else:
        return "Neutral 😐"`,
      description: `Implementing lexicon-based sentiment analysis 🎭

This demonstrates a rule-based approach to sentiment classification:

• Implementation Details:
  - Lexicon-based method (predefined word lists)
  - Binary polarity scoring (positive/negative)
  - Simple majority voting system
  - Basic negation handling

🔍 Practical Applications:
Common use cases in research:
- Social media sentiment tracking
- Customer feedback analysis
- Opinion mining in product reviews
- Political sentiment analysis

Limitations to Consider:
1. Context insensitivity ("not good" = negative word)
2. Sarcasm detection impossible
3. Domain-specific terms not covered
4. Intensity of sentiment ignored

🎓 Advanced Concept:
Modern sentiment analysis uses:
- Word embeddings (Word2Vec, GloVe)
- Contextual embeddings (BERT, RoBERTa)
- Aspect-based sentiment analysis
- Fine-grained emotion detection`
    },
    {
      code: `# Simple Text Tokenization and Cleaning
import re  # Regular expressions

def clean_and_tokenize(text):
    # Remove punctuation and convert to lowercase
    text = re.sub(r'[!?.,]', '', text.lower())
    
    # Split into words (tokens)
    tokens = text.split()
    
    # Remove short words (like 'a', 'an', 'the')
    tokens = [word for word in tokens if len(word) > 2]
    
    return tokens

text = "Hello! How are you today?"
clean_tokens = clean_and_tokenize(text)`,
      description: `Text preprocessing pipeline for NLP tasks 🔧

Understanding the preprocessing pipeline:

• Regular Expressions in NLP:
  - Pattern matching for text cleaning
  - Efficient character-level operations
  - Flexible punctuation handling
  - Custom token extraction rules

• Preprocessing Steps Explained:
  1. Noise Removal (punctuation)
  2. Text Normalization (lowercase)
  3. Tokenization (word splitting)
  4. Token Filtering (length-based)

🔍 Research Implications:
Each preprocessing decision affects:
- Vocabulary size and composition
- Information retention vs. noise reduction
- Downstream task performance
- Model complexity requirements

🎓 Advanced Concepts:
Modern preprocessing considerations:
- Subword tokenization (BPE, WordPiece)
- Language-specific tokenization rules
- Unicode normalization
- Special token handling (URLs, hashtags)
- Morphological analysis integration`
    }
  ]

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  }

  const handleNext = () => {
    if (currentSection < codeSections.length - 1) {
      setCurrentSection(curr => curr + 1)
    } else {
      setCurrentSection(0)
    }
  }

  const handlePrevious = () => {
    if (currentSection > 0) {
      setCurrentSection(curr => curr - 1)
    }
  }

  return (
    <div className="flex flex-col items-center gap-6 w-full mx-auto px-4">
      <div className="relative" style={{ width: "max-content" }}>
        {!isPanelVisible && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => setIsPanelVisible(true)}
            className="absolute top-8 right-8 w-8 h-8 bg-[#2d2d2d] text-gray-400 rounded-full hover:text-white transition-colors z-10 flex items-center justify-center border border-gray-600"
            whileHover={{ 
              scale: 1.1,
              backgroundColor: "#3d3d3d"
            }}
            whileTap={{ scale: 0.95 }}
            style={{
              fontSize: "1rem",
              fontWeight: "500"
            }}
          >
            ?
          </motion.button>
        )}
        
        <motion.div
          style={{
            margin: "2rem auto",
            padding: "2rem",
            background: "#1e1e1e",
            borderRadius: "8px",
            fontFamily: "monospace",
            position: "relative",
            width: "max-content"
          }}
          variants={container}
          initial="hidden"
          animate="visible"
        >
          <pre style={{ 
            margin: 0,
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
            width: "max-content"
          }}>
            {codeSections.map((section, sectionIndex) => {
              const lines = section.code.split('\n')
              const isFocused = currentSection === sectionIndex
              
              return (
                <motion.div
                  key={sectionIndex}
                  animate={{
                    scale: isFocused ? 1.05 : 1,
                    z: isFocused ? 50 : 0,
                    opacity: isFocused ? 1 : 0.7,
                  }}
                  transition={{
                    type: "spring",
                    damping: 15,
                    stiffness: 200
                  }}
                  style={{
                    padding: "1rem",
                    margin: "0.5rem",
                    borderRadius: "4px",
                    background: isFocused ? "#2d2d2d" : "transparent",
                    boxShadow: isFocused ? "0 0 20px rgba(255,255,255,0.1)" : "none",
                    transform: "perspective(1000px)",
                    transformOrigin: "center center",
                    position: "relative",
                    minWidth: "fit-content"
                  }}
                >
                  {lines.map((line, lineIndex) => {
                    // Enhanced syntax highlighting logic
                    const getHighlightColor = (text) => {
                      // Keywords
                      if (/\b(def|return|import|from|with|if|else|elif|for|in|while|try|except|class|lambda)\b/.test(text)) {
                        return '#c586c0'; // Purple for keywords
                      }
                      // Comments
                      if (text.trim().startsWith('#')) {
                        return '#6a9955'; // Green for comments
                      }
                      // Function calls
                      if (/\w+\(/.test(text)) {
                        return '#dcdcaa'; // Yellow for function calls
                      }
                      // String literals
                      if (/"[^"]*"|'[^']*'/.test(text)) {
                        return '#ce9178'; // Orange for strings
                      }
                      // Numbers
                      if (/\b\d+\.?\d*\b/.test(text)) {
                        return '#b5cea8'; // Light green for numbers
                      }
                      // Boolean and None
                      if (/\b(True|False|None)\b/.test(text)) {
                        return '#569cd6'; // Blue for booleans and None
                      }
                      // Built-in functions
                      if (/\b(len|sum|print|range|list|dict|set|int|str|float)\b/.test(text)) {
                        return '#4ec9b0'; // Teal for built-in functions
                      }
                      // Default color for other text
                      return '#d4d4d4';
                    };

                    // Split the line into parts to apply different colors
                    const parts = line.split(/(\s+)/);
                    
                    return (
                      <div
                        key={lineIndex}
                        style={{
                          padding: "0.2rem 1rem",
                          minWidth: "fit-content",
                          display: "flex",
                          flexWrap: "wrap"
                        }}
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
                    );
                  })}
                </motion.div>
              )
            })}
          </pre>
        </motion.div>
      </div>

      {isPanelVisible && (
        <DraggablePanel 
          currentSection={currentSection}
          totalSections={codeSections.length}
          description={codeSections[currentSection].description}
          onNext={handleNext}
          onPrevious={handlePrevious}
          onClose={() => setIsPanelVisible(false)}
        />
      )}
    </div>
  )
}

export default AnimatedCodeBlock 