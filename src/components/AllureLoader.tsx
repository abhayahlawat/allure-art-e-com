import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface AllureLoaderProps {
  loading: boolean;
  minDisplayMs?: number;
}

const AllureLoader: React.FC<AllureLoaderProps> = ({ 
  loading, 
  minDisplayMs = 2000 
}) => {
  const [shouldShow, setShouldShow] = useState(loading);
  const [displayedText, setDisplayedText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  
  const fullText = 'Allure Art';
  const typingSpeed = 150; // milliseconds per character

  // Handle minimum display time
  useEffect(() => {
    if (loading) {
      setShouldShow(true);
    } else {
      const timer = setTimeout(() => {
        setShouldShow(false);
      }, minDisplayMs);
      return () => clearTimeout(timer);
    }
  }, [loading, minDisplayMs]);

  // Typewriter animation effect
  useEffect(() => {
    if (!shouldShow) return;

    let currentIndex = 0;
    setDisplayedText('');
    
    const typeInterval = setInterval(() => {
      if (currentIndex < fullText.length) {
        setDisplayedText(fullText.slice(0, currentIndex + 1));
        currentIndex++;
      } else {
        clearInterval(typeInterval);
      }
    }, typingSpeed);

    return () => clearInterval(typeInterval);
  }, [shouldShow]);

  // Cursor blinking effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 530);

    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <AnimatePresence>
      {shouldShow && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          role="status"
          aria-live="polite"
          aria-label="Loading Allure Art"
        >
          {/* Background decorative elements */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              className="absolute top-1/4 left-1/4 w-32 h-32 bg-slate-800 rounded-full opacity-20"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.2, 0.1, 0.2],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
            <motion.div
              className="absolute bottom-1/3 right-1/4 w-24 h-24 bg-slate-700 rounded-full opacity-15"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.15, 0.05, 0.15],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 1,
              }}
            />
          </div>

          {/* Main content */}
          <div className="text-center px-4">
            <motion.div
              className="relative"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-cursive text-white font-medium">
                {displayedText}
                <motion.span
                  className={`inline-block w-1 h-12 sm:h-14 md:h-16 lg:h-20 bg-white ml-1 ${
                    showCursor ? 'opacity-100' : 'opacity-0'
                  }`}
                  style={{ transition: 'opacity 0.1s ease-in-out' }}
                />
              </h1>
              
              <motion.p
                className="text-slate-400 text-lg sm:text-xl mt-6 font-light"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, duration: 1 }}
              >
                Curating extraordinary art experiences
              </motion.p>
            </div>

            {/* Loading dots */}
            <motion.div
              className="flex justify-center space-x-2 mt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.5, duration: 0.5 }}
            >
              {[0, 1, 2].map((index) => (
                <motion.div
                  key={index}
                  className="w-2 h-2 bg-slate-500 rounded-full"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: index * 0.2,
                    ease: 'easeInOut',
                  }}
                />
              ))}
            </motion.div>
          </div>

          {/* Screen reader text */}
          <span className="sr-only">
            Loading Allure Art gallery. Please wait while we prepare your art experience.
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AllureLoader;