import React, { useEffect, useState, useCallback, useRef } from 'react';
import { MinusIcon, PlusIcon, ArrowPathIcon, SunIcon, MoonIcon } from '@heroicons/react/24/outline';

const AccessibilityToolbar = () => {
  // State for font size (persisted in localStorage for better UX)
  const [fontSize, setFontSize] = useState(() => {
    const savedFontSize = localStorage.getItem('digisathi-fontSize');
    return savedFontSize ? parseInt(savedFontSize, 10) : 16;
  });

  // State for high contrast mode (persisted in localStorage)
  const [highContrast, setHighContrast] = useState(() => {
    const savedContrast = localStorage.getItem('digisathi-highContrast');
    return savedContrast === 'true'; // Convert string to boolean
  });

  // State for position
  const [position, setPosition] = useState(() => {
    const savedPosition = localStorage.getItem('digisathi-toolbarPosition');
    return savedPosition ? JSON.parse(savedPosition) : { x: 20, y: 20 };
  });

  // State for dragging
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const toolbarRef = useRef(null);

  // Effect to apply font size changes to the document's root element
  useEffect(() => {
    document.documentElement.style.fontSize = `${fontSize}px`;
    localStorage.setItem('digisathi-fontSize', fontSize.toString());
  }, [fontSize]);

  // Effect to apply high contrast mode to the document's body
  useEffect(() => {
    if (highContrast) {
      document.body.classList.add('high-contrast-mode');
    } else {
      document.body.classList.remove('high-contrast-mode');
    }
    localStorage.setItem('digisathi-highContrast', highContrast.toString());
  }, [highContrast]);

  // Save position to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('digisathi-toolbarPosition', JSON.stringify(position));
  }, [position]);

  // Memoized functions for font size adjustments
  const increaseFont = useCallback(() => setFontSize((prev) => Math.min(prev + 2, 22)), []);
  const decreaseFont = useCallback(() => setFontSize((prev) => Math.max(prev - 2, 14)), []);
  const resetFont = useCallback(() => setFontSize(16), []);

  // Toggle high contrast mode
  const toggleHighContrast = useCallback(() => setHighContrast((prev) => !prev), []);

  // Handle mouse down for dragging
  const handleMouseDown = (e) => {
    if (e.button !== 0) return; // Only left mouse button
    
    const rect = toolbarRef.current.getBoundingClientRect();
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
    setIsDragging(true);
    
    // Prevent text selection during drag
    e.preventDefault();
  };

  // Handle mouse move for dragging
  const handleMouseMove = useCallback((e) => {
    if (!isDragging) return;
    
    const newX = e.clientX - dragOffset.x;
    const newY = e.clientY - dragOffset.y;
    
    // Get viewport dimensions
    const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
    const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
    
    // Get toolbar dimensions
    const toolbarWidth = toolbarRef.current.offsetWidth;
    const toolbarHeight = toolbarRef.current.offsetHeight;
    
    // Constrain to viewport
    const constrainedX = Math.max(0, Math.min(newX, vw - toolbarWidth));
    const constrainedY = Math.max(0, Math.min(newY, vh - toolbarHeight));
    
    setPosition({
      x: constrainedX,
      y: constrainedY
    });
  }, [isDragging, dragOffset]);

  // Handle mouse up to stop dragging
  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Add/remove event listeners for dragging
  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = 'grabbing';
      document.body.style.userSelect = 'none';
    } else {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };
  }, [isDragging, handleMouseMove, handleMouseUp]);

  return (
    <div
      ref={toolbarRef}
      className={`fixed z-50 shadow-lg transition-all duration-300 ease-in-out ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        touchAction: 'none' // Prevent touch scrolling on mobile
      }}
      onMouseDown={handleMouseDown}
    >
      <div className="bg-gradient-to-r from-blue-700 to-blue-900 text-white p-1.5 rounded-full flex items-center flex-col md:flex-row space-y-1.5 md:space-y-0 md:space-x-2">
        {/* Font Size Controls */}
        <div className="flex space-x-1.5 md:space-x-2">
          <button
            onClick={decreaseFont}
            className="p-1 rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors duration-200"
            title="Decrease font size"
            aria-label="Decrease font size"
          >
            <MinusIcon className="h-5 w-5" />
          </button>
          <button
            onClick={resetFont}
            className="p-1 rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors duration-200"
            title="Reset font size"
            aria-label="Reset font size"
          >
            <ArrowPathIcon className="h-5 w-5" />
          </button>
          <button
            onClick={increaseFont}
            className="p-1 rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors duration-200"
            title="Increase font size"
            aria-label="Increase font size"
          >
            <PlusIcon className="h-5 w-5" />
          </button>
        </div>

        {/* Separator */}
        <div className="w-5 h-px bg-blue-500 rounded-full md:w-px md:h-5 mx-0.5 md:mx-1"></div>

        {/* High Contrast Toggle */}
        <button
          onClick={toggleHighContrast}
          className="p-1 rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors duration-200"
          title={highContrast ? "Disable high contrast" : "Enable high contrast"}
          aria-label={highContrast ? "Disable high contrast mode" : "Enable high contrast mode"}
        >
          {highContrast ? (
            <MoonIcon className="h-5 w-5 text-yellow-300" />
          ) : (
            <SunIcon className="h-5 w-5 text-white" />
          )}
        </button>
      </div>
    </div>
  );
};

export default AccessibilityToolbar;