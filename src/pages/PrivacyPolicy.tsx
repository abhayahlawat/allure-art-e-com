import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const PrivacyPolicy: React.FC = () => {
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
        
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-6">Privacy Policy</h1>
        <p className="text-slate-600 mb-8">Last updated: September 22, 2024</p>

        <div className="prose prose-slate max-w-none space-y-6">
          <section>
            <h2 className="text-2xl font-semibold text-slate-800 mb-4">1. Introduction</h2>
            <p className="text-slate-700">
              Welcome to Allure Art. We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you how we look after your personal data when you visit our website and tell you about your privacy rights and how the law protects you.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-800 mb-4">2. Information We Collect</h2>
            <p className="text-slate-700 mb-4">We may collect, use, store, and transfer different kinds of personal data about you, including:</p>
            <ul className="list-disc pl-6 space-y-2 text-slate-700">
              <li>Identity Data (name, username, title)</li>
              <li>Contact Data (billing address, email address, telephone numbers)</li>
              <li>Financial Data (payment card details)</li>
              <li>Transaction Data (details about payments and products you've purchased)</li>
              <li>Technical Data (IP address, login data, browser type)</li>
              <li>Usage Data (how you use our website and services)</li>
              <li>Marketing and Communications Data (your preferences in receiving marketing)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-800 mb-4">3. How We Use Your Data</h2>
            <p className="text-slate-700">
              We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-2 text-slate-700">
              <li>To register you as a new customer</li>
              <li>To process and deliver your orders</li>
              <li>To manage our relationship with you</li>
              <li>To administer and protect our business and this website</li>
              <li>To deliver relevant website content and advertisements to you</li>
              <li>To use data analytics to improve our website, products/services, and customer relationships</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-800 mb-4">4. Data Security</h2>
            <p className="text-slate-700">
              We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used, or accessed in an unauthorized way, altered, or disclosed. We limit access to your personal data to those employees, agents, contractors, and other third parties who have a business need to know.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-800 mb-4">5. Your Legal Rights</h2>
            <p className="text-slate-700 mb-4">
              Under certain circumstances, you have rights under data protection laws in relation to your personal data, including the right to:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-700">
              <li>Request access to your personal data</li>
              <li>Request correction of your personal data</li>
              <li>Request erasure of your personal data</li>
              <li>Object to processing of your personal data</li>
              <li>Request restriction of processing your personal data</li>
              <li>Request transfer of your personal data</li>
              <li>Right to withdraw consent</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-800 mb-4">6. Contact Us</h2>
            <p className="text-slate-700">
              If you have any questions about this privacy policy or our privacy practices, please contact us at:
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

export default PrivacyPolicy;
