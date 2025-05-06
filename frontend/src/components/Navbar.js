import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { FaPiggyBank } from "react-icons/fa";
const Navbar = () => {
  const [navOpen, setNavOpen] = useState(false);
  const toggleNav = () => {
    setNavOpen(!navOpen);
  };
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-[#0a0e1a] shadow-lg h-[80px]">
      <div className="max-w-7xl mx-auto flex justify-between items-center py-4 px-6 mt-[10px]">
        <div className="flex items-center gap-3 text-2xl font-extrabold">
          <FaPiggyBank className="text-pink-400 animate-bounce" />
          <span className="bg-gradient-to-r from-pink-400 to-yellow-400 bg-clip-text text-transparent">
            FinBank
          </span>
        </div>
        <ul className="hidden md:flex gap-8 text-lg font-medium">
          <li>
            <Link to="/" className="text-white hover:text-blue-400 transition-colors">
              Home
            </Link>
          </li>
          <li>
            <Link to="/services" className="text-white hover:text-yellow-400 transition-colors">
              Services
            </Link>
          </li>
          <li>
            <Link to="/about" className="text-white hover:text-green-400 transition-colors">
              About
            </Link>
          </li>
          <li>
            <Link to="/contact" className="text-white hover:text-red-400 transition-colors">
              Contact Us
            </Link>
          </li>
        </ul>
        <div className="md:hidden">
          <button onClick={toggleNav} className="text-white focus:outline-none">
            {navOpen ? <AiOutlineClose size={24} /> : <AiOutlineMenu size={24} />}
          </button>
        </div>
      </div>
      {navOpen && (
        <ul className="md:hidden bg-[#0a0e1a] text-lg font-medium transition-all duration-300">
          <li className="border-b border-gray-700">
            <Link to="/" onClick={toggleNav} className="block text-white py-2 px-4 hover:bg-blue-400 transition-colors">
              Home
            </Link>
          </li>
          <li className="border-b border-gray-700">
            <Link to="/about" onClick={toggleNav} className="block text-white py-2 px-4 hover:bg-green-400 transition-colors">
              About
            </Link>
          </li>
          <li className="border-b border-gray-700">
            <Link to="/services" onClick={toggleNav} className="block text-white py-2 px-4 hover:bg-yellow-400 transition-colors">
              Services
            </Link>
          </li>
          <li className="border-b border-gray-700">
            <Link to="/contact" onClick={toggleNav} className="block text-white py-2 px-4 hover:bg-red-400 transition-colors">
              Contact Us
            </Link>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
