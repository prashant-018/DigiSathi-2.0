// src/components/Navbar.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'; // Example for hamburger icon

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false); // State to manage mobile menu visibility

  return (
    <nav className="bg-gradient-to-r from-blue-700 to-blue-900 text-white p-4 shadow-lg relative z-50">
      <div className="container mx-auto flex justify-between items-center">
        {/* Brand Logo/Name */}
        <Link to="/" className="text-2xl font-extrabold tracking-wide hover:text-blue-200 transition duration-300 ease-in-out">
          DigiSathi
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex gap-8 text-lg font-medium">
          <li>
            <Link
              to="/"
              className="hover:text-yellow-300 transition duration-300 ease-in-out py-2 px-3 rounded-md hover:bg-blue-600"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/tutorials"
              className="hover:text-yellow-300 transition duration-300 ease-in-out py-2 px-3 rounded-md hover:bg-blue-600"
            >
              Tutorials
            </Link>
          </li>
          <li>
            <Link
              to="/chatbot"
              className="hover:text-yellow-300 transition duration-300 ease-in-out py-2 px-3 rounded-md hover:bg-blue-600"
            >
              AI Chat
            </Link>
          </li>
          <li>
            <Link
              to="/feedback"
              className="hover:text-yellow-300 transition duration-300 ease-in-out py-2 px-3 rounded-md hover:bg-blue-600"
            >
              Feedback
            </Link>
          </li>
        </ul>

        {/* Mobile Menu Button (Hamburger) */}
        <div className="md:hidden flex items-center">
          <button onClick={() => setIsOpen(!isOpen)} className="text-white focus:outline-none">
            {isOpen ? (
              <XMarkIcon className="h-8 w-8 text-yellow-300" /> // 'X' icon when open
            ) : (
              <Bars3Icon className="h-8 w-8 text-white" /> // Hamburger icon when closed
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation (Dropdown) */}
      <div
        className={`md:hidden absolute top-full left-0 w-full bg-blue-800 shadow-lg transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
        }`}
      >
        <ul className="flex flex-col items-center py-4 space-y-4 text-lg">
          <li>
            <Link
              to="/"
              onClick={() => setIsOpen(false)} // Close menu on link click
              className="block w-full text-center py-2 px-4 hover:bg-blue-700 hover:text-yellow-300 rounded-md transition duration-300 ease-in-out"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/tutorials"
              onClick={() => setIsOpen(false)}
              className="block w-full text-center py-2 px-4 hover:bg-blue-700 hover:text-yellow-300 rounded-md transition duration-300 ease-in-out"
            >
              Tutorials
            </Link>
          </li>
          <li>
            <Link
              to="/chatbot"
              onClick={() => setIsOpen(false)}
              className="block w-full text-center py-2 px-4 hover:bg-blue-700 hover:text-yellow-300 rounded-md transition duration-300 ease-in-out"
            >
              AI Chat
            </Link>
          </li>
          <li>
            <Link
              to="/feedback"
              onClick={() => setIsOpen(false)}
              className="block w-full text-center py-2 px-4 hover:bg-blue-700 hover:text-yellow-300 rounded-md transition duration-300 ease-in-out"
            >
              Feedback
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;