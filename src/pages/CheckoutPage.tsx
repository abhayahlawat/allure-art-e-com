import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import Header from '../components/Header';

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
}

const CheckoutPage: React.FC = () => {
  const { cart, getTotalPrice, getTotalItems, clearCart } = useCart();
  const { user, getAuthHeader } = useAuth();
  const navigate = useNavigate();
  // Function to ensure proper URL construction
  const getApiUrl = (path: string) => {
    const base = (import.meta as any).env?.VITE_API_BASE || 'http://localhost:4000';
    return `${base.replace(/\/+$/, '')}/${path.replace(/^\/+/, '')}`;
  };

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [useSameAddress, setUseSameAddress] = useState(true);
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

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const authHeader = await getAuthHeader();
        if (!authHeader) return;
        
        const response = await fetch(getApiUrl('api/addresses'), {
          method: 'GET',
          headers: { 
            'Authorization': authHeader,
            'Accept': 'application/json'
          }
        });
        
        if (!response.ok) {
          const errorText = await response.text();
          console.error('Error response from server:', {
            status: response.status,
            statusText: response.statusText,
            url: response.url,
            error: errorText
          });
          throw new Error(`Failed to fetch addresses: ${response.status} ${response.statusText}`);
        }
        
        if (response.ok) {
          const data = await response.json();
          setSavedAddresses(data);
          
          // Set default addresses if available
          const defaultBilling = data.find((addr: Address) => addr.is_default && addr.address_type === 'billing');
          const defaultShipping = data.find((addr: Address) => addr.is_default && addr.address_type === 'shipping');
          
          if (defaultBilling) setBillingAddress(defaultBilling);
          if (defaultShipping) setShippingAddress(defaultShipping);
        }
      } catch (err) {
        console.error('Error fetching addresses:', err);
      }
    };

    if (user) {
      fetchAddresses();
    }
  }, [user]);

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, type: 'billing' | 'shipping') => {
    const { name, value } = e.target;
    if (type === 'billing') {
      setBillingAddress(prev => ({
        ...prev,
        [name]: value
      }));
    } else {
      setShippingAddress(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleCheckout = async () => {
    try {
      setIsLoading(true);
      setError(null);

      if (!user) {
        navigate('/login', { state: { from: '/checkout' } });
        return;
      }

      console.log('Starting checkout process...');
      
      // Get auth header
      const authHeader = await getAuthHeader();
      if (!authHeader) {
        console.error('No auth header available');
        throw new Error('Authentication required');
      }
      
      console.log('Auth header retrieved');
      console.log('API Base URL:', (import.meta as any).env?.VITE_API_BASE || 'http://localhost:4000');
      
      // First, save the billing address
      const { billingData } = await (async () => {

      // Save billing address
      if (!user?.id) {
        throw new Error('User ID is required to save address');
      }

      const addressToSave = {
        ...billingAddress,
        // Ensure all required fields are present and not empty
        full_name: billingAddress.full_name.trim(),
        phone: billingAddress.phone.trim(),
        street: billingAddress.street.trim(),
        city: billingAddress.city.trim(),
        state: billingAddress.state.trim(),
        postal_code: billingAddress.postal_code.trim(),
        country: billingAddress.country.trim() || 'India',
        is_default: true,
        address_type: 'billing' as const,
        user_id: user.id // Add the user_id field
      };

      // Validate required fields
      const requiredFields = ['full_name', 'phone', 'street', 'city', 'state', 'postal_code'];
      const missingFields = requiredFields.filter(field => !addressToSave[field as keyof typeof addressToSave]);
      
      if (missingFields.length > 0) {
        throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
      }

      console.log('Saving billing address...', addressToSave);
      
      try {
        const requestBody = JSON.stringify(addressToSave);
        console.log('Sending request to save billing address:', {
          url: getApiUrl('api/addresses'),
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json', 
            'Authorization': authHeader,
            'Accept': 'application/json'
          },
          body: requestBody
        });

        const billingResponse = await fetch(getApiUrl('api/addresses'), {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json', 
            'Authorization': authHeader,
            'Accept': 'application/json'
          },
          body: requestBody
        });

        const billingResponseText = await billingResponse.text();
        console.log('Billing address response status:', billingResponse.status);
        console.log('Billing address response headers:', Object.fromEntries(billingResponse.headers.entries()));
        console.log('Billing address response text:', billingResponseText);

        let billingData;
        try {
          billingData = JSON.parse(billingResponseText);
        } catch (e) {
          console.error('Failed to parse billing response as JSON. Response:', billingResponseText);
          throw new Error(`Server returned an invalid response (${billingResponse.status}): ${billingResponseText.substring(0, 200)}`);
        }

        if (!billingResponse.ok) {
          console.error('Billing address API error:', {
            status: billingResponse.status,
            statusText: billingResponse.statusText,
            data: billingData
          });
          throw new Error(billingData?.error || billingData?.message || `Failed to save billing address (${billingResponse.status})`);
        }

        if (!billingResponse.ok) {
          console.error('Billing address error:', billingData);
          throw new Error(billingData.message || billingData.error || 'Failed to save billing address');
        }

        console.log('Billing address saved successfully:', billingData);
        return { billingData, addressToSave };
      } catch (error) {
        console.error('Error saving billing address:', error);
        throw error; // Re-throw to be caught by the outer try-catch
      }

      })();
      
      // If we get here, billing address was saved successfully
      let shippingAddrId = billingData.id; // Default to billing address ID

if (!useSameAddress) {
        console.log('Saving shipping address...', shippingAddress);
        
        const shippingAddressToSave = {
          ...shippingAddress,
          full_name: shippingAddress.full_name.trim(),
          phone: shippingAddress.phone.trim(),
          street: shippingAddress.street.trim(),
          city: shippingAddress.city.trim(),
          state: shippingAddress.state.trim(),
          postal_code: shippingAddress.postal_code.trim(),
          country: shippingAddress.country.trim() || 'India',
          is_default: true,
          address_type: 'shipping' as const,
          user_id: user.id // Add the user_id field
        };

        const shippingResponse = await fetch(getApiUrl('api/addresses'), {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json', 
            'Authorization': authHeader 
          },
          body: JSON.stringify(shippingAddressToSave)
        });

        const shippingResponseText = await shippingResponse.text();
        console.log('Shipping address response status:', shippingResponse.status);
        console.log('Shipping address response text:', shippingResponseText);

        let shippingData;
        try {
          shippingData = JSON.parse(shippingResponseText);
        } catch (e) {
          console.error('Failed to parse shipping response as JSON:', e);
          throw new Error('Invalid response when saving shipping address');
        }

        if (!shippingResponse.ok) {
          console.error('Shipping address error:', shippingData);
          throw new Error(shippingData.error || 'Failed to save shipping address');
        }

        console.log('Shipping address saved:', shippingData);
        shippingAddrId = shippingData.id;
      } else {
        console.log('Using same address for shipping');
      }

      // Create order with addresses
      const totalInPaise = getTotalPrice() * 100;
      const orderPayload = {
        items: cart,
        amount: totalInPaise,
        currency: 'INR',
        billing_address_id: billingData.id,
        shipping_address_id: useSameAddress ? billingData.id : shippingAddrId
      };
      
      console.log('Creating order with payload:', orderPayload);
      
      const orderResponse = await fetch(getApiUrl('api/orders/create-order'), {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json', 
          'Authorization': authHeader 
        },
        body: JSON.stringify(orderPayload)
      });

      const orderResponseText = await orderResponse.text();
      console.log('Order creation response status:', orderResponse.status);
      console.log('Order creation response text:', orderResponseText);

      let orderData;
      try {
        orderData = JSON.parse(orderResponseText);
      } catch (e) {
        console.error('Failed to parse order response as JSON:', e);
        throw new Error('Invalid response when creating order');
      }

      if (!orderResponse.ok) {
        console.error('Order creation error:', orderData);
        throw new Error(orderData?.error || 'Failed to create order');
      }
      
      console.log('Order created successfully:', orderData);

      // Proceed with Razorpay payment
      const options: any = {
        key: (import.meta as any).env?.VITE_RAZORPAY_KEY_ID,
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'Allure Art',
        description: 'Order payment',
        order_id: orderData.razorpayOrder.id,
        handler: async function (response: any) {
          const verifyRes = await fetch(getApiUrl('api/orders/verify'), {
            method: 'POST',
            headers: { 
              'Content-Type': 'application/json',
              'Authorization': authHeader 
            },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              order_id: orderData.id // Include the order ID for verification
            })
          });
          const verifyData = await verifyRes.json();
          if (!verifyRes.ok) {
            alert('Payment verification failed');
            return;
          }
          clearCart();
          navigate(`/order-complete?orderId=${verifyData.order.id}`);
        },
        prefill: {
          name: billingAddress.full_name,
          contact: billingAddress.phone,
          email: user.email
        },
        notes: {
          address: billingAddress.street,
          city: billingAddress.city,
          state: billingAddress.state,
          postal_code: billingAddress.postal_code
        },
        theme: { color: '#0f172a' }
      };

      // Load Razorpay script if not available
      if (!(window as any).Razorpay) {
        await new Promise((resolve, reject) => {
          const s = document.createElement('script');
          s.src = 'https://checkout.razorpay.com/v1/checkout.js';
          s.onload = resolve;
          s.onerror = reject;
          document.body.appendChild(s);
        });
      }

      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    } catch (err: any) {
      setError(err.message || 'Checkout failed. Please try again.');
      console.error('Checkout error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <h2 className="text-2xl font-bold mb-4">Sign In Required</h2>
          <p className="mb-6">Please sign in to proceed to checkout.</p>
          <button
            onClick={() => navigate('/login', { state: { from: '/checkout' } })}
            className="bg-slate-800 text-white px-6 py-2 rounded-full hover:bg-slate-700 transition-colors"
          >
            Sign In
          </button>
        </div>
      </div>
    );
  }

  const handleCartOpen = () => {
    // Handle cart open logic here if needed
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header onCartOpen={handleCartOpen} />
      <main className="flex-1 pt-[5.5rem] pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-slate-800 mb-8">Checkout</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Addresses and Payment */}
          <div className="lg:col-span-2 space-y-8">
            {/* Billing Address */}
            <motion.div 
              className="bg-white p-6 rounded-xl shadow-sm border border-gray-200"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-xl font-semibold mb-4 text-slate-800">Billing Address</h2>
              
              {/* Saved Addresses Dropdown */}
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={billingAddress.phone}
                    onChange={(e) => handleAddressChange(e, 'billing')}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                  <input
                    type="text"
                    name="country"
                    value={billingAddress.country}
                    onChange={(e) => handleAddressChange(e, 'billing')}
                    className="w-full p-2 border border-gray-300 rounded-md bg-gray-100"
                    disabled
                  />
                </div>
                
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Street Address</label>
                  <input
                    type="text"
                    name="street"
                    value={billingAddress.street}
                    onChange={(e) => handleAddressChange(e, 'billing')}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                  <input
                    type="text"
                    name="city"
                    value={billingAddress.city}
                    onChange={(e) => handleAddressChange(e, 'billing')}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                  <input
                    type="text"
                    name="state"
                    value={billingAddress.state}
                    onChange={(e) => handleAddressChange(e, 'billing')}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Postal Code</label>
                  <input
                    type="text"
                    name="postal_code"
                    value={billingAddress.postal_code}
                    onChange={(e) => handleAddressChange(e, 'billing')}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                
                <div className="col-span-2 flex items-center">
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
              className="bg-white p-6 rounded-xl shadow-sm border border-gray-200"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
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
                <>
                  {/* Saved Addresses Dropdown */}
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
                      <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                      <input
                        type="text"
                        name="full_name"
                        value={shippingAddress.full_name}
                        onChange={(e) => handleAddressChange(e, 'shipping')}
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                        required={!useSameAddress}
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                      <input
                        type="tel"
                        name="phone"
                        value={shippingAddress.phone}
                        onChange={(e) => handleAddressChange(e, 'shipping')}
                        className="w-full p-2 border border-gray-300 rounded-md"
                        required={!useSameAddress}
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                      <input
                        type="text"
                        name="country"
                        value={shippingAddress.country}
                        onChange={(e) => handleAddressChange(e, 'shipping')}
                        className="w-full p-2 border border-gray-300 rounded-md bg-gray-100"
                        disabled
                      />
                    </div>
                    
                    <div className="col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Street Address</label>
                      <input
                        type="text"
                        name="street"
                        value={shippingAddress.street}
                        onChange={(e) => handleAddressChange(e, 'shipping')}
                        className="w-full p-2 border border-gray-300 rounded-md"
                        required={!useSameAddress}
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                      <input
                        type="text"
                        name="city"
                        value={shippingAddress.city}
                        onChange={(e) => handleAddressChange(e, 'shipping')}
                        className="w-full p-2 border border-gray-300 rounded-md"
                        required={!useSameAddress}
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                      <input
                        type="text"
                        name="state"
                        value={shippingAddress.state}
                        onChange={(e) => handleAddressChange(e, 'shipping')}
                        className="w-full p-2 border border-gray-300 rounded-md"
                        required={!useSameAddress}
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Postal Code</label>
                      <input
                        type="text"
                        name="postal_code"
                        value={shippingAddress.postal_code}
                        onChange={(e) => handleAddressChange(e, 'shipping')}
                        className="w-full p-2 border border-gray-300 rounded-md"
                        required={!useSameAddress}
                      />
                    </div>
                    
                    <div className="col-span-2 flex items-center">
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
                </>
              )}
            </motion.div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1">
            <motion.div 
              className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 sticky top-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <h2 className="text-xl font-semibold text-slate-800 mb-6">Order Summary</h2>
              
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">{getTotalItems()} items</span>
                  <span className="font-medium">₹{getTotalPrice().toLocaleString()}</span>
                </div>
                
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total</span>
                    <span>₹{getTotalPrice().toLocaleString()}</span>
                  </div>
                </div>
                
                <div className="pt-4">
                  <button
                    onClick={handleCheckout}
                    disabled={isLoading}
                    className={`w-full bg-slate-800 text-white py-3 rounded-full font-medium hover:bg-slate-700 transition-colors ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                  >
                    {isLoading ? 'Processing...' : 'Place Order'}
                  </button>
                  
                  {error && (
                    <div className="mt-4 text-red-600 text-sm">
                      {error}
                    </div>
                  )}
                  
                  <p className="mt-3 text-xs text-gray-500 text-center">
                    By placing your order, you agree to our Terms of Service and Privacy Policy.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
        </div>
      </main>
    </div>
  );
};

export default CheckoutPage;
