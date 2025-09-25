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

interface CartItem {
  id: string;
  title: string;
  artist: string;
  quantity: number;
  price: number;
  image: string;
}

const CheckoutPage: React.FC = () => {
  const { cart, getTotalPrice, clearCart } = useCart();
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
    address_type: 'billing',
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
    address_type: 'shipping',
  });

  const [billingErrors, setBillingErrors] = useState<{ [key: string]: string }>({});
  const [shippingErrors, setShippingErrors] = useState<{ [key: string]: string }>({});

  const validateAddress = (address: Address): { [key: string]: string } => {
    const errors: { [key: string]: string } = {};
    if (!address.full_name.trim()) errors.full_name = 'Full name is required';
    if (!address.phone.trim()) errors.phone = 'Phone number is required';
    else if (!/^[\+]?[1-9][\d]{0,15}$/.test(address.phone.replace(/\s/g, ''))) {
      errors.phone = 'Invalid phone number';
    }
    if (!address.street.trim()) errors.street = 'Street address is required';
    if (!address.city.trim()) errors.city = 'City is required';
    if (!address.state.trim()) errors.state = 'State is required';
    if (!address.postal_code.trim()) errors.postal_code = 'Postal code is required';
    if (!address.country.trim()) errors.country = 'Country is required';
    return errors;
  };

  const isDuplicateAddress = (address: Address, existingAddresses: Address[]): boolean => {
    const normalize = (str: string) => str.trim().toLowerCase();
    return existingAddresses.some((existing) => {
      return (
        normalize(existing.full_name) === normalize(address.full_name) &&
        normalize(existing.phone) === normalize(address.phone) &&
        normalize(existing.street) === normalize(address.street) &&
        normalize(existing.city) === normalize(address.city) &&
        normalize(existing.state) === normalize(address.state) &&
        normalize(existing.postal_code) === normalize(address.postal_code) &&
        normalize(existing.country) === normalize(address.country) &&
        existing.address_type === address.address_type
      );
    });
  };

  const handleAddressChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    type: 'billing' | 'shipping'
  ): void => {
    const { name, value } = e.target;
    const updateFunction = type === 'billing' ? setBillingAddress : setShippingAddress;
    const updateErrors = type === 'billing' ? setBillingErrors : setShippingErrors;

    updateFunction((prev) => ({
      ...prev,
      [name]: value,
    }));

    updateErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const saveAddress = async (address: Address, authHeader: string): Promise<string | null> => {
    try {
      const existingAddress = savedAddresses.find((existing) =>
        isDuplicateAddress(address, [existing])
      );
      if (existingAddress && existingAddress.id) {
        return existingAddress.id;
      }
      const { user_id, id, ...addressData } = address;
      const response = await fetch(getApiUrl('api/addresses'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': authHeader,
          'Accept': 'application/json',
        },
        body: JSON.stringify(addressData),
      });
      if (!response.ok) {
        let errorMessage = `HTTP ${response.status}: ${response.statusText}`;
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorData.error || errorMessage;
          if (errorMessage.toLowerCase().includes('address already exist')) {
            await fetchAddresses();
            const updatedAddresses = savedAddresses.find((existing) =>
              isDuplicateAddress(address, [existing])
            );
            if (updatedAddresses && updatedAddresses.id) {
              return updatedAddresses.id;
            }
            throw new Error('Failed to retrieve existing address ID');
          }
          throw new Error(errorMessage);
        } catch (e) {
          throw new Error(errorMessage);
        }
      }
      const newAddress = await response.json();
      await fetchAddresses();
      return newAddress.id || null;
    } catch (err) {
      throw err;
    }
  };

  const fetchAddresses = async (): Promise<void> => {
    try {
      const authHeader = await getAuthHeader();
      if (!authHeader) return;
      const response = await fetch(getApiUrl('api/addresses'), {
        method: 'GET',
        headers: {
          'Authorization': authHeader,
          'Accept': 'application/json',
        },
      });
      if (!response.ok) throw new Error(`Failed to fetch addresses: HTTP ${response.status}`);
      const data = await response.json();
      setSavedAddresses(data);
      const defaultBilling = data.find((addr: Address) => addr.address_type === 'billing' && addr.is_default);
      const defaultShipping = data.find((addr: Address) => addr.address_type === 'shipping' && addr.is_default);
      if (defaultBilling) setBillingAddress(defaultBilling);
      if (defaultShipping) setShippingAddress(defaultShipping);
    } catch (err) {
      setError('Failed to load saved addresses. Please try again.');
    }
  };

  const handleCheckout = async (): Promise<void> => {
    try {
      setIsLoading(true);
      setError(null);
      setBillingErrors({});
      setShippingErrors({});

      if (!user) {
        navigate('/login', { state: { from: '/checkout' } });
        return;
      }

      const billingValidationErrors = validateAddress(billingAddress);
      if (Object.keys(billingValidationErrors).length > 0) {
        setBillingErrors(billingValidationErrors);
        throw new Error('Please correct the errors in the billing address.');
      }

      if (!useSameAddress) {
        const shippingValidationErrors = validateAddress(shippingAddress);
        if (Object.keys(shippingValidationErrors).length > 0) {
          setShippingErrors(shippingValidationErrors);
          throw new Error('Please correct the errors in the shipping address.');
        }
      }

      if (!cart || cart.length === 0) throw new Error('Cart is empty');

      const totalPrice = getTotalPrice();
      if (typeof totalPrice !== 'number' || totalPrice <= 0) throw new Error(`Invalid total price: ${totalPrice}`);

      const authHeader = await getAuthHeader();
      if (!authHeader) throw new Error('Authentication required');

      const billingAddressId = await saveAddress(billingAddress, authHeader);
      const shippingAddressId = useSameAddress
        ? await saveAddress({ ...billingAddress, address_type: 'shipping' }, authHeader)
        : await saveAddress(shippingAddress, authHeader);

      if (!billingAddressId || !shippingAddressId) throw new Error('Failed to obtain address IDs for order');

      const orderPayload = {
        items: cart.map((item: CartItem) => ({
          id: item.id,
          title: item.title,
          artist: item.artist,
          image: item.image || null,
          quantity: item.quantity,
          price: item.price,
        })),
        currency: 'INR',
        userId: user.id,
        email: user.email || undefined,
      };

      const orderResponse = await fetch(getApiUrl('api/orders/create-order'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': authHeader,
          'Accept': 'application/json',
        },
        body: JSON.stringify(orderPayload),
      });

      if (!orderResponse.ok) {
        let errorMessage = `Failed to create order: HTTP ${orderResponse.status}`;
        try {
          const errorData = await orderResponse.json();
          errorMessage = errorData.message || errorData.error || errorMessage;
          if (errorData.details) {
            errorMessage += ` - Details: ${JSON.stringify(errorData.details)}`;
          }
        } catch (e) {}
        throw new Error(errorMessage);
      }

      const orderData = await orderResponse.json();
      const { razorpayOrder, amount, currency } = orderData;
      if (!razorpayOrder || !razorpayOrder.id) throw new Error('Payment gateway order creation failed. Please try again later.');

      const razorpayKey = import.meta.env.VITE_RAZORPAY_KEY_ID;
      if (!razorpayKey) throw new Error('Razorpay key not configured.');

      const options = {
        key: razorpayKey,
        amount: amount,
        currency: currency,
        name: 'Allure Art',
        description: 'Order Payment',
        image: '/favicon-32x32.png',
        order_id: razorpayOrder.id,
        handler: async function (response: any) {
          try {
            setIsLoading(true);
            const verifyRes = await fetch(getApiUrl('api/orders/verify'), {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': authHeader,
                'Accept': 'application/json',
              },
              body: JSON.stringify({
                razorpay_order_id: razorpayOrder.id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }),
            });
            if (!verifyRes.ok) {
              let errorMessage = 'Payment verification failed';
              try {
                const errData = await verifyRes.json();
                errorMessage = errData.message || errData.error || errorMessage;
              } catch {}
              setError(errorMessage);
              setIsLoading(false);
              return;
            }
            const verifyData = await verifyRes.json();
            // Navigate first, then clear cart to prevent flash
            navigate('/order-complete', {
              state: {
                orderId: verifyData.order.id,
                total: totalPrice,
              },
              replace: true // Replace the current entry in the history stack
            });
            clearCart(); // Clear cart after navigation is complete
          } catch (err) {
            setError('Payment verification failed. Please contact support.');
            setIsLoading(false);
          }
        },
        prefill: {
          name: billingAddress.full_name,
          email: user.email || '',
          contact: billingAddress.phone,
        },
        notes: {
          address: `${billingAddress.street}, ${billingAddress.city}, ${billingAddress.state}, ${billingAddress.postal_code}, ${billingAddress.country}`,
        },
        theme: {
          color: '#1e293b',
        },
        modal: {
          ondismiss: () => {
            setIsLoading(false);
            setError('Payment cancelled by user.');
          },
        },
      };

      setIsLoading(false);
      // @ts-ignore
      const rzp = new window.Razorpay(options);
      rzp.open();
      setIsLoading(true);

    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during checkout');
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (user) fetchAddresses();
  }, [user, getAuthHeader]);

  useEffect(() => {
    if (useSameAddress) {
      setShippingAddress({
        ...billingAddress,
        address_type: 'shipping',
      });
      setShippingErrors({});
    }
  }, [useSameAddress, billingAddress]);

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Header onCartOpen={handleCartOpen} />
        <main className="min-h-[60vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-40 pb-8">
          <div className="w-full max-w-md">
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-slate-100 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">Sign In Required</h1>
              <p className="text-gray-600 mb-6 text-sm sm:text-base">Please sign in to proceed with your purchase and complete your order.</p>
              
              <div className="mt-6 space-y-4">
                <button
                  onClick={() => navigate('/login', { state: { from: '/checkout' } })}
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-slate-800 hover:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-700 transition-colors duration-200"
                >
                  Sign In
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header onCartOpen={handleCartOpen} />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-[calc(100vh-80px)] flex items-center justify-center">
          <div className="text-center max-w-md mx-auto p-6 bg-white rounded-lg shadow-sm">
            <div className="w-16 h-16 mx-auto mb-4 text-indigo-500">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Your Cart is Empty</h1>
            <p className="text-gray-600 mb-6">Looks like you haven't added any artwork to your cart yet.</p>
            <button
              onClick={() => navigate('/gallery')}
              className="bg-slate-800 hover:bg-slate-900 text-white font-medium px-6 py-2.5 rounded-lg transition-colors inline-flex items-center mx-auto"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              Browse Artwork
            </button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <motion.div
      className="min-h-screen bg-gray-100"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Header onCartOpen={handleCartOpen} />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.h1
          className="text-2xl sm:text-4xl font-bold text-gray-900 mb-8 mt-16"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          Checkout
        </motion.h1>

        <AnimatePresence>
          {error && (
            <motion.div
              className="mb-6 p-4 bg-red-50 text-red-700 rounded-lg border border-red-200 shadow-sm"
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
            >
              <div className="flex justify-between items-start">
                <div>
                  <div className="font-semibold text-red-800">Checkout Error</div>
                  <div className="text-sm mt-1">{error}</div>
                </div>
                <button
                  onClick={() => setError(null)}
                  className="text-red-800 hover:text-red-900 text-lg font-bold focus:outline-none"
                >
                  ×
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Billing Address */}
          <motion.div
            className="lg:col-span-2 space-y-6"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-gray-200">
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4 sm:mb-6">Billing Address</h2>
              <div className="space-y-4 sm:space-y-6">

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="full_name"
                      value={billingAddress.full_name}
                      onChange={(e) => handleAddressChange(e, 'billing')}
                      className={`w-full p-2 sm:p-3 border rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-colors duration-200 text-sm sm:text-base ${
                        billingErrors.full_name ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Enter full name"
                    />
                    {billingErrors.full_name && (
                      <p className="mt-1 text-sm text-red-500">{billingErrors.full_name}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={billingAddress.phone}
                      onChange={(e) => handleAddressChange(e, 'billing')}
                      className={`w-full p-2 sm:p-3 border rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-colors duration-200 text-sm sm:text-base ${
                        billingErrors.phone ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Enter phone number"
                    />
                    {billingErrors.phone && (
                      <p className="mt-1 text-sm text-red-500">{billingErrors.phone}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Country <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="country"
                      value={billingAddress.country}
                      onChange={(e) => handleAddressChange(e, 'billing')}
                      className={`w-full p-2 sm:p-3 border rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-colors duration-200 text-sm sm:text-base ${
                        billingErrors.country ? 'border-red-500' : 'border-gray-300'
                      }`}
                    >
                      <option value="India">India</option>
                      <option value="United States">United States</option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="Canada">Canada</option>
                      <option value="Australia">Australia</option>
                    </select>
                    {billingErrors.country && (
                      <p className="mt-1 text-sm text-red-500">{billingErrors.country}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Street Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="street"
                    value={billingAddress.street}
                    onChange={(e) => handleAddressChange(e, 'billing')}
                    className={`w-full p-2 sm:p-3 border rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-colors duration-200 text-sm sm:text-base ${
                      billingErrors.street ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter street address"
                  />
                  {billingErrors.street && (
                    <p className="mt-1 text-sm text-red-500">{billingErrors.street}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      City <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={billingAddress.city}
                      onChange={(e) => handleAddressChange(e, 'billing')}
                      className={`w-full p-2 sm:p-3 border rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-colors duration-200 text-sm sm:text-base ${
                        billingErrors.city ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Enter city"
                    />
                    {billingErrors.city && (
                      <p className="mt-1 text-sm text-red-500">{billingErrors.city}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      State <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="state"
                      value={billingAddress.state}
                      onChange={(e) => handleAddressChange(e, 'billing')}
                      className={`w-full p-2 sm:p-3 border rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-colors duration-200 text-sm sm:text-base ${
                        billingErrors.state ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Enter state"
                    />
                    {billingErrors.state && (
                      <p className="mt-1 text-sm text-red-500">{billingErrors.state}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Postal Code <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="postal_code"
                      value={billingAddress.postal_code}
                      onChange={(e) => handleAddressChange(e, 'billing')}
                      className={`w-full p-2 sm:p-3 border rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-colors duration-200 text-sm sm:text-base ${
                        billingErrors.postal_code ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Enter postal code"
                    />
                    {billingErrors.postal_code && (
                      <p className="mt-1 text-sm text-red-500">{billingErrors.postal_code}</p>
                    )}
                  </div>
                </div>

                <div className="flex items-center mt-4">
                  <input
                    type="checkbox"
                    id="saveBilling"
                    defaultChecked
                    className="h-4 sm:h-5 w-4 sm:w-5 text-slate-600 focus:ring-slate-500 border-gray-300 rounded"
                  />
                  <label htmlFor="saveBilling" className="ml-2 sm:ml-3 text-sm text-gray-700">
                    Save this address for future use
                  </label>
                </div>
              </div>
            </div>

            {/* Shipping Address */}
            <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6">
                <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4 sm:mb-0">Shipping Address</h2>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="sameAsBilling"
                    checked={useSameAddress}
                    onChange={(e) => setUseSameAddress(e.target.checked)}
                    className="h-4 sm:h-5 w-4 sm:w-5 text-slate-600 focus:ring-slate-500 border-gray-300 rounded"
                  />
                  <label htmlFor="sameAsBilling" className="ml-2 sm:ml-3 text-sm text-gray-700">
                    Same as billing address
                  </label>
                </div>
              </div>

              {!useSameAddress && (
                <div className="space-y-4 sm:space-y-6">
                  {savedAddresses.length > 0 && (
                    <div className="mb-4 sm:mb-6">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Select Saved Shipping Address
                      </label>
                      <select
                        className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-colors duration-200 text-sm sm:text-base"
                        onChange={(e) => {
                          const selected = savedAddresses.find((addr) => addr.id === e.target.value);
                          if (selected) {
                            setShippingAddress(selected);
                            setShippingErrors({});
                          }
                        }}
                      >
                        <option value="">Select a saved address</option>
                        {savedAddresses
                          .filter((addr) => addr.address_type === 'shipping')
                          .map((addr) => (
                            <option key={addr.id} value={addr.id}>
                              {addr.full_name}, {addr.street}, {addr.city}
                            </option>
                          ))}
                      </select>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div className="col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="full_name"
                        value={shippingAddress.full_name}
                        onChange={(e) => handleAddressChange(e, 'shipping')}
                        className={`w-full p-2 sm:p-3 border rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-colors duration-200 text-sm sm:text-base ${
                          shippingErrors.full_name ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Enter full name"
                      />
                      {shippingErrors.full_name && (
                        <p className="mt-1 text-sm text-red-500">{shippingErrors.full_name}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={shippingAddress.phone}
                        onChange={(e) => handleAddressChange(e, 'shipping')}
                        className={`w-full p-2 sm:p-3 border rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-colors duration-200 text-sm sm:text-base ${
                          shippingErrors.phone ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Enter phone number"
                      />
                      {shippingErrors.phone && (
                        <p className="mt-1 text-sm text-red-500">{shippingErrors.phone}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Country <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="country"
                        value={shippingAddress.country}
                        onChange={(e) => handleAddressChange(e, 'shipping')}
                        className={`w-full p-2 sm:p-3 border rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-colors duration-200 text-sm sm:text-base ${
                          shippingErrors.country ? 'border-red-500' : 'border-gray-300'
                        }`}
                      >
                        <option value="India">India</option>
                        <option value="United States">United States</option>
                        <option value="United Kingdom">United Kingdom</option>
                        <option value="Canada">Canada</option>
                        <option value="Australia">Australia</option>
                      </select>
                      {shippingErrors.country && (
                        <p className="mt-1 text-sm text-red-500">{shippingErrors.country}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Street Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="street"
                      value={shippingAddress.street}
                      onChange={(e) => handleAddressChange(e, 'shipping')}
                      className={`w-full p-2 sm:p-3 border rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-colors duration-200 text-sm sm:text-base ${
                        shippingErrors.street ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Enter street address"
                    />
                    {shippingErrors.street && (
                      <p className="mt-1 text-sm text-red-500">{shippingErrors.street}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        City <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={shippingAddress.city}
                        onChange={(e) => handleAddressChange(e, 'shipping')}
                        className={`w-full p-2 sm:p-3 border rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-colors duration-200 text-sm sm:text-base ${
                          shippingErrors.city ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Enter city"
                      />
                      {shippingErrors.city && (
                        <p className="mt-1 text-sm text-red-500">{shippingErrors.city}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        State <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="state"
                        value={shippingAddress.state}
                        onChange={(e) => handleAddressChange(e, 'shipping')}
                        className={`w-full p-2 sm:p-3 border rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-colors duration-200 text-sm sm:text-base ${
                          shippingErrors.state ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Enter state"
                      />
                      {shippingErrors.state && (
                        <p className="mt-1 text-sm text-red-500">{shippingErrors.state}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Postal Code <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="postal_code"
                        value={shippingAddress.postal_code}
                        onChange={(e) => handleAddressChange(e, 'shipping')}
                        className={`w-full p-2 sm:p-3 border rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-colors duration-200 text-sm sm:text-base ${
                          shippingErrors.postal_code ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Enter postal code"
                      />
                      {shippingErrors.postal_code && (
                        <p className="mt-1 text-sm text-red-500">{shippingErrors.postal_code}</p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center mt-4">
                    <input
                      type="checkbox"
                      id="saveShipping"
                      defaultChecked
                      className="h-4 sm:h-5 w-4 sm:w-5 text-slate-600 focus:ring-slate-500 border-gray-300 rounded"
                    />
                    <label htmlFor="saveShipping" className="ml-2 sm:ml-3 text-sm text-gray-700">
                      Save this address for future use
                    </label>
                  </div>
                </div>
              )}
            </div>
          </motion.div>

          {/* Order Summary */}
          <motion.div
            className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-gray-200 lg:sticky lg:top-6 h-fit"
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.3 }}
            whileHover={{ scale: 1.01 }}
          >
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4 sm:mb-6">Order Summary</h2>

            <div className="space-y-4 mb-4 sm:mb-6 max-h-80 overflow-y-auto">
              {cart.map((item: CartItem) => (
                <motion.div
                  key={item.id}
                  className="flex items-center justify-between py-3 border-b border-gray-100"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex items-center">
                    <div className="h-12 sm:h-16 w-12 sm:w-16 bg-gray-100 rounded-lg overflow-hidden">
                      <img src={item.image} alt={item.title} className="h-full w-full object-cover" />
                    </div>
                    <div className="ml-3 sm:ml-4">
                      <h3 className="text-sm font-medium text-gray-900">{item.title}</h3>
                      <p className="text-xs sm:text-sm text-gray-500">By {item.artist}</p>
                      <p className="text-xs sm:text-sm text-gray-500">Qty: {item.quantity}</p>
                    </div>
                  </div>
                  <span className="font-medium text-gray-900 text-sm sm:text-base">
                    ₹{(item.price * item.quantity).toLocaleString()}
                  </span>
                </motion.div>
              ))}
            </div>

            <div className="space-y-4 border-t border-gray-200 pt-4">
              <div className="flex justify-between text-gray-600 text-sm sm:text-base">
                <span>Subtotal</span>
                <span className="font-medium">₹{getTotalPrice().toLocaleString()}</span>
              </div>

              <div className="flex justify-between text-gray-600 text-sm sm:text-base">
                <span>Shipping</span>
                <span className="font-medium text-green-600">Free</span>
              </div>

              <div className="border-t border-gray-200 pt-4">
                <div className="flex justify-between text-base sm:text-lg font-semibold text-gray-900">
                  <span>Total</span>
                  <span>₹{getTotalPrice().toLocaleString()}</span>
                </div>
              </div>
            </div>

            <motion.button
              className="w-full bg-slate-800 text-white py-2 sm:py-3 px-4 rounded-lg mt-4 sm:mt-6 hover:bg-slate-900 transition-colors duration-200 disabled:bg-slate-400 disabled:cursor-not-allowed"
              whileHover={{ scale: isLoading ? 1 : 1.02 }}
              whileTap={{ scale: isLoading ? 1 : 0.98 }}
              onClick={handleCheckout}
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="w-4 sm:w-5 h-4 sm:h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Processing...
                </div>
              ) : (
                'Place Order'
              )}
            </motion.button>

            <p className="mt-3 sm:mt-4 text-xs text-gray-500 text-center">
              By placing your order, you agree to our{' '}
              <a href="/terms" className="text-slate-600 hover:text-slate-800 underline">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="/privacy" className="text-slate-600 hover:text-slate-800 underline">
                Privacy Policy
              </a>.
            </p>
          </motion.div>
        </div>
      </main>
    </motion.div>
  );
};

export default CheckoutPage;