import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Menu, X, Heart, User } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

interface HeaderProps {
  onCartOpen: () => void;
}

const Header: React.FC<HeaderProps> = ({ onCartOpen }) => {
  const { getTotalItems } = useCart();
  const { getWishlistCount } = useWishlist();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

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
            
            <Link
              to="/login"
              className="p-2 text-slate-700 hover:text-slate-900 transition-colors block rounded-lg hover:bg-slate-100"
            >
              <User size={18} />
            </Link>

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
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;