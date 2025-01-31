import { useEffect, useState } from 'react';
import Flag from 'react-world-flags';

const FlagRain = ({ countryCode, onAnimationComplete, userName }) => {
  const [elements, setElements] = useState([]);

  useEffect(() => {
    // Create 40 flags and 40 name elements with random positions and delays
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
    
    // Add name elements (40 instances of the name)
    if (userName && userName.trim()) {
      for (let i = 0; i < 40; i++) {
        newElements.push({
          id: `name-${i}`,
          type: 'name',
          left: Math.random() * 100,
          delay: Math.random() * 1.5,
          rotation: Math.random() * 360,
          fontSize: 32 + Math.random() * 28, // Random size between 32-60px
          color: `hsl(${Math.random() * 360}, 80%, 60%)`, // Random vibrant color
        });
      }
    }

    // Shuffle the elements array for more randomized layering
    for (let i = newElements.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newElements[i], newElements[j]] = [newElements[j], newElements[i]];
    }

    setElements(newElements);

    // Clean up animation after 4 seconds (increased from 3 to allow for longer delays)
    const timer = setTimeout(() => {
      onAnimationComplete();
    }, 4000);

    return () => clearTimeout(timer);
  }, [countryCode, userName, onAnimationComplete]);

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {elements.map((element) => (
        <div
          key={element.id}
          className="absolute animate-fall"
          style={{
            left: `${element.left}%`,
            animationDelay: `${element.delay}s`,
            width: element.type === 'flag' ? `${element.size}px` : 'auto',
            height: element.type === 'flag' ? `${element.size}px` : 'auto',
            transform: `rotate(${element.rotation}deg)`,
            '--rotation': `${element.rotation}deg`,
            zIndex: element.type === 'name' ? 10 : 5, // Make names appear above flags
          }}
        >
          {element.type === 'flag' ? (
            <Flag code={countryCode} className="w-full h-full object-contain" />
          ) : (
            <div
              style={{
                color: element.color,
                fontSize: `${element.fontSize}px`,
                fontWeight: 'bold',
                textShadow: '3px 3px 6px rgba(0,0,0,0.7)',
                whiteSpace: 'nowrap',
                display: 'block',
                transform: 'scale(1.2)', // Make text slightly bigger
                opacity: 0.9, // Slight transparency for better visual effect
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                background: `linear-gradient(45deg, ${element.color}, hsl(${(Math.random() * 60) - 30 + parseInt(element.color.match(/\d+/)[0])}, 80%, 60%))`,
                WebkitTextFillColor: 'transparent',
              }}
            >
              {userName}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default FlagRain; 