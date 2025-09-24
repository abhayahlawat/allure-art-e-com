import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const TermsOfService: React.FC = () => {
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
        
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-6">Terms of Service</h1>
        <p className="text-slate-600 mb-8">Last updated: September 22, 2024</p>

        <div className="prose prose-slate max-w-none space-y-6">
          <section>
            <h2 className="text-2xl font-semibold text-slate-800 mb-4">1. Introduction</h2>
            <p className="text-slate-700">
              Welcome to Allure Art. These Terms of Service ("Terms") govern your access to and use of the Allure Art website and services. By accessing or using our website, you agree to be bound by these Terms and our Privacy Policy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-800 mb-4">2. Account Registration</h2>
            <p className="text-slate-700">
              To access certain features of our website, you may be required to create an account. You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate, current, and complete.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-800 mb-4">3. Purchases and Payments</h2>
            <p className="text-slate-700 mb-2">All purchases made through our website are subject to the following terms:</p>
            <ul className="list-disc pl-6 space-y-2 text-slate-700">
              <li>All prices are in USD and are subject to change without notice.</li>
              <li>We accept various payment methods as indicated on our website.</li>
              <li>You agree to provide current, complete, and accurate purchase and account information.</li>
              <li>We reserve the right to refuse or cancel your order at any time for certain reasons including but not limited to product availability, errors in the description or price of the product, or error in your order.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-800 mb-4">4. Shipping and Delivery</h2>
            <p className="text-slate-700">
              We will make every effort to ship your order within the time frame indicated on our website. However, we cannot guarantee delivery dates and are not responsible for any delays caused by shipping carriers or other circumstances beyond our control.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-800 mb-4">5. Returns and Refunds</h2>
            <p className="text-slate-700">
              We accept returns of unopened and unused items within 30 days of delivery for a full refund. The customer is responsible for return shipping costs unless the return is due to our error. Please contact our customer service for return instructions.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-800 mb-4">6. Intellectual Property</h2>
            <p className="text-slate-700">
              All content included on this website, such as text, graphics, logos, images, and software, is the property of Allure Art or its content suppliers and protected by copyright and other intellectual property laws. You may not reproduce, distribute, or create derivative works without our prior written consent.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-800 mb-4">7. User Content</h2>
            <p className="text-slate-700">
              By submitting content to our website, you grant us a non-exclusive, royalty-free, perpetual, and worldwide license to use, reproduce, modify, adapt, publish, translate, and distribute such content in any media.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-800 mb-4">8. Limitation of Liability</h2>
            <p className="text-slate-700">
              In no event shall Allure Art, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-800 mb-4">9. Changes to Terms</h2>
            <p className="text-slate-700">
              We reserve the right to modify these Terms at any time. We will provide notice of any changes by updating the "Last updated" date at the top of these Terms. Your continued use of our website after such modification constitutes your acceptance of the modified Terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-800 mb-4">10. Contact Us</h2>
            <p className="text-slate-700">
              If you have any questions about these Terms, please contact us at:
            </p>
            <p className="text-slate-700 mt-2">
              Email: allureart09@gmail.com<br />
              Address: 123 Art Street, Creative District
            </p>
          </section>
        </div>
      </motion.div>
    </div>
  );
};

export default TermsOfService;
