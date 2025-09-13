import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { heroSlides } from '../data/heroSlides';

const Hero: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoaded, setIsLoaded] = useState(true);
  const [imagesLoaded, setImagesLoaded] = useState<{ [key: number]: boolean }>({});
  const [allImagesPreloaded, setAllImagesPreloaded] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    // Preload all hero images
    const preloadImages = async () => {
      const imagePromises = heroSlides.map((slide, index) => {
        return new Promise<void>((resolve) => {
          const img = new Image();
          img.onload = () => {
            setImagesLoaded(prev => ({ ...prev, [index]: true }));
            resolve();
          };
          img.onerror = () => resolve(); // Continue even if image fails
          img.src = slide.image;
        });
      });
      
      await Promise.all(imagePromises);
      setAllImagesPreloaded(true);
    };

    preloadImages();
  }, []);

  useEffect(() => {
    if (!allImagesPreloaded) return;
    
    const timer = setInterval(() => {
      setIsTransitioning(true);
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
      setTimeout(() => setIsTransitioning(false), 100);
    }, 5000);

    return () => clearInterval(timer);
  }, [allImagesPreloaded]);

  const nextSlide = () => {
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    setTimeout(() => setIsTransitioning(false), 100);
  };

  const prevSlide = () => {
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
    setTimeout(() => setIsTransitioning(false), 100);
  };

  const currentSlideData = heroSlides[currentSlide];

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-pastel-lavender via-pastel-cream to-pastel-blush overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-6 left-4 sm:top-8 md:top-10 lg:left-10 w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 bg-pastel-sage rounded-full opacity-30"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.3, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        />
        <motion.div
          className="absolute top-1/4 right-4 sm:right-8 md:top-1/3 md:right-20 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-pastel-peach rounded-full opacity-40"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.4, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        />
        <motion.div
          className="absolute bottom-1/3 left-1/5 sm:bottom-1/4 md:left-1/4 w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 bg-pastel-lilac rounded-full opacity-35"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.35, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-screen flex items-center pt-20 sm:pt-24 md:pt-32 lg:pt-24">
        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center w-full">
          {/* Content */}
          <motion.div
            className="space-y-6 sm:space-y-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <div className="space-y-4 sm:space-y-6">
              <motion.h2
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-light text-slate-800 leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.5 }}
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
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                {currentSlideData.description}
              </motion.p>
            </div>

            <motion.div
              className="flex flex-col sm:flex-row gap-3 sm:gap-4"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
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
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="relative group">
              <motion.div
                className="absolute -inset-2 sm:-inset-3 md:-inset-4 bg-gradient-to-r from-pastel-sage to-pastel-blush rounded-xl sm:rounded-2xl opacity-30"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.3 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              />
              
              {/* Image container with smooth transitions */}
              <div className="relative w-full max-w-[280px] sm:max-w-xs md:max-w-sm lg:max-w-md mx-auto h-[350px] sm:h-[400px] md:h-[450px] rounded-xl sm:rounded-2xl overflow-hidden">
                {/* Skeleton loader */}
                {!allImagesPreloaded && (
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-200 via-gray-100 to-gray-200 rounded-xl sm:rounded-2xl overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer" 
                         style={{
                           backgroundSize: '200% 100%',
                           animation: 'shimmer 2s infinite'
                         }} />
                    <div className="absolute bottom-2 left-2 right-2 sm:bottom-3 sm:left-3 sm:right-3 md:bottom-4 md:left-4 md:right-4 bg-gray-200 rounded-md sm:rounded-lg p-2 sm:p-3 md:p-4">
                      <div className="h-3 sm:h-4 bg-gray-300 rounded mb-1 sm:mb-2 animate-pulse" />
                      <div className="h-2 sm:h-3 bg-gray-300 rounded w-2/3 animate-pulse" />
                    </div>
                  </div>
                )}
                
                {/* Image slider container */}
                <div className="absolute inset-0">
                  <motion.div
                    className="flex h-full"
                    animate={{ 
                      x: `-${currentSlide * 100}%`
                    }}
                    transition={{ 
                      duration: 0.6,
                      ease: [0.23, 1, 0.32, 1],
                      type: 'tween'
                    }}
                  >
                    {heroSlides.map((slide, index) => (
                      <div
                        key={slide.id}
                        className="relative flex-shrink-0 w-full h-full"
                      >
                        {/* Individual image skeleton */}
                        {!imagesLoaded[index] && allImagesPreloaded && (
                          <div className="absolute inset-0 bg-gradient-to-br from-gray-200 via-gray-100 to-gray-200 rounded-xl sm:rounded-2xl">
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer" 
                                 style={{
                                   backgroundSize: '200% 100%',
                                   animation: 'shimmer 1.5s infinite'
                                 }} />
                          </div>
                        )}
                        
                        <motion.img
                          src={slide.image}
                          alt="Featured Artwork"
                          className={`w-full h-full object-cover rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl md:shadow-2xl transition-all duration-500 ${
                            imagesLoaded[index] ? 'opacity-100' : 'opacity-0'
                          }`}
                          onLoad={() => setImagesLoaded(prev => ({ ...prev, [index]: true }))}
                          whileHover={{ scale: 1.02, rotate: 1 }}
                          loading={index === 0 ? "eager" : "lazy"}
                        />
                      </div>
                    ))}
                  </motion.div>
                </div>
              </div>
              
              <motion.div
                className="absolute bottom-2 left-2 right-2 sm:bottom-3 sm:left-3 sm:right-3 md:bottom-4 md:left-4 md:right-4 bg-white/90 backdrop-blur-sm p-2 sm:p-3 md:p-4 rounded-md sm:rounded-lg"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                <h3 className="font-medium text-slate-800 mb-1 text-xs sm:text-sm">Ethereal Dreams</h3>
                <p className="text-slate-600 text-xs">Marina Celestine • ₹1,03,750</p>
              </motion.div>
            </div>

            {/* Slider Controls */}
            <div className="hidden sm:block absolute top-1/2 -translate-y-1/2 -left-4">
              <motion.button
                onClick={prevSlide}
                className="bg-white/80 backdrop-blur-sm p-2 sm:p-3 rounded-full shadow-lg hover:bg-white transition-colors duration-300"
                initial={{ opacity: 0, x: -5 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
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
                initial={{ opacity: 0, x: 5 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
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
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide ? 'bg-slate-800' : 'bg-slate-400'
              }`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7 + index * 0.05, duration: 0.3 }}
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