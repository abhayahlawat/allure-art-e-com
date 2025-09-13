import React from 'react';
import { useState, useEffect } from 'react';
import Hero from '../components/Hero';
import Collections from '../components/Collections';
import Gallery from '../components/Gallery';
import About from '../components/About';

const Home: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [sectionsLoaded, setSectionsLoaded] = useState({
    hero: true,
    collections: false,
    gallery: false,
    about: false
  });

  useEffect(() => {
    // Detect mobile device
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    // Lazy load sections on mobile
    if (window.innerWidth < 768) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const sectionId = entry.target.getAttribute('data-section');
              if (sectionId) {
                setSectionsLoaded(prev => ({ ...prev, [sectionId]: true }));
              }
            }
          });
        },
        { rootMargin: '100px' }
      );

      // Observe section placeholders
      const sections = document.querySelectorAll('[data-section]');
      sections.forEach(section => observer.observe(section));

      return () => {
        observer.disconnect();
        window.removeEventListener('resize', checkMobile);
      };
    }

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="overflow-x-hidden">
      <Hero />
      
      {/* Collections Section */}
      {isMobile ? (
        sectionsLoaded.collections ? (
          <Collections />
        ) : (
          <div 
            data-section="collections" 
            className="h-96 bg-gray-50 flex items-center justify-center"
          >
            <div className="animate-pulse text-gray-400">Loading Collections...</div>
          </div>
        )
      ) : (
        <Collections />
      )}
      
      {/* Gallery Section */}
      {isMobile ? (
        sectionsLoaded.gallery ? (
          <Gallery />
        ) : (
          <div 
            data-section="gallery" 
            className="h-96 bg-white flex items-center justify-center"
          >
            <div className="animate-pulse text-gray-400">Loading Gallery...</div>
          </div>
        )
      ) : (
        <Gallery />
      )}
      
      {/* About Section */}
      {isMobile ? (
        sectionsLoaded.about ? (
          <About />
        ) : (
          <div 
            data-section="about" 
            className="h-96 bg-gray-50 flex items-center justify-center"
          >
            <div className="animate-pulse text-gray-400">Loading About...</div>
          </div>
        )
      ) : (
        <About />
      )}
    </div>
  );
};

export default Home;