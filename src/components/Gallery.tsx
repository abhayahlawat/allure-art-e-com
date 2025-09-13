import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Filter } from 'lucide-react';
import ProductCard from './ProductCard';
import ProductModal from './ProductModal';
import { products } from '../data/products';
import { Product } from '../types';

const Gallery: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('name');

  const categories = ['All', ...Array.from(new Set(products.map(p => p.category)))];

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = selectedCategory === 'All' 
      ? products 
      : products.filter(p => p.category === selectedCategory);

    return filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low': return a.price - b.price;
        case 'price-high': return b.price - a.price;
        case 'year': return b.year - a.year;
        case 'name':
        default: return a.title.localeCompare(b.title);
      }
    });
  }, [selectedCategory, sortBy]);

  const handleViewDetails = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-5xl font-light text-slate-800 mb-4">
            Our <span className="font-cursive">Gallery</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Explore our curated collection of extraordinary artworks from talented artists around the world
          </p>
        </motion.div>

        {/* Filters */}
        {/* Desktop Filters */}
        <motion.div
          className="hidden md:block mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-slate-100 rounded-xl">
                  <Filter size={20} className="text-slate-700" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800">Filter & Sort</h3>
                  <p className="text-sm text-slate-600">Refine your search</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                {/* Category Pills */}
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-slate-700">Category:</span>
                  <div className="flex flex-wrap gap-2">
                    {categories.map(category => (
                      <motion.button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                          selectedCategory === category
                            ? 'bg-slate-800 text-white shadow-md'
                            : 'bg-gray-100 text-slate-700 hover:bg-gray-200'
                        }`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {category}
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Sort Dropdown */}
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-slate-700">Sort:</span>
                  <div className="relative">
                    <motion.select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="px-4 py-2 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-300 focus:border-transparent text-sm font-medium text-slate-700 cursor-pointer appearance-none pr-8"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <option value="name">Name A-Z</option>
                      <option value="price-low">Price: Low to High</option>
                      <option value="price-high">Price: High to Low</option>
                      <option value="year">Newest First</option>
                    </motion.select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                      <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Mobile Filters */}
        <motion.div
          className="md:hidden mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-100">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-slate-100 rounded-lg">
                  <Filter size={18} className="text-slate-700" />
                </div>
                <h3 className="font-semibold text-slate-800">Filters</h3>
              </div>
              <span className="text-sm text-slate-600">
                {filteredAndSortedProducts.length} results
              </span>
            </div>

            {/* Category Dropdown */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-slate-700 mb-3">
                Category
              </label>
              <div className="relative">
                <motion.select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-300 focus:border-transparent text-sm font-medium text-slate-700 appearance-none pr-10"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </motion.select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Sort Dropdown */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-3">
                Sort by
              </label>
              <div className="relative">
                <motion.select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-300 focus:border-transparent text-sm font-medium text-slate-700 appearance-none pr-10"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <option value="name">Name A-Z</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="year">Newest First</option>
                </motion.select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Products Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          layout
        >
          {filteredAndSortedProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              layout
            >
              <ProductCard 
                product={product} 
                onViewDetails={handleViewDetails}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Results count */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <p className="text-slate-600">
            Showing {filteredAndSortedProducts.length} of {products.length} artworks
          </p>
        </motion.div>
      </div>

      <ProductModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </section>
  );
};

export default Gallery;