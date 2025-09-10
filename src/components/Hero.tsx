import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { heroSlides } from '../data/heroSlides';

const Hero: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [imageLoaded, setImageLoaded] = useState<{ [key: number]: boolean }>({});
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Set loaded state immediately to prevent stuck feeling
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    setIsTransitioning(true);
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Reset transition state after slide change
    const timer = setTimeout(() => {
      setIsTransitioning(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [currentSlide]);
  const nextSlide = () => {
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  const currentSlideData = heroSlides[currentSlide];

  const handleImageLoad = (slideIndex: number) => {
    setImageLoaded(prev => ({ ...prev, [slideIndex]: true }));
  };
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-pastel-lavender via-pastel-cream to-pastel-blush overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-6 left-4 sm:top-8 md:top-10 lg:left-10 w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 bg-pastel-sage rounded-full opacity-30"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.3, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        />
        <motion.div
          className="absolute top-1/4 right-4 sm:right-8 md:top-1/3 md:right-20 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-pastel-peach rounded-full opacity-40"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.4, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        />
        <motion.div
          className="absolute bottom-1/3 left-1/5 sm:bottom-1/4 md:left-1/4 w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 bg-pastel-lilac rounded-full opacity-35"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.35, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-screen flex items-center pt-20 sm:pt-24 md:pt-32 lg:pt-24">
        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center w-full">
          {/* Content */}
          <motion.div
            className="space-y-6 sm:space-y-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 30 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="space-y-4 sm:space-y-6">
              <motion.h2
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-light text-slate-800 leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                {currentSlideData.title}
                <br />
                <span className="font-cursive text-slate-700">{currentSlideData.subtitle}</span>
                <br />
                Art
              </motion.h2>

              <motion.p
                className="text-sm sm:text-base md:text-lg lg:text-xl text-slate-600 max-w-lg leading-relaxed"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 15 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                {currentSlideData.description}
              </motion.p>
            </div>

            <motion.div
              className="flex flex-col sm:flex-row gap-3 sm:gap-4"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 15 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  to="/gallery"
                  className="group bg-slate-800 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-medium flex items-center justify-center space-x-2 hover:bg-slate-700 transition-all duration-300 text-sm sm:text-base min-h-[48px]"
                >
                  <span>{currentSlideData.cta}</span>
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  to="/artists"
                  className="px-6 sm:px-8 py-3 sm:py-4 rounded-full font-medium text-slate-700 border-2 border-slate-300 hover:border-slate-400 transition-all duration-300 block text-center text-sm sm:text-base min-h-[48px] flex items-center justify-center"
                >
                  View Artists
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Featured Art Piece */}
          <motion.div
            className="relative mt-8 lg:mt-0"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: isLoaded ? 1 : 0, scale: isLoaded ? 1 : 0.95 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="relative group">
              <motion.div
                className="absolute -inset-2 sm:-inset-3 md:-inset-4 bg-gradient-to-r from-pastel-sage to-pastel-blush rounded-xl sm:rounded-2xl opacity-30"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.3 }}
                transition={{ delay: 0.5, duration: 0.6 }}
              />
              
              {/* Image container with smooth transitions */}
              <div className="relative w-full max-w-[280px] sm:max-w-xs md:max-w-sm lg:max-w-md mx-auto h-[350px] sm:h-[400px] md:h-[450px] overflow-hidden rounded-xl sm:rounded-2xl">
                {heroSlides.map((slide, index) => (
                  <motion.div
                    key={slide.id}
                    className="absolute inset-0"
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ 
                      opacity: index === currentSlide ? 1 : 0,
                      scale: index === currentSlide ? 1 : 1.1
                    }}
                    transition={{ 
                      duration: 0.8,
                      ease: [0.25, 0.46, 0.45, 0.94]
                    }}
                  >
                    {/* Loading placeholder for each image */}
                    {!imageLoaded[index] && (
                      <div className="absolute inset-0 bg-gradient-to-br from-pastel-lavender to-pastel-cream animate-pulse rounded-xl sm:rounded-2xl" />
                    )}
                    
                    <motion.img
                      src={slide.image}
                      alt={`Featured Artwork ${index + 1}`}
                      className={`w-full h-full object-cover rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl md:shadow-2xl transition-all duration-500 ${
                        imageLoaded[index] ? 'opacity-100' : 'opacity-0'
                      }`}
                      whileHover={{ scale: 1.02, rotate: 1 }}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      onLoad={() => handleImageLoad(index)}
                      loading={index === 0 ? "eager" : "lazy"}
                    />
                  </motion.div>
                ))}
              </div>
              
              <motion.div
                className="absolute bottom-2 left-2 right-2 sm:bottom-3 sm:left-3 sm:right-3 md:bottom-4 md:left-4 md:right-4 bg-white/90 backdrop-blur-sm p-2 sm:p-3 md:p-4 rounded-md sm:rounded-lg transition-all duration-500"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: imageLoaded[currentSlide] ? 1 : 0, y: imageLoaded[currentSlide] ? 0 : 10 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                key={currentSlide} // Force re-render for smooth text transitions
              >
                <motion.h3 
                  className="font-medium text-slate-800 mb-1 text-xs sm:text-sm"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  {currentSlideData.title} Dreams
                </motion.h3>
                <motion.p 
                  className="text-slate-600 text-xs"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                >
                  Marina Celestine • ₹1,03,750
                </motion.p>
              </motion.div>
            </div>

            {/* Slider Controls */}
            <div className="hidden sm:block absolute top-1/2 -translate-y-1/2 -left-4">
              <motion.button
                onClick={prevSlide}
                className="bg-white/80 backdrop-blur-sm p-2 sm:p-3 rounded-full shadow-lg hover:bg-white transition-colors duration-300"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: isLoaded ? 1 : 0, x: isLoaded ? 0 : -10 }}
                transition={{ delay: 1, duration: 0.6 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <ChevronLeft size={16} className="text-slate-700" />
              </motion.button>
            </div>
            
            <div className="hidden sm:block absolute top-1/2 -translate-y-1/2 -right-4">
              <motion.button
                onClick={nextSlide}
                className="bg-white/80 backdrop-blur-sm p-2 sm:p-3 rounded-full shadow-lg hover:bg-white transition-colors duration-300"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: isLoaded ? 1 : 0, x: isLoaded ? 0 : 10 }}
                transition={{ delay: 1, duration: 0.6 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <ChevronRight size={16} className="text-slate-700" />
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-6 sm:bottom-8 md:bottom-12 lg:bottom-20 left-1/2 transform -translate-x-1/2 flex space-x-2 sm:space-x-3">
          {heroSlides.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-500 ${
                index === currentSlide ? 'bg-slate-800' : 'bg-slate-400'
              }`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: isLoaded ? 1 : 0, scale: isLoaded ? 1 : 0.8 }}
              transition={{ delay: 1.2 + index * 0.1, duration: 0.4 }}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;