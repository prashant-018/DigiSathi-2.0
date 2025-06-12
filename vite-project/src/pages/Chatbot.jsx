import React, { useState } from 'react';

const Chatbot = () => {
  const [userInput, setUserInput] = useState('');
  const [messages, setMessages] = useState([]);

  const setDefaultQuestion = (question) => {
    setUserInput(question);
  };

  const getResponse = () => {
    if (!userInput.trim()) return;
    // Mock response for now
    setMessages([...messages, { text: userInput, sender: 'user' }, { text: 'This is a sample response.', sender: 'bot' }]);
    setUserInput('');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      {/* Header */}
      <header className="flex justify-between items-center bg-white shadow-md p-4 rounded mb-4">
        <a href="/" className="text-blue-600 font-semibold flex items-center gap-2">
          <i className="fas fa-arrow-left" /> Back
        </a>
        <div className="flex items-center gap-2 text-xl font-bold text-blue-700">
          <img
            src="https://img.icons8.com/fluency/48/000000/chatbot.png"
            alt="DigiSathi"
            className="w-8 h-8"
          />
          DigiSathi
        </div>
      </header>

      {/* Welcome */}
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-blue-700">Welcome to DigiSathi!</h1>
        <p className="text-gray-600">Your personal guide to digital India</p>
      </div>

      {/* App Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-6">
        {[
          { name: 'WhatsApp', img: 'https://img.icons8.com/color/48/000000/whatsapp--v1.png', q: 'How to use WhatsApp for payments?' },
          { name: 'Paytm', img: 'https://img.icons8.com/color/48/000000/paytm.png', q: 'How to send money using Paytm?' },
          { name: 'Google Pay', img: 'https://img.icons8.com/color/48/000000/google-pay.png', q: 'How to use Google Pay for UPI payments?' },
          { name: 'IRCTC', img: 'https://img.icons8.com/color/48/000000/train.png', q: 'How to book tickets on IRCTC?' },
          { name: 'Aadhaar', img: 'https://img.icons8.com/color/48/000000/indian-man.png', q: 'How to use Aadhaar services online?' },
          { name: 'Utility Bills', img: 'https://img.icons8.com/color/48/000000/electricity.png', q: 'How to pay electricity bill online?' },
        ].map((app, index) => (
          <div
            key={index}
            onClick={() => setDefaultQuestion(app.q)}
            className="bg-white rounded-lg shadow p-3 text-center cursor-pointer hover:bg-blue-50"
          >
            <img src={app.img} alt={app.name} className="mx-auto mb-2 w-12 h-12" />
            <div className="font-medium">{app.name}</div>
          </div>
        ))}
      </div>

      {/* Suggestions */}
      <div className="mb-4 text-center">
        <p className="mb-2 text-gray-700">Ask me anything about these apps and services</p>
        <div className="flex flex-wrap justify-center gap-2">
          {['Send money via UPI', 'Mobile recharge', 'Aadhaar status', 'Train tickets'].map((chip, i) => (
            <button
              key={i}
              onClick={() => setDefaultQuestion(chip)}
              className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm hover:bg-blue-200"
            >
              {chip}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Box */}
      <div className="bg-white rounded-md shadow p-4 mb-4 max-h-80 overflow-y-auto">
        {messages.map((msg, idx) => (
          <div key={idx} className={`mb-2 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
            <div className={`inline-block px-3 py-2 rounded-lg ${msg.sender === 'user' ? 'bg-blue-200 text-blue-900' : 'bg-gray-200 text-gray-800'}`}>
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="flex items-center gap-2">
        <input
          type="text"
          placeholder="Ask your question about digital India..."
          className="flex-grow border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && getResponse()}
        />
        <button onClick={getResponse} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          <i className="fas fa-paper-plane" />
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
