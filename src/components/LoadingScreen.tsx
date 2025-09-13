import React from 'react';
import { motion } from 'framer-motion';

const LoadingScreen: React.FC = () => {
  // SVG path for "Allure Art" in cursive handwriting style
  const pathVariants = {
    hidden: {
      pathLength: 0,
      opacity: 0
    },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { duration: 3, ease: "easeInOut" },
        opacity: { duration: 0.5 }
      }
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        when: "beforeChildren"
      }
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      transition: {
        duration: 0.8,
        ease: "easeInOut"
      }
    }
  };

  return (
    <motion.div
      className="fixed inset-0 bg-gradient-to-br from-pastel-lavender via-pastel-cream to-pastel-blush flex items-center justify-center z-50"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-20 left-10 w-20 h-20 bg-pastel-sage rounded-full opacity-30"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.3, scale: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        />
        <motion.div
          className="absolute top-1/3 right-20 w-16 h-16 bg-pastel-peach rounded-full opacity-40"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.4, scale: 1 }}
          transition={{ duration: 1, delay: 0.7 }}
        />
        <motion.div
          className="absolute bottom-1/4 left-1/4 w-12 h-12 bg-pastel-lilac rounded-full opacity-35"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.35, scale: 1 }}
          transition={{ duration: 1, delay: 0.9 }}
        />
      </div>

      <div className="text-center">
        {/* Writing Animation Container */}
        <div className="relative mb-8">
          <svg
            width="400"
            height="120"
            viewBox="0 0 400 120"
            className="mx-auto"
            style={{ filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.1))' }}
          >
            {/* Allure */}
            <motion.path
              d="M20 80 Q30 40 50 60 Q70 80 90 50 Q100 40 110 60 Q120 80 130 60 Q140 50 150 70 Q160 85 170 70"
              stroke="#1e293b"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              variants={pathVariants}
              initial="hidden"
              animate="visible"
            />
            
            {/* Art */}
            <motion.path
              d="M220 80 Q230 40 250 60 Q270 80 290 50 Q300 45 310 65 Q320 80 330 65"
              stroke="#1e293b"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              variants={pathVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 1.5 }}
            />

            {/* Decorative flourish */}
            <motion.path
              d="M340 65 Q350 55 360 65 Q370 75 380 65"
              stroke="#64748b"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              variants={pathVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 2.5 }}
            />
          </svg>

          {/* Fallback text that appears after writing animation */}
          <motion.h1
            className="absolute inset-0 flex items-center justify-center text-6xl font-cursive text-slate-800"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3.5, duration: 0.5 }}
          >
            Allure Art
          </motion.h1>
        </div>

        {/* Subtitle */}
        <motion.p
          className="text-slate-600 text-lg font-light"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 4, duration: 0.6 }}
        >
          Discover Extraordinary Art
        </motion.p>

        {/* Loading dots */}
        <motion.div
          className="flex justify-center space-x-2 mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 4.2, duration: 0.4 }}
        >
          {[0, 1, 2].map((index) => (
            <motion.div
              key={index}
              className="w-2 h-2 bg-slate-400 rounded-full"
              animate={{
                scale: [1, 1.2, 1],
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
      </div>
    </motion.div>
  );
};

export default LoadingScreen;