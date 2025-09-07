import React from 'react';
import { motion } from 'framer-motion';
import Gallery from '../components/Gallery';

const GalleryPage: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="pt-24 bg-white min-h-screen"
    >
      <Gallery />
    </motion.div>
  );
};

export default GalleryPage;