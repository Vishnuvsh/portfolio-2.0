import { useState, useEffect, useRef } from 'react';

export function useScrambleText(text, playOnHover = false) {
  const [displayText, setDisplayText] = useState(text);
  const [isAnimating, setIsAnimating] = useState(false);
  const chars = '!<>-_\\/[]{}—=+*^?#________';
  const intervalRef = useRef(null);

  const scramble = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    let iteration = 0;
    
    clearInterval(intervalRef.current);
    
    intervalRef.current = setInterval(() => {
      setDisplayText((prev) => 
        text
          .split('')
          .map((letter, index) => {
            if (index < iteration) {
              return text[index];
            }
            if (letter === ' ') return ' ';
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join('')
      );
      
      if (iteration >= text.length) {
        clearInterval(intervalRef.current);
        setIsAnimating(false);
      }
      
      iteration += 1 / 3; // Controls speed of reveal
    }, 30);
  };

  useEffect(() => {
    if (!playOnHover) {
      // Small delay on mount to ensure other entrance animations have started
      const timeout = setTimeout(scramble, 800);
      return () => clearTimeout(timeout);
    }
  }, [text, playOnHover]);

  return { displayText, scramble };
}
