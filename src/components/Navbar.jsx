import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const location = useLocation();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    setActiveIndex(-1);
  };

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        setActiveIndex(0);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  useEffect(() => {
    if (activeIndex >= 0 && activeIndex < 3) {
      const timer = setTimeout(() => {
        setActiveIndex(activeIndex + 1);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [activeIndex]);

  const menuItems = [
    { to: "/", label: "Home", initial: "H" },
    { to: "/about", label: "About", initial: "A" },
    { to: "/info-budidaya", label: "Info Budidaya", initial: "I" },
    { to: "/budidaya-tracker", label: "Budidaya Tracker", initial: "B" },
    { to: "/statistics", label: "Statistics", initial: "S" },
  ];

  return (
    <nav className="bg-white w-full fixed z-50 lg:bg-white/70">
      <div className="md:px-16 px-6 py-4 flex justify-between items-center">
        {/* Logo atau Nama Website */}
        <div className="w-40">
          <Link to="/"><img src="/images/logo.svg" alt="logo" /></Link>
        </div>

        {/* Menu Navbar untuk Desktop */}
        <div className="hidden md:flex space-x-8 text-[#142f38] text-sm font-semibold font-['Open Sans']">
          {menuItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={`hover:text-[#318161] transition-colors duration-300 ${
                location.pathname === item.to ? 'text-[#318161]' : ''
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Hamburger Menu untuk Mobile */}
        <div className="md:hidden">
          <button 
            onClick={toggleMenu} 
            className="text-[#142F38] focus:outline-none transition-colors duration-300 hover:text-[#318161] relative w-8 h-5"
            aria-label="Toggle menu"
          >
            <span className={`block absolute h-0.5 w-8 bg-current transform transition duration-300 ease-in-out ${isOpen ? 'rotate-45 translate-y-0' : '-translate-y-2'}`}></span>
            <span className={`block absolute h-0.5 w-8 bg-current transform transition duration-300 ease-in-out ${isOpen ? 'opacity-0' : 'opacity-100'}`}></span>
            <span className={`block absolute h-0.5 w-8 bg-current transform transition duration-300 ease-in-out ${isOpen ? '-rotate-45 translate-y-0' : 'translate-y-2'}`}></span>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div 
        className={`md:hidden bg-white overflow-hidden transition-all duration-500 ease-in-out ${
          isOpen ? 'max-h-[300px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="py-6 px-6 space-y-4 border-t border-[#142F38]/10">
          {menuItems.map((item, index) => (
            <Link
              key={item.to}
              to={item.to}
              className={`block text-[#142F38] hover:text-[#318161] transition-all duration-300 transform ${
                activeIndex >= index ? 'translate-x-0 opacity-100' : 'translate-x-[-20px] opacity-0'
              } ${location.pathname === item.to ? 'text-[#318161]' : ''}`}
              onClick={toggleMenu}
            >
              <span className="inline-block w-8 h-8 mr-3 bg-[#318161] rounded-full text-white text-center leading-8">
                {item.initial}
              </span>
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;