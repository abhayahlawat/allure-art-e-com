import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';

interface OrderItem {
  id: string;
  product_id: string;
  title: string;
  artist: string;
  image?: string | null;
  unit_price_inr: number;
  quantity: number;
}

interface Order {
  id: string;
  status: string;
  amount: number;
  currency: string;
  razorpay_order_id: string;
  order_items: OrderItem[];
}

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:4000';

const OrderComplete: React.FC = () => {
  const [params] = useSearchParams();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const id = params.get('orderId');
    if (!id) {
      setLoading(false);
      return;
    }
    fetch(`${API_BASE}/api/orders/${id}`)
      .then((r) => r.json())
      .then((data) => {
        setOrder(data.order);
      })
      .finally(() => setLoading(false));
  }, [params]);

  if (loading) return <div className="max-w-3xl mx-auto p-8">Loading...</div>;

  if (!order) return (
    <div className="max-w-3xl mx-auto p-8">
      <h1 className="text-2xl font-semibold mb-4">No order found</h1>
      <Link to="/" className="text-slate-700 underline">Go Home</Link>
    </div>
  );

  return (
    <div className="max-w-3xl mx-auto p-8 pt-32">
      <h1 className="text-3xl font-bold text-slate-800 mb-2">Order Confirmed</h1>
      <p className="text-slate-600 mb-6">Order ID: {order.id}</p>
      <div className="bg-white rounded-xl border p-6 mb-6">
        <div className="flex justify-between mb-4">
          <span className="font-medium">Status</span>
          <span className="font-semibold capitalize">{order.status}</span>
        </div>
        <div className="flex justify-between mb-4">
          <span className="font-medium">Amount Paid</span>
          <span className="font-semibold">₹{(order.amount/100).toLocaleString()}</span>
        </div>
      </div>
      <h2 className="text-xl font-semibold mb-3">Items</h2>
      <div className="space-y-4">
        {order.order_items?.map((it) => (
          <div key={it.id} className="flex items-center gap-4 bg-gray-50 p-4 rounded-lg">
            {it.image && <img src={it.image} alt={it.title} className="w-16 h-16 object-cover rounded" />}
            <div className="flex-1">
              <div className="font-medium">{it.title}</div>
              <div className="text-sm text-slate-600">by {it.artist}</div>
            </div>
            <div className="text-right">
              <div>₹{(it.unit_price_inr/100).toLocaleString()}</div>
              <div className="text-sm text-slate-600">Qty: {it.quantity}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8">
        <Link to="/" className="px-6 py-3 rounded-full bg-slate-800 text-white">Continue Shopping</Link>
      </div>
    </div>
  );
};

export default OrderComplete;
