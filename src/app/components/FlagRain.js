import { useEffect, useState } from 'react';
import Flag from 'react-world-flags';

const FlagRain = ({ countryCode, onAnimationComplete }) => {
  const [elements, setElements] = useState([]);

  useEffect(() => {
    // Create 40 flags with random positions and delays
    const newElements = [];
    
    // Add flags
    for (let i = 0; i < 40; i++) {
      newElements.push({
        id: `flag-${i}`,
        type: 'flag',
        left: Math.random() * 100, // Random position from 0-100%
        delay: Math.random() * 1.5, // Random delay 0-1.5s
        size: 20 + Math.random() * 30, // Random size between 20-50px
        rotation: Math.random() * 360, // Random rotation
      });
    }

    setElements(newElements);

    // Clean up animation after 4 seconds
    const timer = setTimeout(() => {
      onAnimationComplete();
    }, 4000);

    return () => clearTimeout(timer);
  }, [onAnimationComplete]);

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {elements.map((element) => (
        <div
          key={element.id}
          className="absolute animate-fall"
          style={{
            left: `${element.left}%`,
            animationDelay: `${element.delay}s`,
            width: `${element.size}px`,
            height: `${element.size}px`,
            transform: `rotate(${element.rotation}deg)`,
            '--rotation': `${element.rotation}deg`,
          }}
        >
          <Flag code={countryCode} className="w-full h-full object-contain" />
        </div>
      ))}
    </div>
  );
}

export default FlagRain; 