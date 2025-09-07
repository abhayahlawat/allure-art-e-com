import React from 'react';
import { motion } from 'framer-motion';
import { Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';

const WishlistPage: React.FC = () => {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleAddToCart = (product: any) => {
    addToCart(product);
    removeFromWishlist(product.id);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="pt-24 min-h-screen bg-gradient-to-b from-white to-pastel-cream"
    >
      {/* Wishlist Content */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {wishlist.length === 0 ? (
            <motion.div
              className="text-center py-20"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Heart size={64} className="mx-auto text-slate-400 mb-6" />
              <h2 className="text-3xl font-light text-slate-800 mb-4">
                Your wishlist is empty
              </h2>
              <p className="text-xl text-slate-600 mb-8">
                Start exploring our gallery and add pieces that speak to your soul
              </p>
              <motion.button
                className="bg-slate-800 text-white px-8 py-4 rounded-full font-medium hover:bg-slate-700 transition-colors duration-300"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                Explore Gallery
              </motion.button>
            </motion.div>
          ) : (
            <>
              <motion.div
                className="mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-2xl font-semibold text-slate-800">
                  {wishlist.length} {wishlist.length === 1 ? 'item' : 'items'} in your wishlist
                </h2>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {wishlist.map((product, index) => (
                  <motion.div
                    key={product.id}
                    className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-500"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                    whileHover={{ y: -5, scale: 1.02 }}
                  >
                    <div className="relative aspect-[4/5] overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-4 right-4">
                        <motion.button
                          onClick={() => removeFromWishlist(product.id)}
                          className="bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors duration-300"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Trash2 size={16} className="text-red-500" />
                        </motion.button>
                      </div>
                    </div>

                    <div className="p-6">
                      <div className="space-y-3">
                        <h3 className="text-xl font-semibold text-slate-800">
                          {product.title}
                        </h3>
                        <p className="text-slate-600 font-medium">by {product.artist}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-2xl font-bold text-slate-800">
                            ₹{(product.price * 83).toLocaleString()}
                          </span>
                          <div className="text-right">
                            <p className="text-sm text-slate-500">{product.dimensions}</p>
                            <p className="text-sm text-slate-500">{product.medium}</p>
                          </div>
                        </div>
                        
                        <div className="flex gap-3 pt-4">
                          <motion.button
                            onClick={() => handleAddToCart(product)}
                            className="flex-1 bg-slate-800 text-white px-4 py-3 rounded-xl font-medium hover:bg-slate-700 transition-colors duration-300 flex items-center justify-center space-x-2"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <ShoppingBag size={16} />
                            <span>Add to Cart</span>
                          </motion.button>
                          
                          <motion.button
                            onClick={() => removeFromWishlist(product.id)}
                            className="p-3 border-2 border-gray-300 rounded-xl hover:border-red-300 hover:text-red-500 transition-colors duration-300"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <Heart size={16} className="fill-red-500 text-red-500" />
                          </motion.button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </motion.div>
  );
};

export default WishlistPage;