import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { heroSlides } from '../data/heroSlides';

const Hero: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState<{ [key: number]: boolean }>({});
  const [allImagesPreloaded, setAllImagesPreloaded] = useState(false);

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
      setIsLoaded(true);
    };

    preloadImages();
  }, []);

  useEffect(() => {
    if (!allImagesPreloaded) return;
    
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);

    return () => clearInterval(timer);
  }, [allImagesPreloaded]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  const currentSlideData = heroSlides[currentSlide];

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-white via-gray-50 to-pastel-cream overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-20 left-10 w-32 h-32 bg-pastel-lavender rounded-full opacity-10"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 0.1, scale: 1 }}
          transition={{ duration: 2, delay: 0.5 }}
        />
        <motion.div
          className="absolute top-1/3 right-20 w-24 h-24 bg-pastel-sage rounded-full opacity-8"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 0.08, scale: 1 }}
          transition={{ duration: 2, delay: 0.8 }}
        />
        <motion.div
          className="absolute bottom-1/4 left-1/4 w-20 h-20 bg-pastel-blush rounded-full opacity-6"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 0.06, scale: 1 }}
          transition={{ duration: 2, delay: 1.1 }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-screen flex items-center pt-20 sm:pt-24 md:pt-32 lg:pt-24">
        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center w-full">
          {/* Content */}
          <motion.div
            className="space-y-6 sm:space-y-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
          >
            <div className="space-y-4 sm:space-y-6">
              <motion.h2
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-light text-slate-800 leading-tight"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 1, ease: "easeOut" }}
              >
                {currentSlideData.title}
                <br />
                <span className="font-cursive text-slate-700">{currentSlideData.subtitle}</span>
                <br />
                Art
              </motion.h2>

              <motion.p
                className="text-sm sm:text-base md:text-lg lg:text-xl text-slate-600 max-w-lg leading-relaxed"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 1, ease: "easeOut" }}
              >
                {currentSlideData.description}
              </motion.p>
            </div>

            <motion.div
              className="flex flex-col sm:flex-row gap-3 sm:gap-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 1, ease: "easeOut" }}
            >
              <motion.div
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.99 }}
                transition={{ duration: 0.2 }}
              >
                <Link
                  to="/gallery"
                  className="group bg-slate-800 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-medium flex items-center justify-center space-x-2 hover:bg-slate-700 transition-all duration-500 text-sm sm:text-base min-h-[48px]"
                >
                  <span>{currentSlideData.cta}</span>
                  <ArrowRight size={20} className="group-hover:translate-x-0.5 transition-transform duration-500" />
                </Link>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.99 }}
                transition={{ duration: 0.2 }}
              >
                <Link
                  to="/artists"
                  className="px-6 sm:px-8 py-3 sm:py-4 rounded-full font-medium text-slate-700 border border-slate-200 hover:border-slate-300 hover:bg-white/50 transition-all duration-500 block text-center text-sm sm:text-base min-h-[48px] flex items-center justify-center"
                >
                  View Artists
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Featured Art Piece */}
          <motion.div
            className="relative mt-8 lg:mt-0"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
          >
            <div className="relative group">
              {/* Image container with smooth transitions */}
              <div className="relative w-full max-w-[280px] sm:max-w-xs md:max-w-sm lg:max-w-md mx-auto h-[350px] sm:h-[400px] md:h-[450px] rounded-2xl overflow-hidden shadow-lg">
                {/* Skeleton loader */}
                {!allImagesPreloaded && (
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-100 via-gray-50 to-gray-100 rounded-2xl overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" 
                         style={{ backgroundSize: '200% 100%' }} />
                    <div className="absolute bottom-4 left-4 right-4 bg-white/60 backdrop-blur-sm rounded-lg p-3">
                      <div className="h-3 bg-gray-200 rounded mb-2 animate-pulse" />
                      <div className="h-2 bg-gray-200 rounded w-2/3 animate-pulse" />
                    </div>
                  </div>
                )}
                
                {/* Image slider container */}
                <div className="absolute inset-0">
                  <motion.div
                    className="flex h-full"
                    animate={{ 
                      x: `-${currentSlide * 100}%`,
                    }}
                    transition={{ 
                      duration: 1.2,
                      ease: [0.25, 0.46, 0.45, 0.94],
                      type: 'tween'
                    }}
                  >
                    {heroSlides.map((slide, index) => (
                      <div
                        key={slide.id}
                        className="relative flex-shrink-0 w-full h-full"
                      >
                        {/* Individual image skeleton */}
                        {!imagesLoaded[index] && (
                          <div className="absolute inset-0 bg-gradient-to-br from-gray-100 via-gray-50 to-gray-100 rounded-2xl">
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" 
                                 style={{ backgroundSize: '200% 100%' }} />
                          </div>
                        )}
                        
                        <motion.img
                          src={slide.image}
                          alt="Featured Artwork"
                          className={`w-full h-full object-cover rounded-2xl transition-all duration-700 ${
                            imagesLoaded[index] ? 'opacity-100' : 'opacity-0'
                          }`}
                          onLoad={() => setImagesLoaded(prev => ({ ...prev, [index]: true }))}
                          whileHover={{ scale: 1.01 }}
                          transition={{ duration: 0.6 }}
                          loading={index === 0 ? "eager" : "lazy"}
                        />
                      </div>
                    ))}
                  </motion.div>
                </div>
              </div>
              
              <motion.div
                className="absolute bottom-4 left-4 right-4 bg-white/80 backdrop-blur-sm p-4 rounded-lg border border-white/20"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5, duration: 0.8 }}
              >
                <h3 className="font-medium text-slate-800 mb-1 text-sm">Ethereal Dreams</h3>
                <p className="text-slate-600 text-xs">Marina Celestine • ₹1,03,750</p>
              </motion.div>
            </div>

            {/* Slider Controls */}
            <div className="hidden sm:block absolute top-1/2 -translate-y-1/2 -left-6">
              <motion.button
                onClick={prevSlide}
                className="bg-white/60 backdrop-blur-sm p-3 rounded-full shadow-sm hover:bg-white/80 transition-all duration-500 border border-white/20"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 2, duration: 0.8 }}
                whileHover={{ scale: 1.05, x: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <ChevronLeft size={18} className="text-slate-700" />
              </motion.button>
            </div>
            
            <div className="hidden sm:block absolute top-1/2 -translate-y-1/2 -right-6">
              <motion.button
                onClick={nextSlide}
                className="bg-white/60 backdrop-blur-sm p-3 rounded-full shadow-sm hover:bg-white/80 transition-all duration-500 border border-white/20"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 2, duration: 0.8 }}
                whileHover={{ scale: 1.05, x: 2 }}
                whileTap={{ scale: 0.98 }}
              >
                <ChevronRight size={18} className="text-slate-700" />
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
              className={`w-2 h-2 rounded-full transition-all duration-500 ${
                index === currentSlide ? 'bg-slate-600 scale-125' : 'bg-slate-300'
              }`}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 2.2 + index * 0.1, duration: 0.6 }}
              whileHover={{ scale: 1.3 }}
              whileTap={{ scale: 0.8 }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;