import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Menu, X, Search, User, Heart } from 'lucide-react';

const Navbar = ({ onToggleSidebar }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const currentPath = location.pathname;

  const isAdminRoute = currentPath.startsWith('/admin'); // detect admin path

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/products', label: 'Shop' },
    { path: '/about', label: 'About' },
    { path: '/contact', label: 'Contact Us' }
  ];

  const isActive = (path) => currentPath === path;

  const handleNavClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <nav className="fixed w-full z-50 bg-[#2c1910] shadow-lg py-3 sm:py-5 h-16 sm:h-20">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="flex items-center justify-between">

            {/* Left side - Logo or Sidebar toggle */}
            {isAdminRoute ? (
              // ✅ Sidebar toggle button only for /admin route
              <button
                onClick={onToggleSidebar}
                className="text-[#f3e9c6] hover:text-[#d6c088] transition-colors duration-300 p-2 rounded md:hidden"
              >
                <Menu size={22} />
              </button>
            ) : (
              // ✅ Normal site logo for all other routes
              <Link
                to="/"
                className="text-base sm:text-lg md:text-xl font-serif text-[#f3e9c6] tracking-wide hover:scale-105 transition-transform duration-300 cursor-pointer flex items-center"
                onClick={handleNavClick}
              >
                <img
                  src="/logo2.png"
                  className="w-5 h-5 sm:w-6 sm:h-6 bg-[#d6c088] rounded-full mr-1.5 sm:mr-2 flex items-center justify-center"
                  alt="Logo"
                />
                <span className="text-sm sm:text-base md:text-2xl">The Wooden Stories</span>
              </Link>
            )}

            {/* Hide rest of navbar for admin route */}
            {!isAdminRoute && (
              <>
                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center space-x-6">
                  {navLinks.map((link) => (
                    <Link
                      key={link.path}
                      to={link.path}
                      className={`relative px-2 py-1 transition-all duration-300 group ${
                        isActive(link.path)
                          ? 'text-[#d6c088]'
                          : 'text-[#f3e9c6] hover:text-[#d6c088]'
                      }`}
                      onClick={handleNavClick}
                    >
                      {link.label}
                      <span
                        className={`absolute -bottom-1 left-0 h-0.5 bg-[#d6c088] transition-all duration-300 ${
                          isActive(link.path) ? 'w-full' : 'w-0 group-hover:w-full'
                        }`}
                      ></span>
                    </Link>
                  ))}
                </div>

                {/* Desktop Action Icons */}
                <div className="hidden md:flex items-center space-x-4">
             

                  <Link
                    to="/account"
                    className="text-[#f3e9c6] hover:text-[#d6c088] transition-colors duration-300 transform hover:scale-110"
                  >
                    <User size={18} />
                  </Link>

                  {/* <Link
                    to="/wishlist"
                    className="text-[#f3e9c6] hover:text-[#d6c088] transition-colors duration-300 transform hover:scale-110 relative"
                  >
                    <Heart size={18} />
                    <span className="absolute -top-2 -right-2 bg-[#654f44] text-[#f3e9c6] text-xs rounded-full h-4 w-4 flex items-center justify-center">
                      3
                    </span>
                  </Link> */}

                  <Link
                    to="/cart"
                    className="text-[#f3e9c6] hover:text-[#d6c088] transition-colors duration-300 transform hover:scale-110 relative group"
                  >
                    <ShoppingBag size={20} />
                    <span className="absolute -top-2 -right-2 bg-[#d6c088] text-[#2c1910] text-xs rounded-full h-4 w-4 flex items-center justify-center font-medium">
                      2
                    </span>
                  </Link>
                </div>

                {/* Mobile Menu Button */}
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="md:hidden text-[#f3e9c6] hover:text-[#d6c088] transition-colors duration-300 p-1 rounded"
                >
                  {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
                </button>
              </>
            )}
          </div>

          {/* Mobile menu stays same */}
          {!isAdminRoute && (
            <div
              className={`md:hidden transition-all duration-300 overflow-hidden ${
                isMenuOpen ? 'max-h-96 opacity-100 mt-3' : 'max-h-0 opacity-0'
              }`}
            >
              <div className="bg-[#654f44] rounded-lg p-4 space-y-3 border border-[#d6c088] border-opacity-20">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`block w-full text-left px-3 py-2 rounded transition-all duration-300 text-sm ${
                      isActive(link.path)
                        ? 'bg-[#d6c088] text-[#2c1910] font-medium'
                        : 'text-[#f3e9c6] hover:bg-[#654f44] hover:text-[#d6c088]'
                    }`}
                    onClick={handleNavClick}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
