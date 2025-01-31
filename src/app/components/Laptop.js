'use client';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const Laptop = ({ color = 'silver', initialProgress = 0 }) => {
  const [progress, setProgress] = useState(initialProgress);
  const [isComplete, setIsComplete] = useState(initialProgress >= 100);

  useEffect(() => {
    setProgress(Math.min(initialProgress, 100));
    setIsComplete(initialProgress >= 100);
  }, [initialProgress]);

  // Configuration for different laptop colors
  const laptopConfig = {
    silver: {
      body: {
        main: 'from-gray-200 to-gray-300',
        accent: 'from-gray-300 to-gray-400',
        shine: 'from-white/40 via-white/20 to-transparent',
        edge: 'from-gray-400 to-gray-300'
      },
      screen: {
        border: 'bg-gray-700',
        display: 'from-gray-900 to-black',
        bezel: 'from-gray-300 to-gray-400'
      },
      keyboard: {
        base: 'bg-gray-200',
        keys: 'bg-gray-300',
        keysShadow: 'rgba(0,0,0,0.1)'
      }
    },
    space: {
      body: {
        main: 'from-gray-800 to-gray-900',
        accent: 'from-gray-700 to-gray-800',
        shine: 'from-white/20 via-white/10 to-transparent',
        edge: 'from-gray-900 to-gray-800'
      },
      screen: {
        border: 'bg-gray-900',
        display: 'from-gray-900 to-black',
        bezel: 'from-gray-800 to-gray-900'
      },
      keyboard: {
        base: 'bg-gray-800',
        keys: 'bg-gray-700',
        keysShadow: 'rgba(0,0,0,0.2)'
      }
    }
  };

  const config = laptopConfig[color];

  // Calculate clip path based on progress
  const clipPercentage = 100 - progress;

  return (
    <div className="relative scale-75" style={{ minHeight: '200px' }}>
      {/* Enhanced Laptop Shadow */}
      <motion.div
        className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-72 h-4 bg-black/20 rounded-full blur-lg"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ 
          opacity: progress > 0 ? [0.15, 0.2, 0.15] : 0,
          scale: progress > 0 ? [1, 1.02, 1] : 0.5
        }}
        transition={{ 
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Main Laptop Container */}
      <motion.div 
        className="relative"
        style={{ 
          transformStyle: 'preserve-3d',
          perspective: '2000px',
          transform: 'rotateX(5deg)'
        }}
      >
        {/* Screen Part */}
        <motion.div
          className={`w-64 h-40 bg-gradient-to-b ${config.body.main} rounded-lg overflow-hidden`}
          style={{
            transformOrigin: 'bottom',
            clipPath: `inset(${clipPercentage}% 0 0 0)`,
            boxShadow: '0 10px 30px rgba(0,0,0,0.25), inset 0 1px 3px rgba(255,255,255,0.3)',
            transform: 'rotateX(-60deg) translateZ(20px)'
          }}
          animate={isComplete ? {
            rotateX: [-60, -58, -60],
            translateZ: [20, 22, 20]
          } : {
            rotateX: -60,
            translateZ: 20
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          {/* Screen Bezel */}
          <div className={`absolute inset-0 bg-gradient-to-b ${config.screen.bezel} rounded-lg`} />
          
          {/* Screen Border */}
          <div className={`w-56 h-36 ${config.screen.border} m-4 rounded relative overflow-hidden`}
               style={{
                 boxShadow: 'inset 0 0 10px rgba(0,0,0,0.5)'
               }}>
            {/* Screen Display */}
            <motion.div
              className={`w-52 h-32 bg-gradient-to-br ${config.screen.display} m-2 rounded`}
              style={{
                boxShadow: 'inset 0 0 20px rgba(0,0,0,0.5)'
              }}
              animate={isComplete ? {
                opacity: [0.8, 1, 0.8]
              } : {
                opacity: 0.8
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              {/* Screen Content */}
              <motion.div
                className="w-full h-full relative overflow-hidden rounded flex items-center justify-center"
                style={{
                  background: isComplete ? 
                    'linear-gradient(45deg, #000428 0%, #004e92 100%)' : 
                    'linear-gradient(45deg, #000000 0%, #1a1a1a 100%)'
                }}
              >
                {/* CHC Text */}
                <motion.div
                  className="flex gap-2 relative z-10"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ 
                    opacity: progress >= 25 ? 1 : 0,
                    scale: progress >= 25 ? 1 : 0.5
                  }}
                  transition={{ duration: 0.5 }}
                >
                  {['CompLing', '2025'].map((text, index) => (
                    <motion.div
                      key={index}
                      className="text-2xl font-bold text-white"
                      style={{
                        textShadow: '0 0 10px rgba(255,255,255,0.5)'
                      }}
                      animate={progress >= 25 ? {
                        y: [-1, 1, -1],
                        scale: [1, 1.1, 1],
                        opacity: [0.8, 1, 0.8]
                      } : {}}
                      transition={{
                        duration: 2,
                        delay: index * 0.2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      {text}
                    </motion.div>
                  ))}
                </motion.div>

                {/* Screen Glare Effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent"
                  animate={isComplete ? {
                    opacity: [0.1, 0.2, 0.1]
                  } : {
                    opacity: 0.1
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </motion.div>
            </motion.div>
          </div>

          {/* Screen Edge */}
          <div 
            className={`absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r ${config.body.edge}`}
            style={{
              transform: 'rotateX(-90deg) translateZ(1px)',
              transformOrigin: 'bottom'
            }}
          />
        </motion.div>

        {/* Base Part */}
        <motion.div
          className={`w-64 h-48 bg-gradient-to-b ${config.body.main} rounded-lg mt-1`}
          style={{
            transformOrigin: 'top',
            clipPath: `inset(0 0 ${clipPercentage}% 0)`,
            boxShadow: '0 10px 30px rgba(0,0,0,0.25), inset 0 2px 5px rgba(255,255,255,0.3)',
            transform: 'translateZ(10px)'
          }}
        >
          {/* Keyboard Area */}
          <div 
            className={`w-56 h-32 ${config.keyboard.base} mx-4 mt-4 rounded-t-lg relative`}
            style={{
              boxShadow: 'inset 0 1px 5px rgba(0,0,0,0.1)'
            }}
          >
            {/* Keyboard Keys */}
            <div className="grid grid-cols-10 gap-1 p-2">
              {[...Array(40)].map((_, i) => (
                <motion.div
                  key={i}
                  className={`h-4 ${config.keyboard.keys} rounded-sm relative`}
                  style={{
                    boxShadow: `0 1px 2px ${config.keyboard.keysShadow}`,
                    transform: 'translateZ(2px)'
                  }}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ 
                    opacity: progress > 85 ? 0.8 : 0,
                    y: progress > 85 ? 0 : 5
                  }}
                  transition={{ duration: 0.2, delay: i * 0.01 }}
                />
              ))}
            </div>

            {/* Enhanced Trackpad Area with Text */}
            <div className="relative flex items-center justify-between w-56 mx-auto mt-4">
              {/* Left Text (CHC) */}
              <motion.div
                className="flex gap-1"
                initial={{ opacity: 0, x: -10 }}
                animate={{ 
                  opacity: progress > 50 ? 0.8 : 0,
                  x: progress > 50 ? 0 : -10
                }}
                transition={{ duration: 0.3 }}
              >
                {['C', 'H', 'C'].map((letter, index) => (
                  <motion.span
                    key={index}
                    className="text-sm font-semibold"
                    style={{ color: color === 'space' ? '#9CA3AF' : '#4B5563' }}
                    animate={progress > 50 ? {
                      opacity: [0.7, 1, 0.7]
                    } : {}}
                    transition={{
                      duration: 2,
                      delay: index * 0.1,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    {letter}
                  </motion.span>
                ))}
              </motion.div>

              {/* Trackpad */}
              <motion.div
                className={`w-24 h-16 ${config.keyboard.base} rounded`}
                style={{
                  boxShadow: `inset 0 0 10px rgba(0,0,0,0.1), 
                             0 1px 2px ${config.keyboard.keysShadow}`,
                  transform: 'translateZ(1px)'
                }}
                animate={isComplete ? {
                  opacity: [0.7, 0.9, 0.7],
                  scale: [1, 1.02, 1]
                } : {
                  opacity: 0.7,
                  scale: 1
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />

              {/* Right Text (Python) */}
              <motion.div
                className="text-sm font-semibold"
                style={{ color: color === 'space' ? '#9CA3AF' : '#4B5563' }}
                initial={{ opacity: 0, x: 10 }}
                animate={{ 
                  opacity: progress > 75 ? 0.8 : 0,
                  x: progress > 75 ? 0 : 10
                }}
                transition={{ duration: 0.3 }}
              >
                <motion.span
                  animate={progress > 75 ? {
                    opacity: [0.7, 1, 0.7]
                  } : {}}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  Python
                </motion.span>
              </motion.div>
            </div>
          </div>

          {/* Enhanced Front Edge Shine */}
          <motion.div
            className={`absolute bottom-0 left-0 w-full h-6 bg-gradient-to-b ${config.body.shine} rounded-b-lg`}
            style={{
              transform: 'translateZ(2px)'
            }}
            animate={isComplete ? {
              opacity: [0.3, 0.5, 0.3]
            } : {
              opacity: 0.3
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />

          {/* Base Edge */}
          <div 
            className={`absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r ${config.body.edge}`}
            style={{
              transform: 'rotateX(-90deg) translateZ(2px)',
              transformOrigin: 'bottom'
            }}
          />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Laptop; 