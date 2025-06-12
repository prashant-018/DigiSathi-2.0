// src/pages/Home.jsx
import React from 'react';

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] bg-gradient-to-br from-blue-50 to-indigo-100 text-center px-4 py-12 sm:py-16">
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-blue-800 leading-tight mb-6 animate-fade-in-down">
        Empowering Digital Literacy <br className="hidden sm:inline" /> for a Brighter Tomorrow!
      </h1>
      <p className="text-lg sm:text-xl text-gray-700 max-w-2xl mb-8 leading-relaxed animate-fade-in">
        Welcome to **DigiSathi**, your friendly guide to the digital world. We provide simple, easy-to-understand tutorials for parents and elderly users on essential digital tools like **WhatsApp, Paytm, Google Maps, and much more.**
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <a
          href="/tutorials" // Link to your tutorials page
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transform hover:scale-105 transition duration-300 ease-in-out text-lg"
        >
          Explore Tutorials
        </a>
        <a
          href="/chatbot" // Link to your AI Chat page
          className="bg-yellow-500 hover:bg-yellow-600 text-blue-900 font-bold py-3 px-8 rounded-full shadow-lg transform hover:scale-105 transition duration-300 ease-in-out text-lg"
        >
          Ask Our AI Chat
        </a>
      </div>

      {/* Optional: Add a subtle background pattern or illustration here if desired */}
    </div>
  );
};

export default Home;