import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, Trash2 } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
}

const Cart: React.FC<CartProps> = ({ isOpen, onClose }) => {
  const { cart, removeFromCart, updateQuantity, getTotalPrice, getTotalItems } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h2 className="text-2xl font-semibold text-slate-800">
                  Shopping Cart ({getTotalItems()})
                </h2>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-300"
                >
                  <X size={24} className="text-slate-700" />
                </button>
              </div>

              {/* Cart Items */}
              <div className="flex-1 overflow-y-auto p-6">
                {cart.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-slate-500 text-lg">Your cart is empty</p>
                    <p className="text-slate-400 mt-2">Add some beautiful art to get started!</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {cart.map((item) => (
                      <motion.div
                        key={item.id}
                        className="flex space-x-4 bg-gray-50 p-4 rounded-xl"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        layout
                      >
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-20 h-24 object-cover rounded-lg"
                        />
                        
                        <div className="flex-1 space-y-2">
                          <h3 className="font-semibold text-slate-800">{item.title}</h3>
                          <p className="text-sm text-slate-600">by {item.artist}</p>
                          <p className="font-bold text-slate-800">
                            ₹{(item.price * 83).toLocaleString()}
                          </p>
                          
                          <div className="flex items-center justify-between mt-3">
                            <div className="flex items-center space-x-2">
                              <motion.button
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="p-1 hover:bg-white rounded-full transition-colors duration-300"
                                whileTap={{ scale: 0.9 }}
                              >
                                <Minus size={16} className="text-slate-600" />
                              </motion.button>
                              
                              <span className="w-8 text-center font-medium">{item.quantity}</span>
                              
                              <motion.button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="p-1 hover:bg-white rounded-full transition-colors duration-300"
                                whileTap={{ scale: 0.9 }}
                              >
                                <Plus size={16} className="text-slate-600" />
                              </motion.button>
                            </div>
                            
                            <motion.button
                              onClick={() => removeFromCart(item.id)}
                              className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors duration-300"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <Trash2 size={16} />
                            </motion.button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer */}
              {cart.length > 0 && (
                <div className="border-t border-gray-200 p-6 space-y-4">
                  <div className="flex justify-between items-center text-xl font-bold">
                    <span>Total:</span>
                    <span>₹{(getTotalPrice() * 83).toLocaleString()}</span>
                  </div>
                  
                  <motion.button
                    className="w-full bg-slate-800 text-white py-4 rounded-full font-medium hover:bg-slate-700 transition-colors duration-300"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Proceed to Checkout
                  </motion.button>
                  
                  <button
                    onClick={onClose}
                    className="w-full text-slate-600 py-2 font-medium hover:text-slate-800 transition-colors duration-300"
                  >
                    Continue Shopping
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Cart;