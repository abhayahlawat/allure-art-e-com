import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Heart, Share2 } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ product, isOpen, onClose }) => {
  const { addToCart } = useCart();

  if (!product) return null;

  const handleAddToCart = () => {
    addToCart(product);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              <button
                onClick={onClose}
                className="absolute top-6 right-6 z-10 bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors duration-300"
              >
                <X size={24} className="text-slate-700" />
              </button>

              <div className="grid md:grid-cols-2 gap-8 p-8">
                {/* Image */}
                <div className="relative">
                  <motion.img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-[500px] object-cover rounded-2xl shadow-lg"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1, duration: 0.6 }}
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-slate-700">
                      {product.category}
                    </span>
                  </div>
                </div>

                {/* Details */}
                <motion.div
                  className="space-y-6"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                >
                  <div className="space-y-3">
                    <h2 className="text-3xl font-bold text-slate-800">{product.title}</h2>
                    <p className="text-xl text-slate-600 font-medium">by {product.artist}</p>
                    <div className="text-3xl font-bold text-slate-800">
                      ₹{product.price.toLocaleString()}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <p className="text-slate-600 leading-relaxed">{product.description}</p>
                    
                    <div className="grid grid-cols-2 gap-4 py-4 border-t border-gray-200">
                      <div>
                        <p className="text-sm text-slate-500 font-medium">Dimensions</p>
                        <p className="text-slate-800">{product.dimensions}</p>
                      </div>
                      <div>
                        <p className="text-sm text-slate-500 font-medium">Medium</p>
                        <p className="text-slate-800">{product.medium}</p>
                      </div>
                      <div>
                        <p className="text-sm text-slate-500 font-medium">Year</p>
                        <p className="text-slate-800">{product.year}</p>
                      </div>
                      <div>
                        <p className="text-sm text-slate-500 font-medium">Category</p>
                        <p className="text-slate-800">{product.category}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 pt-6">
                    <motion.button
                      onClick={handleAddToCart}
                      className="flex-1 bg-slate-800 text-white px-8 py-4 rounded-full font-medium flex items-center justify-center space-x-2 hover:bg-slate-700 transition-colors duration-300"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <ShoppingBag size={20} />
                      <span>Add to Cart</span>
                    </motion.button>
                    
                    <div className="flex gap-3">
                      <motion.button
                        className="p-4 border-2 border-gray-300 rounded-full hover:border-gray-400 transition-colors duration-300"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Heart size={20} className="text-slate-700" />
                      </motion.button>
                      
                      <motion.button
                        className="p-4 border-2 border-gray-300 rounded-full hover:border-gray-400 transition-colors duration-300"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Share2 size={20} className="text-slate-700" />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProductModal;