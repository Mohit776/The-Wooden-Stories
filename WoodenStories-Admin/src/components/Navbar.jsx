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
    { path: '/contact', label: 'Contact Us' },
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
