import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const CancellationRefundPolicy: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 pt-24 pb-12 sm:pb-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-lg"
      >
        <Link to="/" className="inline-block mb-6 text-pastel-purple hover:text-pastel-pink transition-colors">
          &larr; Back to Home
        </Link>
        
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-6">Cancellation & Refund Policy</h1>
        <p className="text-slate-600 mb-8">Last updated: September 24, 2024</p>

        <div className="prose prose-slate max-w-none space-y-6">
          <section>
            <h2 className="text-2xl font-semibold text-slate-800 mb-4">1. Order Cancellation</h2>
            <p className="text-slate-700">
              You may cancel your order within 24 hours of placing it, provided that the artwork has not yet been shipped. To cancel your order, please contact us immediately at <a href="mailto:allureart09@gmail.com" className="text-pastel-purple hover:underline">allureart09@gmail.com</a> with your order number and request for cancellation.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-800 mb-4">2. Refund Policy</h2>
            <p className="text-slate-700 mb-4">
              We offer refunds under the following conditions:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-700">
              <li>If the artwork arrives damaged or is not as described</li>
              <li>If the wrong item was shipped</li>
              <li>If your order was cancelled before shipment</li>
            </ul>
            <p className="text-slate-700 mt-4">
              To request a refund, please email us at <a href="mailto:allureart09@gmail.com" className="text-pastel-purple hover:underline">allureart09@gmail.com</a> within 7 days of receiving your order. Please include your order number, the reason for the return, and any supporting photographs if the item is damaged.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-800 mb-4">3. Return Process</h2>
            <p className="text-slate-700">
              Once your return request is approved, we will provide you with return instructions. Please note:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-2 text-slate-700">
              <li>Return shipping costs are the responsibility of the customer unless the return is due to our error</li>
              <li>Original shipping costs are non-refundable</li>
              <li>Items must be returned in their original packaging and condition</li>
              <li>We recommend using a trackable shipping service for returns</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-800 mb-4">4. Processing Time</h2>
            <p className="text-slate-700">
              Please allow 5-7 business days for us to process your return once we receive it. Refunds will be issued to the original payment method. The time it takes for the refund to appear in your account may vary depending on your payment provider.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-800 mb-4">5. Non-Refundable Items</h2>
            <p className="text-slate-700 mb-4">
              The following items are not eligible for return or exchange:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-700">
              <li>Custom or commissioned artwork</li>
              <li>Digital downloads</li>
              <li>Items marked as "Final Sale" or "Non-Refundable"</li>
              <li>Gift cards</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-800 mb-4">6. Contact Us</h2>
            <p className="text-slate-700">
              If you have any questions about our cancellation and refund policy, please contact us at:
            </p>
            <p className="text-slate-700 mt-2">
              Email: <a href="mailto:allureart09@gmail.com" className="text-pastel-purple hover:underline">allureart09@gmail.com</a><br />
              Phone: +91 8923024155<br />
              Business Hours: Monday - Friday, 9:00 AM - 5:00 PM EST
            </p>
          </section>
        </div>
      </motion.div>
    </div>
  );
};

export default CancellationRefundPolicy;
