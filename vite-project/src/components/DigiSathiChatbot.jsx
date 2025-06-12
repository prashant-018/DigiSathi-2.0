import React, { useState, useEffect, useRef } from 'react';

const DigiSathiChatbot = () => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const addMessage = (sender, content, role) => {
    setMessages((prev) => [...prev, { sender, content, role }]);
  };

  const getResponse = async () => {
    const userMessage = userInput.trim();
    if (!userMessage || isTyping) return;

    addMessage('You', userMessage, 'user');
    setUserInput('');
    setIsTyping(true);

    try {
      const response = await fetch('http://localhost:5000/api/chat', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          messages: [
            { 
              role: 'system', 
              content: 'You are DigiSathi, a helpful guide for digital India initiatives. Provide concise, accurate answers about government programs, digital services, and citizen benefits.' 
            },
            ...messages
              .filter(msg => msg.role !== 'system')
              .map(msg => ({
                role: msg.role,
                content: msg.content
              })),
            { role: 'user', content: userMessage }
          ]
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.error?.message || 
          errorData.details || 
          `Server responded with status ${response.status}`
        );
      }

      const data = await response.json();
      
      if (!data.reply) {
        throw new Error('Received empty response from server');
      }

      addMessage('DigiSathi', data.reply, 'bot');
    } catch (err) {
      console.error('Chat error:', err);
      addMessage(
        'DigiSathi', 
        `Sorry, I encountered an error: ${err.message}`,
        'bot'
      );
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white dark:bg-gray-900 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-800">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-400 dark:from-blue-300 dark:to-teal-300">
          DigiSathi Chatbot
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Ask anything about Digital India 🇮🇳
        </p>
      </div>

      <div className="h-[400px] overflow-y-auto space-y-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-inner">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`p-3 rounded-xl max-w-[80%] whitespace-pre-wrap break-words ${
              msg.role === 'user'
                ? 'ml-auto bg-gradient-to-r from-blue-100 to-blue-200 dark:from-blue-700 dark:to-blue-800 text-right'
                : 'mr-auto bg-gray-200 dark:bg-gray-700 text-left'
            }`}
          >
            <strong className="block mb-1 text-blue-600 dark:text-blue-300">{msg.sender}</strong>
            <span className="text-gray-800 dark:text-gray-100">{msg.content}</span>
          </div>
        ))}
        {isTyping && (
          <div className="mr-auto bg-gray-300 dark:bg-gray-700 text-gray-600 dark:text-gray-300 italic p-3 rounded-xl max-w-[80%]">
            DigiSathi is typing...
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="flex items-center gap-2 mt-4">
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && getResponse()}
          placeholder="Type your question..."
          className="flex-1 p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={isTyping}
        />
        <button
          onClick={getResponse}
          disabled={!userInput.trim() || isTyping}
          className={`flex items-center gap-2 bg-blue-600 text-white font-semibold px-5 py-3 rounded-lg transition duration-200 ${
            !userInput.trim() || isTyping
              ? 'opacity-50 cursor-not-allowed'
              : 'hover:bg-blue-700'
          }`}
        >
          {isTyping ? (
            <>
              <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                />
              </svg>
              Processing...
            </>
          ) : (
            'Send'
          )}
        </button>
      </div>
    </div>
  );
};

export default DigiSathiChatbot;
