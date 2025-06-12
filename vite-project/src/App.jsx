import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import AccessibilityToolbar from './components/AccessibilityToolbar';
import VoiceCommand from './components/VoiceCommand'; // Voice input handler

// Pages
import Home from './pages/Home';
import Tutorials from './pages/Tutorials';
import DigiSathiChatbot from './components/DigiSathiChatbot'; // DigiBuddy chatbot
import Feedback from './pages/Feedback';

const App = () => {
  return (
    <Router>
      {/* Global Components */}
      <Navbar />
      <AccessibilityToolbar />
      <VoiceCommand />

      {/* Main Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tutorials" element={<Tutorials />} />
        <Route path="/chatbot" element={<DigiSathiChatbot />} />
        <Route path="/feedback" element={<Feedback />} />
      </Routes>
    </Router>
  );
};

export default App;
