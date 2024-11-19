import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Call on mount to set initial state

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const onLogout = () => {
    localStorage.removeItem("user");
    Swal.fire({
      icon: "success",
      title: "Logout berhasil",
      text: "Anda telah keluar dari akun.",
      confirmButtonText: "OK",
    });
  };

  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate("/");
  };

  const menuItems = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About" },
    { to: "/info-budidaya", label: "Info Budidaya" },
    { to: "/budidaya-tracker", label: "Budidaya Tracker" },
    { to: "/statistics", label: "Statistics" },
  ];

  return (
    <nav className="bg-white w-full fixed z-50">
      <div className="md:px-16 px-6 py-4 flex justify-between items-center">
        {/* Logo or Website Name */}
        <div className="w-40">
          <Link to="/">
            <img src="/images/logo.svg" alt="logo" />
          </Link>
        </div>

        {/* Menu Navbar for Desktop */}
        <div className="flex-1 hidden md:flex justify-center">
          <div className="space-x-8 text-[#142f38] text-sm font-semibold font-['Open Sans']">
            {menuItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={`hover:text-[#318161] transition-colors duration-300 ${
                  location.pathname === item.to ? "text-[#318161]" : ""
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Login/Logout Button (Only on Desktop) */}
        {!isMobile && (
          <div>
            {user ? (
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors duration-300"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors duration-300"
              >
                Login
              </Link>
            )}
          </div>
        )}

        {/* Hamburger Menu for Mobile */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-[#142F38] focus:outline-none transition-colors duration-300 hover:text-[#318161] relative w-8 h-5"
            aria-label="Toggle menu"
          >
            <span
              className={`block absolute h-0.5 w-8 bg-current transform transition duration-300 ease-in-out ${
                isOpen ? "rotate-45 translate-y-0" : "-translate-y-2"
              }`}
            ></span>
            <span
              className={`block absolute h-0.5 w-8 bg-current transform transition duration-300 ease-in-out ${
                isOpen ? "opacity-0" : "opacity-100"
              }`}
            ></span>
            <span
              className={`block absolute h-0.5 w-8 bg-current transform transition duration-300 ease-in-out ${
                isOpen ? "-rotate-45 translate-y-0" : "translate-y-2"
              }`}
            ></span>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden bg-white overflow-hidden transition-all duration- 300 ease-in-out ${isOpen ? "max-h-screen" : "max-h-0"}`}
      >
        <div className="flex flex-col">
          {menuItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={`py-2 px-4 text-[#142f38] hover:bg-gray-200 transition-colors duration-300 ${
                location.pathname === item.to ? "bg-gray-200" : ""
              }`}
              onClick={() => setIsOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          {user ? (
            <button
              onClick={handleLogout}
              className="py-2 px-4 text-red-500 hover:bg-red-100 transition-colors duration-300"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="py-2 px-4 text-green-500 hover:bg-green-100 transition-colors duration-300"
              onClick={() => setIsOpen(false)}
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;