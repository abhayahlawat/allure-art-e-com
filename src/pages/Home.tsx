import React from 'react';
import Hero from '../components/Hero';
import Collections from '../components/Collections';
import Gallery from '../components/Gallery';
import About from '../components/About';

const Home: React.FC = () => {
  return (
    <div className="overflow-x-hidden">
      <Hero />
      <Collections />
      <Gallery />
      <About />
    </div>
  );
};

export default Home;