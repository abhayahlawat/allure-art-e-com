import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../context/AuthContext';
import { Loader2, Clock, ShoppingBag } from 'lucide-react';

type OrderItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image_url?: string;
};

type Order = {
  id: string;
  amount: number;
  status: string;
  created_at: string;
  items: OrderItem[];
  billing_address?: {
    full_name: string;
    street: string;
    city: string;
    state: string;
    postal_code: string;
    country: string;
  };
  shipping_address?: {
    full_name: string;
    street: string;
    city: string;
    state: string;
    postal_code: string;
    country: string;
  };
};

const OrdersPage: React.FC = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState<Order[]>([]);

  const formatDate = (dateString: string) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatCurrency = (amount: number) => {
    if (!amount) return '₹0';
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount / 100);
  };

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user?.email) return;
      
      try {
        setLoading(true);
        
        console.log('Fetching orders for email:', user.email);
        
        const { data: ordersData, error: ordersError } = await supabase
          .from('orders')
          .select('*')
          .eq('email', user.email)
          .order('created_at', { ascending: false });
        
        if (ordersError) {
          console.error('Error fetching orders:', ordersError);
          throw ordersError;
        }
        
        if (!ordersData || ordersData.length === 0) {
          console.log('No orders found for email:', user.email);
          return;
        }
        
        const formattedOrders = ordersData.map(order => ({
          ...order,
          items: Array.isArray(order.items) ? order.items : [],
          billing_address: order.billing_address?.[0] || null,
          shipping_address: order.shipping_address?.[0] || null
        }));
        
        setOrders(formattedOrders);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchOrders();
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center flex-col space-y-4">
        <Loader2 className="h-12 w-12 animate-spin text-pastel-rose" />
        <p className="text-slate-600">Loading your order history...</p>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="px-6 py-8 sm:p-10">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-slate-900">My Orders</h1>
              <p className="mt-1 text-slate-600">View your order history and track your purchases</p>
            </div>
            
            <div className="bg-slate-50 p-6 rounded-xl">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-slate-900">Order History</h2>
                <span className="text-sm text-slate-500">{orders.length} {orders.length === 1 ? 'order' : 'orders'}</span>
              </div>
              
              {orders.length > 0 ? (
                <div className="space-y-6">
                  {orders.map((order) => (
                    <div key={order.id} className="p-6 bg-white rounded-lg shadow-sm border border-slate-200">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                        <div className="mb-4 sm:mb-0">
                          <div className="flex items-center space-x-2">
                            <h3 className="text-lg font-medium text-slate-900">Order #{order.id.split('-')[0]}</h3>
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-800">
                              {order.status}
                            </span>
                          </div>
                          <p className="mt-1 text-sm text-slate-500">
                            {formatDate(order.created_at)}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-medium text-slate-900">
                            {formatCurrency(order.amount)}
                          </p>
                          <p className="text-sm text-slate-500">
                            {order.items?.length || 0} {order.items?.length === 1 ? 'item' : 'items'}
                          </p>
                        </div>
                      </div>
                      
                      <div className="mt-4 pt-4 border-t border-slate-100">
                        <div className="flex items-center justify-between">
                          <div className="flex -space-x-2">
                            {order.items?.slice(0, 3).map((item, index) => (
                              <div 
                                key={index}
                                className="h-10 w-10 rounded-full border-2 border-white bg-slate-200 overflow-hidden"
                                style={{ zIndex: 3 - index }}
                              >
                                {item.image_url ? (
                                  <img 
                                    src={item.image_url} 
                                    alt={item.name} 
                                    className="h-full w-full object-cover"
                                  />
                                ) : (
                                  <div className="h-full w-full flex items-center justify-center bg-slate-100 text-slate-400">
                                    <ShoppingBag className="h-4 w-4" />
                                  </div>
                                )}
                              </div>
                            ))}
                            {order.items?.length > 3 && (
                              <div className="h-10 w-10 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center text-xs font-medium text-slate-500">
                                +{order.items.length - 3}
                              </div>
                            )}
                          </div>
                          <button
                            type="button"
                            className="inline-flex items-center px-3 py-1.5 border border-slate-300 shadow-sm text-xs font-medium rounded-lg text-slate-700 bg-white hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pastel-rose transition-colors"
                            onClick={() => window.location.href = `/order/${order.id}`}
                          >
                            View Details
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-12 text-center">
                  <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-slate-100">
                    <Clock className="h-6 w-6 text-slate-400" />
                  </div>
                  <h3 className="mt-2 text-sm font-medium text-slate-900">No orders found</h3>
                  <p className="mt-1 text-sm text-slate-500">
                    We couldn't find any orders for {user?.email}.
                  </p>
                  <div className="mt-4 p-4 bg-slate-50 rounded-lg text-left text-sm">
                    <p className="font-medium mb-2">Debug Information:</p>
                    <p>• Email being queried: {user?.email}</p>
                    <p>• Please check the browser console for more details.</p>
                  </div>
                  <div className="mt-6">
                    <button
                      type="button"
                      onClick={() => window.location.href = '/gallery'}
                      className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-lg text-white bg-pastel-rose hover:bg-pastel-rose/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pastel-rose transition-colors"
                    >
                      Start Shopping
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrdersPage;
