import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Heart, Eye } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

interface ProductCardProps {
  product: Product;
  onViewDetails: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onViewDetails }) => {
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product);
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const handleViewDetails = () => {
    onViewDetails(product);
  };

  return (
    <motion.div
      className="group relative bg-white rounded-2xl shadow-md overflow-hidden md:hover:shadow-xl transition-all duration-500"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <motion.img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover md:group-hover:scale-110 transition-transform duration-700"
          whileHover={{ scale: window.innerWidth >= 768 ? 1.1 : 1 }}
        />
        
        {/* Overlay on hover (desktop) */}
        <motion.div
          className="hidden md:flex absolute inset-0 bg-black/40 opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 items-center justify-center space-x-3"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
        >
          <motion.button
            onClick={handleViewDetails}
            className="bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors duration-300"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Eye size={16} className="text-slate-700" />
          </motion.button>
          
          <motion.button
            onClick={handleWishlistToggle}
            className="bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors duration-300"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Heart 
              size={16} 
              className={`transition-colors duration-300 ${
                isInWishlist(product.id) 
                  ? 'text-red-500 fill-red-500' 
                  : 'text-slate-700'
              }`} 
            />
          </motion.button>
          
          <motion.button
            onClick={handleAddToCart}
            className="bg-slate-800 text-white p-2 rounded-full hover:bg-slate-700 transition-colors duration-300"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <ShoppingBag size={16} />
          </motion.button>
        </motion.div>

        {/* Mobile action buttons */}
        <div className="md:hidden absolute top-3 right-3 flex flex-col space-y-2">
          <motion.button
            onClick={handleWishlistToggle}
            className="bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-md"
            whileTap={{ scale: 0.95 }}
          >
            <Heart 
              size={14} 
              className={`transition-colors duration-300 ${
                isInWishlist(product.id) 
                  ? 'text-red-500 fill-red-500' 
                  : 'text-slate-700'
              }`} 
            />
          </motion.button>
          
          <motion.button
            onClick={handleAddToCart}
            className="bg-slate-800 text-white p-2 rounded-full shadow-md"
            whileTap={{ scale: 0.95 }}
          >
            <ShoppingBag size={14} />
          </motion.button>
        </div>

        {/* Category badge */}
        <div className="absolute top-3 left-3">
          <span className="bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium text-slate-700">
            {product.category}
          </span>
        </div>
      </div>

      <div className="p-4">
        <div className="space-y-1">
          <div className="flex items-start justify-between">
            <div className="flex-1" onClick={handleViewDetails}>
              <h3 className="text-lg font-semibold text-slate-800 group-hover:text-slate-600 transition-colors duration-300 cursor-pointer">
                {product.title}
              </h3>
              <p className="text-slate-600 font-medium text-sm">by {product.artist}</p>
            </div>
            {/* Mobile view details button */}
            <motion.button
              onClick={handleViewDetails}
              className="md:hidden bg-slate-100 p-2 rounded-full ml-2"
              whileTap={{ scale: 0.95 }}
            >
              <Eye size={14} className="text-slate-700" />
            </motion.button>
          </div>
          <div className="flex items-center justify-between pt-1">
            <span className="text-xl font-bold text-slate-800">
              ₹{product.price.toLocaleString()}
            </span>
            <div className="text-right">
              <p className="text-xs text-slate-500">{product.dimensions}</p>
              <p className="text-xs text-slate-500">{product.medium}</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;