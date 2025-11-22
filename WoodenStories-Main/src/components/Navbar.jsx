import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Menu, X, User, History, Home as HomeIcon, ShoppingCart as ShoppingCartIcon, Info as InfoIcon, Phone as PhoneIcon } from 'lucide-react';

const Navbar = ({ onToggleSidebar }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const currentPath = location.pathname;

  const isAdminRoute = currentPath.startsWith('/admin'); // detect admin path

  const navLinks = [
    { path: '/', label: 'Home', icon: HomeIcon },
    { path: '/products', label: 'Shop', icon: ShoppingCartIcon },
    { path: '/about', label: 'About', icon: InfoIcon },
    { path: '/contact', label: 'Contact Us', icon: PhoneIcon }
  ];

  const isActive = (path) => currentPath === path;

  const handleNavClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <nav className="fixed w-full z-50 bg-[#2c1910] shadow-lg py-2 sm:py-3 md:py-5 h-14 sm:h-16 md:h-20">
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
                  className="w-5 h-5 sm:w-5 sm:h-5 md:w-6 md:h-6 bg-[#d6c088] rounded-full mr-1 sm:mr-1.5 md:mr-2 flex items-center justify-center"
                  alt="The Wooden Stories logo"
                />
                <span className="text-lg sm:text-sm md:text-base lg:text-3xl">The Wooden Stories</span>
              </Link>
            )}

            {/* Hide rest of navbar for admin route */}
            {!isAdminRoute && (
              <>
                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center space-x-4 lg:space-x-6">
                  {navLinks.map((link) => {
                    const Icon = link.icon;
                    return (
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
                        <div className="flex items-center space-x-1.5">
                          {Icon && <Icon size={16} className="hidden lg:inline-block" />}
                          <span>{link.label}</span>
                        </div>
                        <span
                          className={`absolute -bottom-1 left-0 h-0.5 bg-[#d6c088] transition-all duration-300 ${
                            isActive(link.path) ? 'w-full' : 'w-0 group-hover:w-full'
                          }`}
                        ></span>
                      </Link>
                    );
                  })}
                </div>

                {/* Desktop Action Icons */}
                <div className="hidden md:flex items-center space-x-3 lg:space-x-4">

                  <Link
                    to="/myorders"
                    className="text-[#f3e9c6] hover:text-[#d6c088] transition-colors duration-300 transform hover:scale-110 relative"
                  >
                    <History size={18} />
                  
                  </Link>
             

                  <Link
                    to="/account"
                    className="text-[#f3e9c6] hover:text-[#d6c088] transition-colors duration-300 transform hover:scale-110"
                  >
                    <User size={18} />
                  </Link>

                  

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
                  {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
                </button>
              </>
            )}
          </div>

          {/* Mobile menu stays same */}
          {!isAdminRoute && (
            <div
              className={`md:hidden transition-all duration-300 overflow-hidden ${
                isMenuOpen ? 'max-h-96 opacity-100 mt-2 sm:mt-3' : 'max-h-0 opacity-0'
              }`}
            >
              <div className="bg-[#654f44] rounded-lg p-3 sm:p-4 space-y-2 sm:space-y-3 border z-50 border-[#d6c088] border-opacity-20">
                {navLinks.map((link) => {
                  const Icon = link.icon;
                  return (
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
                      <div className="flex items-center space-x-2">
                        {Icon && <Icon size={16} className="opacity-90" />}
                        <span>{link.label}</span>
                      </div>
                    </Link>
                  );
                })}

                <div className="flex items-center justify-around pt-2 sm:pt-3 border-t border-[#d6c088]/20">
                  <Link
                    to="/myorders"
                    className="text-[#f3e9c6] hover:text-[#d6c088] transition-colors duration-300 flex flex-col items-center text-xs"
                    onClick={handleNavClick}
                  >
                    <History size={18} />
                    <span className="mt-0.5">Orders</span>
                  </Link>
                  <Link
                    to="/account"
                    className="text-[#f3e9c6] hover:text-[#d6c088] transition-colors duration-300 flex flex-col items-center text-xs"
                    onClick={handleNavClick}
                  >
                    <User size={18} />
                    <span className="mt-0.5">Profile</span>
                  </Link>
                  <Link
                    to="/cart"
                    className="text-[#f3e9c6] hover:text-[#d6c088] transition-colors duration-300 flex flex-col items-center text-xs relative"
                    onClick={handleNavClick}
                  >
                    <ShoppingBag size={16} />
                    <span className="mt-0.5">Cart</span>
                    <span className="absolute -top-1 -right-2 bg-[#d6c088] text-[#2c1910] text-[10px] rounded-full h-4 w-4 flex items-center justify-center font-medium">
                      2
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
