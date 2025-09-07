import React from 'react';
import { ArrowRight } from 'lucide-react';
import { collections } from '../data/collections';

const Collections: React.FC = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-light text-slate-800 mb-4">
            Featured <span className="font-cursive">Collections</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Discover carefully curated collections that tell unique stories through art
          </p>
        </div>

        {/* Collections Grid - Collage Style */}
        <div className="grid grid-cols-12 gap-4 h-[600px]">
          {/* Large featured collection */}
          <div className="col-span-12 md:col-span-4 row-span-2 relative group overflow-hidden rounded-2xl md:hover:scale-105 transition-transform duration-300">
            <img
              src={collections[0].image}
              alt={collections[0].title}
              className="w-full h-full object-cover md:group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <span className="inline-block bg-white/20 backdrop-blur-sm px-2 py-1 rounded-full text-xs mb-3">
                {collections[0].artworkCount} Artworks
              </span>
              <h3 className="text-2xl font-bold mb-2">{collections[0].title}</h3>
              <p className="text-sm opacity-90 mb-3">{collections[0].description}</p>
              <button className="flex items-center space-x-2 text-white hover:text-pastel-cream transition-colors duration-300">
                <span className="text-sm">Explore Collection</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>

          {/* Medium collections */}
          <div className="col-span-12 md:col-span-4 relative group overflow-hidden rounded-xl md:hover:scale-105 transition-transform duration-300">
            <img
              src={collections[1].image}
              alt={collections[1].title}
              className="w-full h-full object-cover md:group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <span className="text-xs bg-white/20 backdrop-blur-sm px-2 py-1 rounded-full mb-2 inline-block">
                {collections[1].artworkCount} Pieces
              </span>
              <h4 className="text-lg font-semibold mb-1">{collections[1].title}</h4>
              <p className="text-xs opacity-80">{collections[1].description}</p>
            </div>
          </div>

          <div className="col-span-12 md:col-span-4 relative group overflow-hidden rounded-xl md:hover:scale-105 transition-transform duration-300">
            <img
              src={collections[2].image}
              alt={collections[2].title}
              className="w-full h-full object-cover md:group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <span className="text-xs bg-white/20 backdrop-blur-sm px-2 py-1 rounded-full mb-2 inline-block">
                {collections[2].artworkCount} Pieces
              </span>
              <h4 className="text-lg font-semibold mb-1">{collections[2].title}</h4>
              <p className="text-xs opacity-80">{collections[2].description}</p>
            </div>
          </div>

          {/* Small collections */}
          <div className="col-span-6 md:col-span-2 relative group overflow-hidden rounded-xl md:hover:scale-110 transition-transform duration-300">
            <img
              src={collections[3].image}
              alt={collections[3].title}
              className="w-full h-full object-cover md:group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <h5 className="text-lg font-semibold mb-1">{collections[3].title}</h5>
              <span className="text-xs opacity-80">{collections[3].artworkCount} pieces</span>
            </div>
          </div>

          <div className="col-span-6 md:col-span-2 relative group overflow-hidden rounded-xl md:hover:scale-110 transition-transform duration-300">
            <img
              src={collections[4].image}
              alt={collections[4].title}
              className="w-full h-full object-cover md:group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <h5 className="text-lg font-semibold mb-1">{collections[4].title}</h5>
              <span className="text-xs opacity-80">{collections[4].artworkCount} pieces</span>
            </div>
          </div>

          <div className="col-span-12 md:col-span-2 relative group overflow-hidden rounded-xl md:hover:scale-105 transition-transform duration-300">
            <img
              src={collections[5].image}
              alt={collections[5].title}
              className="w-full h-full object-cover md:group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <h5 className="text-lg font-semibold mb-1">{collections[5].title}</h5>
              <span className="text-xs opacity-80">{collections[5].artworkCount} pieces</span>
            </div>
          </div>
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <button className="bg-slate-800 text-white px-8 py-4 rounded-full font-medium md:hover:bg-slate-700 transition-all duration-300 inline-flex items-center space-x-2 md:hover:scale-105 md:hover:-translate-y-1">
            <span>View All Collections</span>
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Collections;