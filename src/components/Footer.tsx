import React from 'react';
import { motion } from 'framer-motion';
import { Instagram, Twitter, Facebook, Mail, MapPin, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  const socialLinks = [
    { icon: <Instagram size={20} />, href: '#', label: 'Instagram' },
    { icon: <Twitter size={20} />, href: '#', label: 'Twitter' },
    { icon: <Facebook size={20} />, href: '#', label: 'Facebook' },
    { icon: <Mail size={20} />, href: '#', label: 'Email' }
  ];

  const quickLinks = [
    'About Us', 'Gallery', 'Artists', 'Shipping Info', 'Returns', 'Contact'
  ];

  const categories = [
    'Abstract', 'Landscape', 'Portrait', 'Still Life', 'Contemporary', 'Sculpture'
  ];

  return (
    <footer className="bg-gradient-to-br from-pastel-blush via-pastel-rose to-pastel-lilac">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12">
          {/* Brand */}
          <motion.div
            className="space-y-4 sm:space-y-6 sm:col-span-2 lg:col-span-1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl sm:text-3xl font-cursive text-slate-800">Allure Art</h3>
            <p className="text-slate-700 leading-relaxed text-sm sm:text-base">
              Discover extraordinary art that transforms spaces and inspires souls. Curated with passion, delivered with care.
            </p>
            <div className="flex space-x-3 sm:space-x-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  className="p-2 bg-white/30 backdrop-blur-sm rounded-full hover:bg-white/50 transition-colors duration-300 text-slate-700 hover:text-slate-800"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 + index * 0.1, duration: 0.6 }}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            className="space-y-4 sm:space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <h4 className="text-lg sm:text-xl font-semibold text-slate-800">Quick Links</h4>
            <ul className="space-y-2 sm:space-y-3">
              {quickLinks.map((link, index) => (
                <motion.li
                  key={link}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.05, duration: 0.6 }}
                >
                  <a
                    href="#"
                    className="text-slate-700 hover:text-slate-900 transition-colors duration-300 text-sm sm:text-base"
                  >
                    {link}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Categories */}
          <motion.div
            className="space-y-4 sm:space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <h4 className="text-lg sm:text-xl font-semibold text-slate-800">Categories</h4>
            <ul className="space-y-2 sm:space-y-3">
              {categories.map((category, index) => (
                <motion.li
                  key={category}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.05, duration: 0.6 }}
                >
                  <a
                    href="#"
                    className="text-slate-700 hover:text-slate-900 transition-colors duration-300 text-sm sm:text-base"
                  >
                    {category}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            className="space-y-4 sm:space-y-6 sm:col-span-2 lg:col-span-1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <h4 className="text-lg sm:text-xl font-semibold text-slate-800">Get in Touch</h4>
            <div className="space-y-3 sm:space-y-4">
              <motion.div
                className="flex items-start space-x-3"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7, duration: 0.6 }}
              >
                <MapPin size={16} className="text-slate-600 mt-0.5 flex-shrink-0" />
                <span className="text-slate-700 text-sm sm:text-base">123 Art Street, Creative District</span>
              </motion.div>
              <motion.div
                className="flex items-center space-x-3"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
              >
                <Phone size={16} className="text-slate-600 flex-shrink-0" />
                <span className="text-slate-700 text-sm sm:text-base">+1 (555) 123-4567</span>
              </motion.div>
              <motion.div
                className="flex items-center space-x-3"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.9, duration: 0.6 }}
              >
                <Mail size={16} className="text-slate-600 flex-shrink-0" />
                <span className="text-slate-700 text-sm sm:text-base break-all">hello@allureart.com</span>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          className="border-t border-white/30 mt-8 sm:mt-12 pt-6 sm:pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          <p className="text-slate-600 text-sm text-center md:text-left">
            2024 Allure Art. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center md:justify-end space-x-4 sm:space-x-6">
            <Link to="/privacy-policy" className="text-slate-600 text-sm hover:text-slate-800 transition-colors duration-300">
              Privacy Policy
            </Link>
            <Link to="/terms-of-service" className="text-slate-600 text-sm hover:text-slate-800 transition-colors duration-300">
              Terms of Service
            </Link>
            <Link to="/cookie-policy" className="text-slate-600 text-sm hover:text-slate-800 transition-colors duration-300">
              Cookie Policy
            </Link>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;