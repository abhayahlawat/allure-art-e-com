import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const CookiePolicy: React.FC = () => {
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
        
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-6">Cookie Policy</h1>
        <p className="text-slate-600 mb-8">Last updated: September 22, 2024</p>

        <div className="prose prose-slate max-w-none space-y-6">
          <section>
            <h2 className="text-2xl font-semibold text-slate-800 mb-4">1. What Are Cookies</h2>
            <p className="text-slate-700">
              Cookies are small text files that are placed on your computer or mobile device when you visit a website. They are widely used to make websites work more efficiently and to provide information to the site owners.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-800 mb-4">2. How We Use Cookies</h2>
            <p className="text-slate-700 mb-4">We use cookies for various purposes, including:</p>
            <ul className="list-disc pl-6 space-y-2 text-slate-700">
              <li><strong>Essential Cookies:</strong> These are necessary for the website to function and cannot be switched off.</li>
              <li><strong>Performance Cookies:</strong> These help us understand how visitors interact with our website.</li>
              <li><strong>Functionality Cookies:</strong> These enable enhanced functionality and personalization.</li>
              <li><strong>Targeting Cookies:</strong> These may be set through our site by our advertising partners.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-800 mb-4">3. Types of Cookies We Use</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-slate-700">3.1 Session Cookies</h3>
                <p className="text-slate-700">These are temporary cookies that are deleted when you close your browser. They are essential for the website to function properly.</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-700">3.2 Persistent Cookies</h3>
                <p className="text-slate-700">These remain on your device for a set period or until you delete them. They help us recognize you when you return to our website.</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-700">3.3 Third-Party Cookies</h3>
                <p className="text-slate-700">These are set by third-party services we use, such as Google Analytics and social media platforms.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-800 mb-4">4. Managing Cookies</h2>
            <p className="text-slate-700 mb-4">You can control and manage cookies in various ways:</p>
            <ul className="list-disc pl-6 space-y-2 text-slate-700">
              <li>Browser settings: Most browsers allow you to refuse or accept cookies and to delete them.</li>
              <li>Browser add-ons: You can use browser add-ons to block or manage cookies.</li>
              <li>Device settings: On mobile devices, you can manage cookies in your device settings.</li>
            </ul>
            <p className="text-slate-700 mt-4">
              Please note that if you disable cookies, some features of our website may not function properly.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-800 mb-4">5. Changes to This Cookie Policy</h2>
            <p className="text-slate-700">
              We may update our Cookie Policy from time to time. We will notify you of any changes by posting the new Cookie Policy on this page and updating the "Last updated" date at the top of this policy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-800 mb-4">6. Contact Us</h2>
            <p className="text-slate-700">
              If you have any questions about this Cookie Policy, please contact us at:
            </p>
            <p className="text-slate-700 mt-2">
              Email: allureart09@gmail.com<br />
              Address: 123 Art Street, Creative District
            </p>
          </section>

          <section className="bg-pastel-blush/30 p-4 rounded-lg">
            <h2 className="text-xl font-semibold text-slate-800 mb-2">Your Cookie Preferences</h2>
            <p className="text-slate-700 mb-4">
              We use cookies to enhance your experience on our website. You can manage your cookie preferences below:
            </p>
            <div className="space-y-3">
              <div className="flex items-center">
                <input type="checkbox" id="essential" className="rounded text-pastel-purple" checked disabled />
                <label htmlFor="essential" className="ml-2 text-slate-700">Essential Cookies (Required)</label>
              </div>
              <div className="flex items-center">
                <input type="checkbox" id="analytics" className="rounded text-pastel-purple" defaultChecked />
                <label htmlFor="analytics" className="ml-2 text-slate-700">Analytics Cookies</label>
              </div>
              <div className="flex items-center">
                <input type="checkbox" id="marketing" className="rounded text-pastel-purple" defaultChecked />
                <label htmlFor="marketing" className="ml-2 text-slate-700">Marketing Cookies</label>
              </div>
              <div className="flex items-center">
                <input type="checkbox" id="preferences" className="rounded text-pastel-purple" defaultChecked />
                <label htmlFor="preferences" className="ml-2 text-slate-700">Preference Cookies</label>
              </div>
            </div>
            <button className="mt-4 px-4 py-2 bg-pastel-purple text-white rounded-md hover:bg-pastel-pink transition-colors">
              Save Preferences
            </button>
          </section>
        </div>
      </motion.div>
    </div>
  );
};

export default CookiePolicy;
