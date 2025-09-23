import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Menu, X, Heart, User } from 'lucide-react';
import ProfileModal from './ProfileModal';
import { AnimatePresence, motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useAuth } from '../context/AuthContext';

interface HeaderProps {
  onCartOpen: () => void;
}

const Header: React.FC<HeaderProps> = ({ onCartOpen }) => {
  const { getTotalItems } = useCart();
  const { getWishlistCount } = useWishlist();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [isDesktop, setIsDesktop] = useState<boolean>(typeof window !== 'undefined' ? window.matchMedia('(min-width: 768px)').matches : true);
  const location = useLocation();
  const { user, signOut } = useAuth();

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  // Track viewport to differentiate hover (desktop) vs click (mobile)
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)');
    const update = () => {
      setIsDesktop(mq.matches);
      setShowUserMenu(false);
    };
    update();
    if (mq.addEventListener) mq.addEventListener('change', update);
    else mq.addListener(update);
    return () => {
      if (mq.removeEventListener) mq.removeEventListener('change', update);
      else mq.removeListener(update);
    };
  }, []);

  const navigation = [
    { name: 'Home', path: '/' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Artists', path: '/artists' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <header className="fixed top-4 left-0 right-0 z-50 px-4 sm:px-6 lg:px-8 pointer-events-none">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl border border-gray-200 pointer-events-auto">
        <div className="flex items-center justify-between h-16 px-6">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/">
              <h1 className="text-3xl font-cursive text-slate-800 font-semibold">
                Allure Art
              </h1>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                  location.pathname === item.path 
                    ? 'bg-white/20 text-slate-900' 
                    : 'text-slate-700 hover:text-slate-900 hover:bg-white/10'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-2">
            <Link
              to="/wishlist"
              className="relative p-2 text-slate-700 hover:text-slate-900 transition-colors block rounded-lg hover:bg-slate-100"
            >
              <Heart size={18} />
              {getWishlistCount() > 0 && (
                <span className="absolute -top-1 -right-1 bg-pastel-rose text-slate-800 text-xs w-4 h-4 rounded-full flex items-center justify-center font-medium">
                  {getWishlistCount()}
                </span>
              )}
            </Link>
            
            {user ? (
              <div className="relative">
                <button
                  onClick={() => !isDesktop && setShowUserMenu(v => !v)}
                  onMouseEnter={() => isDesktop && setShowUserMenu(true)}
                  className="p-2 text-slate-700 hover:text-slate-900 transition-colors rounded-lg hover:bg-slate-100"
                  title={user.email || undefined}
                >
                  <User size={18} />
                </button>
                {/* Mobile outside click catcher */}
                {showUserMenu && (
                  <button
                    type="button"
                    className="fixed inset-0 md:hidden z-40"
                    aria-label="Close menu overlay"
                    onClick={() => setShowUserMenu(false)}
                  />
                )}
                <AnimatePresence>
                  {showUserMenu && (
                    <motion.div
                      onMouseLeave={() => isDesktop && setShowUserMenu(false)}
                      className="absolute right-0 mt-2 w-40 bg-white border rounded-xl shadow-lg z-50 origin-top-right"
                      initial={{ opacity: 0, y: -6, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -6, scale: 0.98 }}
                      transition={{ duration: 0.12, ease: 'easeOut' }}
                    >
                      <button onClick={() => { setIsProfileOpen(true); setShowUserMenu(false); }} className="w-full text-left px-4 py-2 hover:bg-gray-50">Profile</button>
                      <button onClick={() => { signOut(); setShowUserMenu(false); }} className="w-full text-left px-4 py-2 hover:bg-gray-50">Sign out</button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link
                to="/login"
                className="p-2 text-slate-700 hover:text-slate-900 transition-colors rounded-lg hover:bg-slate-100"
              >
                <User size={18} />
              </Link>
            )}

            <button
              onClick={onCartOpen}
              className="relative p-2 text-slate-700 hover:text-slate-900 transition-colors rounded-lg hover:bg-slate-100"
            >
              <ShoppingBag size={18} />
              {getTotalItems() > 0 && (
                <span className="absolute -top-1 -right-1 bg-pastel-rose text-slate-800 text-xs w-4 h-4 rounded-full flex items-center justify-center font-medium">
                  {getTotalItems()}
                </span>
              )}
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-slate-700 hover:text-slate-900 rounded-lg hover:bg-slate-100"
            >
              {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div 
          className={`md:hidden border-t border-gray-200 overflow-hidden transition-all duration-400 ease-out ${
            isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <nav className="py-6 px-6">
            <div className="grid grid-cols-1 gap-2">
              {navigation.map((item, index) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`relative group px-4 py-4 rounded-xl text-slate-700 hover:text-slate-900 font-medium transition-all duration-300 transform hover:bg-slate-50 border border-transparent hover:border-slate-200 ${
                    isMenuOpen 
                      ? 'translate-y-0 opacity-100 scale-100' 
                      : 'translate-y-2 opacity-0 scale-95'
                  } ${
                    location.pathname === item.path 
                      ? 'bg-slate-100 text-slate-900 border-slate-200' 
                      : ''
                  }`}
                  style={{ 
                    transitionDelay: isMenuOpen ? `${index * 80}ms` : '0ms' 
                  }}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-base">{item.name}</span>
                    <div className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      location.pathname === item.path 
                        ? 'bg-slate-600 scale-100' 
                        : 'bg-transparent group-hover:bg-slate-300 scale-0 group-hover:scale-100'
                    }`} />
                  </div>
                </Link>
              ))}
              {/* User icon is now only in the header, not in mobile menu */}
            </div>
          </nav>
        </div>
      </div>
      <ProfileModal isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} />
    </header>
  );
};

export default Header;