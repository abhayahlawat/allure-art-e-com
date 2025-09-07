import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Cart from './components/Cart';
import BarbaWrapper from './components/BarbaWrapper';
import Home from './pages/Home';
import GalleryPage from './pages/GalleryPage';
import ArtistsPage from './pages/ArtistsPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import WishlistPage from './pages/WishlistPage';
import LoginPage from './pages/LoginPage';

const AppContent: React.FC<{ onCartOpen: () => void; isCartOpen: boolean; onCartClose: () => void }> = ({ 
  onCartOpen, 
  isCartOpen, 
  onCartClose 
}) => {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';

  return (
    <div className="min-h-screen bg-white w-full">
      {!isLoginPage && <Header onCartOpen={onCartOpen} />}
      
      <div data-barba="wrapper">
        <Routes>
          <Route path="/" element={<BarbaWrapper namespace="home"><Home /></BarbaWrapper>} />
          <Route path="/gallery" element={<BarbaWrapper namespace="gallery"><GalleryPage /></BarbaWrapper>} />
          <Route path="/artists" element={<BarbaWrapper namespace="artists"><ArtistsPage /></BarbaWrapper>} />
          <Route path="/about" element={<BarbaWrapper namespace="about"><AboutPage /></BarbaWrapper>} />
          <Route path="/contact" element={<BarbaWrapper namespace="contact"><ContactPage /></BarbaWrapper>} />
          <Route path="/wishlist" element={<BarbaWrapper namespace="wishlist"><WishlistPage /></BarbaWrapper>} />
          <Route path="/login" element={<BarbaWrapper namespace="login"><LoginPage /></BarbaWrapper>} />
        </Routes>
      </div>
      
      {!isLoginPage && <Footer />}
      <Cart isOpen={isCartOpen} onClose={onCartClose} />
    </div>
  );
};

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleCartOpen = () => {
    setIsCartOpen(true);
  };

  const handleCartClose = () => {
    setIsCartOpen(false);
  };

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