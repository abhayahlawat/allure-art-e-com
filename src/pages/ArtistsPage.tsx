import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Instagram, Globe, Twitter, MapPin, Calendar, Palette } from 'lucide-react';
import { artists } from '../data/artists';

const ArtistsPage: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    // Set loaded state immediately to prevent stuck feeling
    setIsLoaded(true);
  }, []);

  const handleImageLoad = (artistId: string) => {
    setImagesLoaded(prev => ({ ...prev, [artistId]: true }));
  };
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="pt-24 bg-white min-h-screen"
    >
      {/* Header Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            className="text-6xl font-light text-slate-800 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
            transition={{ duration: 0.6 }}
          >
            Meet Our <span className="font-cursive">Artists</span>
          </motion.h1>
          <motion.p
            className="text-xl text-slate-600 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 15 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Discover the talented individuals behind our extraordinary collection. Each artist brings their unique 
            perspective and creative vision to create pieces that inspire and captivate.
          </motion.p>
        </div>
      </section>

      {/* Artists Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {artists.slice(0, 3).map((artist, index) => (
              <motion.div
                key={artist.id}
                className="group relative bg-white rounded-2xl overflow-hidden shadow-md md:hover:shadow-2xl transition-all duration-500"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
                transition={{ delay: 0.3 + index * 0.1, duration: 0.6 }}
              >
                {/* Artist Image */}
                <div className="relative h-64 overflow-hidden">
                  {/* Image loading placeholder */}
                  {!imagesLoaded[artist.id] && (
                    <div className="absolute inset-0 bg-gradient-to-br from-pastel-lavender to-pastel-cream animate-pulse" />
                  )}
                  
                  <motion.img
                    src={artist.image}
                    alt={artist.name}
                    className={`w-full h-full object-cover md:group-hover:scale-110 transition-all duration-700 ${
                      imagesLoaded[artist.id] ? 'opacity-100' : 'opacity-0'
                    }`}
                    onLoad={() => handleImageLoad(artist.id)}
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  
                  {/* Floating specialty badge */}
                  <motion.div 
                    className="absolute top-4 left-4"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: imagesLoaded[artist.id] ? 1 : 0, scale: imagesLoaded[artist.id] ? 1 : 0.8 }}
                    transition={{ delay: 0.5 + index * 0.1, duration: 0.4 }}
                  >
                    <span className="inline-flex items-center bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-slate-800">
                      <Palette size={12} className="mr-1" />
                      {artist.specialty}
                    </span>
                  </motion.div>

                  {/* Social links overlay */}
                  <motion.div 
                    className="absolute top-4 right-4 flex flex-col space-y-2 opacity-0 md:group-hover:opacity-100 transition-opacity duration-300"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 0, x: imagesLoaded[artist.id] ? 0 : 10 }}
                    transition={{ delay: 0.6 + index * 0.1, duration: 0.4 }}
                  >
                    {artist.socialLinks.instagram && (
                      <motion.a
                        href="#"
                        className="p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors duration-300"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Instagram size={14} className="text-slate-700" />
                      </motion.a>
                    )}
                    {artist.socialLinks.website && (
                      <motion.a
                        href="#"
                        className="p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors duration-300"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Globe size={14} className="text-slate-700" />
                      </motion.a>
                    )}
                    {artist.socialLinks.twitter && (
                      <motion.a
                        href="#"
                        className="p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors duration-300"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Twitter size={14} className="text-slate-700" />
                      </motion.a>
                    )}
                  </motion.div>

                  {/* Artist name overlay */}
                  <motion.div 
                    className="absolute bottom-4 left-4 right-4"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: imagesLoaded[artist.id] ? 1 : 0, y: imagesLoaded[artist.id] ? 0 : 10 }}
                    transition={{ delay: 0.7 + index * 0.1, duration: 0.4 }}
                  >
                    <h3 className="text-2xl font-bold text-white mb-1">
                      {artist.name}
                    </h3>
                    <div className="flex items-center text-white/80 text-sm">
                      <MapPin size={14} className="mr-1" />
                      <span>Based in New York</span>
                    </div>
                  </motion.div>
                </div>

                {/* Artist Info */}
                <motion.div 
                  className="p-5"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 10 }}
                  transition={{ delay: 0.4 + index * 0.1, duration: 0.6 }}
                >
                  <div className="space-y-3">
                    <p className="text-slate-600 leading-relaxed text-sm line-clamp-3">
                      {artist.bio}
                    </p>

                    {/* Mobile social links */}
                    <div className="md:hidden flex justify-center space-x-3 pt-3">
                      {artist.socialLinks.instagram && (
                        <motion.a
                          href="#"
                          className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors duration-300"
                          whileTap={{ scale: 0.95 }}
                        >
                          <Instagram size={16} className="text-slate-700" />
                        </motion.a>
                      )}
                      {artist.socialLinks.website && (
                        <motion.a
                          href="#"
                          className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors duration-300"
                          whileTap={{ scale: 0.95 }}
                        >
                          <Globe size={16} className="text-slate-700" />
                        </motion.a>
                      )}
                      {artist.socialLinks.twitter && (
                        <motion.a
                          href="#"
                          className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors duration-300"
                          whileTap={{ scale: 0.95 }}
                        >
                          <Twitter size={16} className="text-slate-700" />
                        </motion.a>
                      )}
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* Call to Action */}
          <motion.div
            className="text-center mt-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <h3 className="text-2xl font-light text-slate-800 mb-4">
              Interested in <span className="font-cursive">collaborating</span>?
            </h3>
            <p className="text-slate-600 mb-8 max-w-2xl mx-auto">
              We're always looking for talented artists to join our community. 
              Share your vision with art lovers around the world.
            </p>
            <motion.button
              className="bg-slate-800 text-white px-8 py-4 rounded-full font-medium md:hover:bg-slate-700 transition-all duration-300 inline-flex items-center space-x-2"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Become an Artist</span>
              <Calendar size={20} />
            </motion.button>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default ArtistsPage;