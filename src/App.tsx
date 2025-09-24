import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import MultiStepLoader from './components/MultiStepLoader';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Cart from './components/Cart';
import Home from './pages/Home';
import GalleryPage from './pages/GalleryPage';
import ArtistsPage from './pages/ArtistsPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import WishlistPage from './pages/WishlistPage';
import LoginPage from './pages/LoginPage';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import CookiePolicy from './pages/CookiePolicy';
import OrderComplete from './pages/OrderComplete';
import CheckoutPage from './pages/CheckoutPage';
import OrdersPage from './pages/OrdersPage';
import CancellationRefundPolicy from './pages/CancellationRefundPolicy';
import { Transition } from "framer-motion";

// Page transition variants
const pageVariants = {
  initial: {
    opacity: 0,
    y: 20,
    scale: 0.98
  },
  in: {
    opacity: 1,
    y: 0,
    scale: 1
  },
  out: {
    opacity: 0,
    y: -20,
    scale: 1.02
  }
};

const pageTransition: Transition = {
  type: 'tween',
  ease: 'anticipate',
  duration: 0.5
};

// Page wrapper component
const PageWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <motion.div
    initial="initial"
    animate="in"
    exit="out"
    variants={pageVariants}
    transition={pageTransition}
  >
    {children}
  </motion.div>
);

const AppContent: React.FC<{ onCartOpen: () => void; isCartOpen: boolean; onCartClose: () => void }> = ({ 
  onCartOpen, 
  isCartOpen, 
  onCartClose 
}) => {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';

  // Scroll to top on route change
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  return (
    <div className="min-h-screen bg-white w-full">
      {!isLoginPage && <Header onCartOpen={onCartOpen} />}
      
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
          <Route path="/gallery" element={<PageWrapper><GalleryPage /></PageWrapper>} />
          <Route path="/artists" element={<PageWrapper><ArtistsPage /></PageWrapper>} />
          <Route path="/about" element={<PageWrapper><AboutPage /></PageWrapper>} />
          <Route path="/contact" element={<PageWrapper><ContactPage /></PageWrapper>} />
          <Route path="/wishlist" element={<PageWrapper><WishlistPage /></PageWrapper>} />
          <Route path="/login" element={<PageWrapper><LoginPage /></PageWrapper>} />
          <Route path="/privacy-policy" element={<PageWrapper><PrivacyPolicy /></PageWrapper>} />
          <Route path="/terms-of-service" element={<PageWrapper><TermsOfService /></PageWrapper>} />
          <Route path="/cookie-policy" element={<PageWrapper><CookiePolicy /></PageWrapper>} />
          <Route path="/order-complete" element={<PageWrapper><OrderComplete /></PageWrapper>} />
          <Route path="/checkout" element={<PageWrapper><CheckoutPage /></PageWrapper>} />
          <Route path="/my-orders" element={<PageWrapper><OrdersPage /></PageWrapper>} />
          <Route path="/cancellation-refund-policy" element={<PageWrapper><CancellationRefundPolicy /></PageWrapper>} />
        </Routes>
      </AnimatePresence>
      
      {!isLoginPage && <Footer />}
      <Cart isOpen={isCartOpen} onClose={onCartClose} />
    </div>
  );
};

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Prevent scroll restoration on page reload
  React.useEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    // Ensure page starts at top on initial load
    window.scrollTo(0, 0);
  }, []);
  const handleCartOpen = () => {
    setIsCartOpen(true);
  };

  const handleCartClose = () => {
    setIsCartOpen(false);
  };

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  if (isLoading) {
    return <MultiStepLoader onComplete={handleLoadingComplete} />;
  }

  return (
    <Router>
      <CartProvider>
        <WishlistProvider>
          <AppContent 
            onCartOpen={handleCartOpen}
            isCartOpen={isCartOpen}
            onCartClose={handleCartClose}
          />
        </WishlistProvider>
      </CartProvider>
    </Router>
  );
}

export default App;