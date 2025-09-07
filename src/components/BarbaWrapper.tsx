import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { initBarba } from '../utils/barba';

interface BarbaWrapperProps {
  children: React.ReactNode;
  namespace?: string;
}

const BarbaWrapper: React.FC<BarbaWrapperProps> = ({ children, namespace = 'default' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const isInitialized = useRef(false);

  useEffect(() => {
    if (!isInitialized.current) {
      // Initialize Barba.js on first mount
      initBarba();
      isInitialized.current = true;
    }
  }, []);

  useEffect(() => {
    // Handle React Router navigation with Barba.js
    const handleRouteChange = () => {
      if (containerRef.current) {
        containerRef.current.setAttribute('data-barba', 'container');
        containerRef.current.setAttribute('data-barba-namespace', namespace);
      }
    };

    handleRouteChange();
  }, [location, namespace]);

  return (
    <div
      ref={containerRef}
      data-barba="container"
      data-barba-namespace={namespace}
      className="barba-container"
    >
      {children}
    </div>
  );
};

export default BarbaWrapper;
