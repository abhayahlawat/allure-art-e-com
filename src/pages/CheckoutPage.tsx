import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import Header from '../components/Header';
import { motion, AnimatePresence } from 'framer-motion';

interface Address {
  id?: string;
  full_name: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
  is_default: boolean;
  address_type: 'billing' | 'shipping';
  user_id?: string;
}

const CheckoutPage: React.FC = () => {
  const { cart, getTotalPrice } = useCart();
  const { user, getAuthHeader } = useAuth();
  const navigate = useNavigate();
  
  const handleCartOpen = useCallback(() => {
    console.log('Cart opened from checkout page');
  }, []);

  const getApiUrl = (path: string): string => {
    const base = (import.meta as any).env?.VITE_API_BASE || 'http://localhost:4000';
    return `${base.replace(/\/+$/, '')}/${path.replace(/^\/+/, '')}`;
  };

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [useSameAddress, setUseSameAddress] = useState<boolean>(true);
  const [savedAddresses, setSavedAddresses] = useState<Address[]>([]);
  
  const [billingAddress, setBillingAddress] = useState<Address>({
    full_name: '',
    phone: '',
    street: '',
    city: '',
    state: '',
    postal_code: '',
    country: 'India',
    is_default: true,
    address_type: 'billing'
  });

  const [shippingAddress, setShippingAddress] = useState<Address>({
    full_name: '',
    phone: '',
    street: '',
    city: '',
    state: '',
    postal_code: '',
    country: 'India',
    is_default: true,
    address_type: 'shipping'
  });

  const handleAddressChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    type: 'billing' | 'shipping'
  ): void => {
    const { name, value } = e.target;
    const updateFunction = type === 'billing' ? setBillingAddress : setShippingAddress;
    
    updateFunction(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckout = async (): Promise<void> => {
    try {
      setIsLoading(true);
      setError(null);

      if (!user) {
        navigate('/login', { state: { from: '/checkout' } });
        return;
      }

      const authHeader = await getAuthHeader();
      if (!authHeader) {
        throw new Error('Authentication required');
      }

      // Save billing address
      const billingResponse = await fetch(getApiUrl('api/addresses'), {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': authHeader,
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          ...billingAddress,
          is_default: true,
          user_id: user.id
        })
      });

      if (!billingResponse.ok) {
        throw new Error('Failed to save billing address');
      }

      // Process payment and place order
      // ... (your existing order processing logic)

    } catch (err) {
      console.error('Checkout error:', err);
      setError(err instanceof Error ? err.message : 'An error occurred during checkout');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchAddresses = async (): Promise<void> => {
      try {
        const authHeader = await getAuthHeader();
        if (!authHeader) return;
        
        const response = await fetch(getApiUrl('api/addresses'), {
          method: 'GET',
          headers: { 
            'Authorization': authHeader,
            'Accept': 'application/json'
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch addresses');
        }

        const data = await response.json();
        setSavedAddresses(data);
      } catch (err) {
        console.error('Error fetching addresses:', err);
      }
    };

    if (user) {
      fetchAddresses();
    }
  }, [user]);

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header onCartOpen={handleCartOpen} />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>
          <p className="mb-6">Please sign in to proceed to checkout.</p>
          <button
            onClick={() => navigate('/login', { state: { from: '/checkout' } })}
            className="bg-slate-800 text-white px-6 py-2 rounded-full hover:bg-slate-700 transition-colors"
          >
            Sign In
          </button>
        </main>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header onCartOpen={handleCartOpen} />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>
          <p className="mb-6">Your cart is empty.</p>
          <button
            onClick={() => navigate('/')}
            className="bg-indigo-600 text-white px-6 py-2 rounded-full hover:bg-indigo-700 transition-colors"
          >
            Continue Shopping
          </button>
        </main>
      </div>
    );
  }

  return (
    <motion.div 
      className="min-h-screen bg-gray-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Header onCartOpen={handleCartOpen} />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.h1 
          className="text-3xl font-bold text-gray-900 mb-8"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          Checkout
        </motion.h1>

        <AnimatePresence>
          {error && (
            <motion.div 
              className="mb-6 p-4 bg-red-50 text-red-700 rounded-md"
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
            >
              {error}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Billing Address */}
          <motion.div 
            className="lg:col-span-2 space-y-6"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <motion.div 
              className="bg-white p-6 rounded-lg shadow"
              whileHover={{ scale: 1.005 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <h2 className="text-xl font-semibold mb-4">Billing Address</h2>
              <div className="space-y-4">
                {savedAddresses.length > 0 && (
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Select Saved Billing Address
                    </label>
                    <select
                      className="w-full p-2 border border-gray-300 rounded-md"
                      onChange={(e) => {
                        const selected = savedAddresses.find(addr => addr.id === e.target.value);
                        if (selected) setBillingAddress(selected);
                      }}
                    >
                      <option value="">Select a saved address</option>
                      {savedAddresses
                        .filter(addr => addr.address_type === 'billing')
                        .map(addr => (
                          <option key={addr.id} value={addr.id}>
                            {addr.full_name}, {addr.street}, {addr.city}
                          </option>
                        ))
                      }
                    </select>
                  </div>
                )}
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="full_name"
                      value={billingAddress.full_name}
                      onChange={(e) => handleAddressChange(e, 'billing')}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={billingAddress.phone}
                      onChange={(e) => handleAddressChange(e, 'billing')}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Country *
                    </label>
                    <select
                      name="country"
                      value={billingAddress.country}
                      onChange={(e) => handleAddressChange(e, 'billing')}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                      required
                    >
                      <option value="India">India</option>
                      <option value="United States">United States</option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="Canada">Canada</option>
                      <option value="Australia">Australia</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Street Address *
                  </label>
                  <input
                    type="text"
                    name="street"
                    value={billingAddress.street}
                    onChange={(e) => handleAddressChange(e, 'billing')}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                    required
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      City *
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={billingAddress.city}
                      onChange={(e) => handleAddressChange(e, 'billing')}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      State/Province *
                    </label>
                    <input
                      type="text"
                      name="state"
                      value={billingAddress.state}
                      onChange={(e) => handleAddressChange(e, 'billing')}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Postal Code *
                  </label>
                  <input
                    type="text"
                    name="postal_code"
                    value={billingAddress.postal_code}
                    onChange={(e) => handleAddressChange(e, 'billing')}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                    required
                  />
                </div>
                
                <div className="flex items-center mt-4">
                  <input
                    type="checkbox"
                    id="saveBilling"
                    className="h-4 w-4 text-slate-600 focus:ring-slate-500 border-gray-300 rounded"
                  />
                  <label htmlFor="saveBilling" className="ml-2 text-sm text-gray-700">
                    Save this address for future use
                  </label>
                </div>
              </div>
            </motion.div>

            {/* Shipping Address */}
            <motion.div 
              className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mt-6"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              whileHover={{ scale: 1.005 }}
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-slate-800">Shipping Address</h2>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="sameAsBilling"
                    checked={useSameAddress}
                    onChange={(e) => setUseSameAddress(e.target.checked)}
                    className="h-4 w-4 text-slate-600 focus:ring-slate-500 border-gray-300 rounded"
                  />
                  <label htmlFor="sameAsBilling" className="ml-2 text-sm text-gray-700">
                    Same as billing address
                  </label>
                </div>
              </div>

              {!useSameAddress && (
                <div className="space-y-4">
                  {savedAddresses.length > 0 && (
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Select Saved Shipping Address
                      </label>
                      <select
                        className="w-full p-2 border border-gray-300 rounded-md"
                        onChange={(e) => {
                          const selected = savedAddresses.find(addr => addr.id === e.target.value);
                          if (selected) setShippingAddress(selected);
                        }}
                      >
                        <option value="">Select a saved address</option>
                        {savedAddresses
                          .filter(addr => addr.address_type === 'shipping')
                          .map(addr => (
                            <option key={addr.id} value={addr.id}>
                              {addr.full_name}, {addr.street}, {addr.city}
                            </option>
                          ))
                        }
                      </select>
                    </div>
                  )}
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="full_name"
                        value={shippingAddress.full_name}
                        onChange={(e) => handleAddressChange(e, 'shipping')}
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phone *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={shippingAddress.phone}
                        onChange={(e) => handleAddressChange(e, 'shipping')}
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Country *
                      </label>
                      <select
                        name="country"
                        value={shippingAddress.country}
                        onChange={(e) => handleAddressChange(e, 'shipping')}
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                        required
                      >
                        <option value="India">India</option>
                        <option value="United States">United States</option>
                        <option value="United Kingdom">United Kingdom</option>
                        <option value="Canada">Canada</option>
                        <option value="Australia">Australia</option>
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Street Address *
                    </label>
                    <input
                      type="text"
                      name="street"
                      value={shippingAddress.street}
                      onChange={(e) => handleAddressChange(e, 'shipping')}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        City *
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={shippingAddress.city}
                        onChange={(e) => handleAddressChange(e, 'shipping')}
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        State/Province *
                      </label>
                      <input
                        type="text"
                        name="state"
                        value={shippingAddress.state}
                        onChange={(e) => handleAddressChange(e, 'shipping')}
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Postal Code *
                    </label>
                    <input
                      type="text"
                      name="postal_code"
                      value={shippingAddress.postal_code}
                      onChange={(e) => handleAddressChange(e, 'shipping')}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                      required
                    />
                  </div>
                  
                  <div className="flex items-center mt-4">
                    <input
                      type="checkbox"
                      id="saveShipping"
                      className="h-4 w-4 text-slate-600 focus:ring-slate-500 border-gray-300 rounded"
                    />
                    <label htmlFor="saveShipping" className="ml-2 text-sm text-gray-700">
                      Save this address for future use
                    </label>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>

          {/* Order Summary */}
          <motion.div 
            className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 lg:sticky lg:top-6"
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.3 }}
            whileHover={{ scale: 1.01 }}
          >
            <h2 className="text-xl font-semibold text-slate-800 mb-6">Order Summary</h2>
            
            <div className="space-y-4 mb-6">
              {cart.map((item) => (
                <motion.div 
                  key={item.id}
                  className="flex items-center justify-between"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex items-center">
                    <div className="h-16 w-16 bg-gray-100 rounded-lg overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-sm font-medium text-slate-800">{item.title}</h3>
                      <p className="text-sm text-slate-500">Qty: {item.quantity}</p>
                    </div>
                  </div>
                  <span className="font-medium">₹{(item.price * item.quantity).toLocaleString()}</span>
                </motion.div>
              ))}
            </div>
            
            <div className="space-y-4 border-t border-gray-200 pt-4">
              <div className="flex justify-between">
                <span className="text-slate-600">Subtotal</span>
                <span className="font-medium">₹{getTotalPrice().toLocaleString()}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-slate-600">Shipping</span>
                <span className="font-medium">Free</span>
              </div>
              
              <div className="border-t border-gray-200 pt-4">
                <div className="flex justify-between text-lg font-semibold">
                  <span>Total</span>
                  <span>₹{getTotalPrice().toLocaleString()}</span>
                </div>
              </div>
            </div>
            
            <motion.button
              className="w-full bg-slate-800 text-white py-3 px-4 rounded-full mt-6 hover:bg-slate-700 transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleCheckout}
              disabled={isLoading}
            >
              {isLoading ? 'Processing...' : 'Place Order'}
            </motion.button>
            
            <p className="mt-3 text-xs text-gray-500 text-center">
              By placing your order, you agree to our Terms of Service and Privacy Policy.
            </p>
          </motion.div>
        </div>
      </main>
    </motion.div>
  );
};

export default CheckoutPage;