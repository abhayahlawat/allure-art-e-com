import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface AllureLoaderProps {
  loading: boolean;
  minDisplayMs?: number;
}

const AllureLoader: React.FC<AllureLoaderProps> = ({ 
  loading, 
  minDisplayMs = 2500 
}) => {
  const [shouldShow, setShouldShow] = useState(loading);

  // Handle minimum display time
  useEffect(() => {
    if (!loading && shouldShow) {
      const timer = setTimeout(() => {
        setShouldShow(false);
      }, minDisplayMs);
      return () => clearTimeout(timer);
    } else if (loading) {
      setShouldShow(true);
    }
  }, [loading, shouldShow, minDisplayMs]);

  return (
    <AnimatePresence>
      {shouldShow && (
        <motion.div
          className="fixed inset-0 z-50 bg-slate-900 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          role="status"
          aria-live="polite"
          aria-label="Loading Allure Art"
        >
          {/* Background decorative elements */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              className="absolute top-20 left-20 w-32 h-32 bg-pastel-sage/10 rounded-full"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 0.3, scale: 1 }}
              transition={{ duration: 2, delay: 0.5 }}
            />
            <motion.div
              className="absolute bottom-32 right-32 w-24 h-24 bg-pastel-blush/10 rounded-full"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 0.4, scale: 1 }}
              transition={{ duration: 2, delay: 1 }}
            />
            <motion.div
              className="absolute top-1/3 right-20 w-16 h-16 bg-pastel-lavender/10 rounded-full"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 0.35, scale: 1 }}
              transition={{ duration: 2, delay: 1.5 }}
            />
          </div>

          {/* Main content */}
          <motion.div
            className="text-center space-y-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {/* Brand name with handwritten drawing animation */}
            <div className="relative">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-cursive text-white font-medium tracking-wide">
                <motion.span
                  className="inline-block"
                  initial={{ 
                    pathLength: 0,
                    opacity: 0
                  }}
                  animate={{ 
                    pathLength: 1,
                    opacity: 1
                  }}
                  transition={{ 
                    pathLength: { duration: 2.5, ease: "easeInOut" },
                    opacity: { duration: 0.3, delay: 0.2 }
                  }}
                  style={{
                    background: 'linear-gradient(90deg, transparent 0%, white 50%, transparent 100%)',
                    backgroundSize: '200% 100%',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    animation: 'handwrite 2.5s ease-in-out forwards'
                  }}
                >
                  Allure Art
                </motion.span>
              </h1>
              
              {/* Handwritten underline effect */}
              <motion.div
                className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 h-0.5 bg-gradient-to-r from-pastel-sage to-pastel-blush"
                initial={{ width: 0, scaleX: 0 }}
                animate={{ width: '100%', scaleX: 1 }}
                transition={{ 
                  duration: 1.5, 
                  delay: 2.8, 
                  ease: "easeInOut" 
                }}
                style={{
                  transformOrigin: 'left center'
                }}
              />
            </div>

            {/* Subtitle */}
            <motion.p
              className="text-lg sm:text-xl text-gray-300 font-light"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 3.2 }}
            >
              Curating extraordinary art experiences
            </motion.p>

            {/* Loading dots */}
            <motion.div
              className="flex justify-center space-x-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 3.8 }}
            >
              {[0, 1, 2].map((index) => (
                <motion.div
                  key={index}
                  className="w-2 h-2 bg-white rounded-full"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 1, 0.5]
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: index * 0.2
                  }}
                />
              ))}
            </motion.div>
          </motion.div>

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
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-cursive text-white font-medium tracking-wide"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <span className="relative">
                  {displayedText}
                  {showCursor && displayedText.length < brandText.length && (
                    <motion.span
                      className="inline-block w-1 h-12 sm:h-14 md:h-16 lg:h-20 bg-white ml-1"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: [0, 1, 0] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    />
                  )}
                </span>
              </motion.h1>
              
              {/* Handwritten underline effect */}
              {displayedText === brandText && (
                <motion.div
                  className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 h-0.5 bg-gradient-to-r from-pastel-sage to-pastel-blush"
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 1, delay: 0.5, ease: "easeInOut" }}
                />
              )}
            </div>

            {/* Subtitle */}
            {displayedText === brandText && (
              <motion.p
                className="text-lg sm:text-xl text-gray-300 font-light"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.5 }}
              >
                Curating extraordinary art experiences
              </motion.p>
            )}

            {/* Loading dots */}
            {displayedText === brandText && (
              <motion.div
                className="flex justify-center space-x-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 2 }}
              >
                {[0, 1, 2].map((index) => (
                  <motion.div
                    key={index}
                    className="w-2 h-2 bg-white rounded-full"
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.5, 1, 0.5]
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      delay: index * 0.2
                    }}
                  />
                ))}
              </motion.div>
            )}
          </motion.div>

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