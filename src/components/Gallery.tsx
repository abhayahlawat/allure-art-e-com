import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, ChevronDown } from 'lucide-react';
import ProductCard from './ProductCard';
import ProductModal from './ProductModal';
import { products } from '../data/products';
import { Product } from '../types';

// Custom Dropdown Component
interface DropdownProps {
  label: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: (value: string) => void;
  className?: string;
}

const CustomDropdown: React.FC<DropdownProps> = ({ label, value, options, onChange, className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);

  const selectedOption = options.find(option => option.value === value);

  const handleSelect = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  return (
    <div className={`relative ${className}`}>
      <label className="block text-sm font-medium text-slate-700 mb-2">
        {label}
      </label>
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-300 focus:border-transparent text-sm font-medium text-slate-700 flex items-center justify-between"
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
      >
        <span>{selectedOption?.label}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown size={16} />
        </motion.div>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 z-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />
            
            {/* Dropdown Menu */}
            <motion.div
              className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg z-50 overflow-hidden"
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              <div className="max-h-60 overflow-y-auto">
                {options.map((option, index) => (
                  <motion.button
                    key={option.value}
                    onClick={() => handleSelect(option.value)}
                    className={`w-full px-4 py-3 text-left text-sm hover:bg-slate-50 transition-colors duration-200 ${
                      value === option.value ? 'bg-slate-100 text-slate-900 font-medium' : 'text-slate-700'
                    }`}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05, duration: 0.2 }}
                    whileHover={{ backgroundColor: '#f8fafc' }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {option.label}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

const Gallery: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('name');

  const categories = ['All', ...Array.from(new Set(products.map(p => p.category)))];
  
  const categoryOptions = categories.map(category => ({
    value: category,
    label: category
  }));

  const sortOptions = [
    { value: 'name', label: 'Name A-Z' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'year', label: 'Newest First' }
  ];

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
          className="hidden md:block mb-12 relative z-40"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-gray-100 relative z-40">
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
                  <div className="relative z-50">
                    <CustomDropdown
                      label=""
                      value={sortBy}
                      options={sortOptions}
                      onChange={setSortBy}
                      className="min-w-[180px] relative z-50"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Mobile Filters */}
        <motion.div
          className="md:hidden mb-8 relative z-40"
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

            {/* Mobile Dropdowns */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <CustomDropdown
                label="Category"
                value={selectedCategory}
                options={categoryOptions}
                onChange={setSelectedCategory}
              />
              
              <CustomDropdown
                label="Sort by"
                value={sortBy}
                options={sortOptions}
                onChange={setSortBy}
              />
            </div>
          </div>
        </motion.div>

        {/* Products Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10"
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