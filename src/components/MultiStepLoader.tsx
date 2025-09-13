import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Palette, Heart, Sparkles, CheckCircle } from 'lucide-react';

interface MultiStepLoaderProps {
  onComplete: () => void;
}

const MultiStepLoader: React.FC<MultiStepLoaderProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const steps = [
    {
      id: 1,
      icon: <Palette size={32} />,
      title: 'Curating Artworks',
      description: 'Selecting extraordinary pieces from talented artists',
      duration: 2000
    },
    {
      id: 2,
      icon: <Heart size={32} />,
      title: 'Preparing Your Experience',
      description: 'Creating a personalized art journey just for you',
      duration: 2000
    },
    {
      id: 3,
      icon: <Sparkles size={32} />,
      title: 'Adding Final Touches',
      description: 'Polishing every detail to perfection',
      duration: 1500
    },
    {
      id: 4,
      icon: <CheckCircle size={32} />,
      title: 'Welcome to Allure Art',
      description: 'Your art gallery is ready to explore',
      duration: 1000
    }
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentStep < steps.length - 1) {
        setCurrentStep(currentStep + 1);
      } else {
        setIsComplete(true);
        setTimeout(() => {
          onComplete();
        }, 800);
      }
    }, steps[currentStep].duration);

    return () => clearTimeout(timer);
  }, [currentStep, onComplete]);

  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          className="fixed inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Background Elements */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              className="absolute top-20 left-20 w-32 h-32 bg-pastel-lavender/10 rounded-full"
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{ 
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div
              className="absolute bottom-32 right-32 w-24 h-24 bg-pastel-sage/10 rounded-full"
              animate={{ 
                scale: [1.2, 1, 1.2],
                opacity: [0.4, 0.7, 0.4]
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              }}
            />
            <motion.div
              className="absolute top-1/2 left-10 w-16 h-16 bg-pastel-peach/10 rounded-full"
              animate={{ 
                y: [-20, 20, -20],
                opacity: [0.2, 0.5, 0.2]
              }}
              transition={{ 
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2
              }}
            />
          </div>

          <div className="relative max-w-md w-full mx-auto px-8">
            {/* Brand */}
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl font-cursive text-white mb-2">
                Allure Art
              </h1>
              <div className="w-24 h-0.5 bg-gradient-to-r from-pastel-lavender to-pastel-sage mx-auto"></div>
            </motion.div>

            {/* Step Content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                className="text-center mb-8"
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -30, scale: 0.9 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                {/* Icon */}
                <motion.div
                  className="inline-flex items-center justify-center w-20 h-20 bg-white/10 backdrop-blur-sm rounded-full mb-6 text-white"
                  animate={{ 
                    rotate: [0, 5, -5, 0],
                    scale: [1, 1.05, 1]
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  {steps[currentStep].icon}
                </motion.div>

                {/* Title */}
                <h2 className="text-2xl font-semibold text-white mb-3">
                  {steps[currentStep].title}
                </h2>

                {/* Description */}
                <p className="text-gray-300 text-lg leading-relaxed">
                  {steps[currentStep].description}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm text-gray-400">Progress</span>
                <span className="text-sm text-gray-400">{Math.round(progress)}%</span>
              </div>
              
              <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-pastel-lavender to-pastel-sage rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                />
              </div>
            </div>

            {/* Step Indicators */}
            <div className="flex justify-center space-x-3">
              {steps.map((_, index) => (
                <motion.div
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index <= currentStep 
                      ? 'bg-white' 
                      : 'bg-white/30'
                  }`}
                  animate={{ 
                    scale: index === currentStep ? 1.2 : 1,
                    opacity: index <= currentStep ? 1 : 0.5
                  }}
                  transition={{ duration: 0.3 }}
                />
              ))}
            </div>

            {/* Loading Animation */}
            <motion.div
              className="flex justify-center mt-8 space-x-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              {[0, 1, 2].map((index) => (
                <motion.div
                  key={index}
                  className="w-2 h-2 bg-white/60 rounded-full"
                  animate={{
                    y: [0, -8, 0],
                    opacity: [0.6, 1, 0.6]
                  }}
                  transition={{
                    duration: 1.2,
                    repeat: Infinity,
                    delay: index * 0.2,
                    ease: "easeInOut"
                  }}
                />
              ))}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MultiStepLoader;