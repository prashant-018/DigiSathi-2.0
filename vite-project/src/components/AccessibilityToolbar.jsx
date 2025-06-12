import React, { useEffect, useState, useCallback, useRef } from 'react';
import {
  MinusIcon,
  PlusIcon,
  ArrowPathIcon,
  SunIcon,
  MoonIcon,
} from '@heroicons/react/24/outline';

const AccessibilityToolbar = () => {
  const [fontSize, setFontSize] = useState(() => {
    const savedFontSize = localStorage.getItem('digisathi-fontSize');
    return savedFontSize ? parseInt(savedFontSize, 10) : 16;
  });

  const [highContrast, setHighContrast] = useState(() => {
    const savedContrast = localStorage.getItem('digisathi-highContrast');
    return savedContrast === 'true';
  });

  const [position, setPosition] = useState(() => {
    const savedPosition = localStorage.getItem('digisathi-toolbarPosition');
    return savedPosition ? JSON.parse(savedPosition) : { x: 20, y: 20 };
  });

  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const toolbarRef = useRef(null);

  useEffect(() => {
    document.documentElement.style.fontSize = `${fontSize}px`;
    localStorage.setItem('digisathi-fontSize', fontSize.toString());
  }, [fontSize]);

  useEffect(() => {
    if (highContrast) {
      document.body.classList.add('high-contrast-mode');
    } else {
      document.body.classList.remove('high-contrast-mode');
    }
    localStorage.setItem('digisathi-highContrast', highContrast.toString());
  }, [highContrast]);

  useEffect(() => {
    localStorage.setItem('digisathi-toolbarPosition', JSON.stringify(position));
  }, [position]);

  const increaseFont = useCallback(() => setFontSize((prev) => Math.min(prev + 2, 22)), []);
  const decreaseFont = useCallback(() => setFontSize((prev) => Math.max(prev - 2, 14)), []);
  const resetFont = useCallback(() => setFontSize(16), []);
  const toggleHighContrast = useCallback(() => setHighContrast((prev) => !prev), []);

  const handleMouseDown = (e) => {
    if (e.button !== 0) return;
    const rect = toolbarRef.current.getBoundingClientRect();
    setDragOffset({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    setIsDragging(true);
    e.preventDefault();
  };

  const handleTouchStart = (e) => {
    const touch = e.touches[0];
    const rect = toolbarRef.current.getBoundingClientRect();
    setDragOffset({ x: touch.clientX - rect.left, y: touch.clientY - rect.top });
    setIsDragging(true);
  };

  const handleMouseMove = useCallback((e) => {
    if (!isDragging) return;
    moveToolbar(e.clientX, e.clientY);
  }, [isDragging, dragOffset]);

  const handleTouchMove = useCallback((e) => {
    if (!isDragging) return;
    const touch = e.touches[0];
    moveToolbar(touch.clientX, touch.clientY);
  }, [isDragging, dragOffset]);

  const moveToolbar = (clientX, clientY) => {
    const newX = clientX - dragOffset.x;
    const newY = clientY - dragOffset.y;

    const vw = window.innerWidth;
    const vh = window.innerHeight;

    const toolbarWidth = toolbarRef.current.offsetWidth;
    const toolbarHeight = toolbarRef.current.offsetHeight;

    const constrainedX = Math.max(0, Math.min(newX, vw - toolbarWidth));
    const constrainedY = Math.max(0, Math.min(newY, vh - toolbarHeight));

    setPosition({ x: constrainedX, y: constrainedY });
  };

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchmove', handleTouchMove, { passive: false });
      window.addEventListener('touchend', handleTouchEnd);
      document.body.style.userSelect = 'none';
    } else {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      document.body.style.userSelect = '';
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      document.body.style.userSelect = '';
    };
  }, [isDragging, handleMouseMove, handleMouseUp, handleTouchMove, handleTouchEnd]);

  return (
    <div
      ref={toolbarRef}
      className={`fixed z-50 shadow-lg transition-all duration-300 ease-in-out ${
        isDragging ? 'cursor-grabbing' : 'cursor-grab'
      }`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        touchAction: 'none'
      }}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
    >
      <div className="bg-gradient-to-r from-blue-700 to-blue-900 text-white p-1.5 rounded-full flex items-center flex-col md:flex-row space-y-1.5 md:space-y-0 md:space-x-2">
        <div className="flex space-x-1.5 md:space-x-2">
          <button onClick={decreaseFont} className="p-1 rounded-full hover:bg-blue-600 focus:ring-2">
            <MinusIcon className="h-5 w-5" />
          </button>
          <button onClick={resetFont} className="p-1 rounded-full hover:bg-blue-600 focus:ring-2">
            <ArrowPathIcon className="h-5 w-5" />
          </button>
          <button onClick={increaseFont} className="p-1 rounded-full hover:bg-blue-600 focus:ring-2">
            <PlusIcon className="h-5 w-5" />
          </button>
        </div>
        <div className="w-5 h-px bg-blue-500 md:w-px md:h-5 mx-0.5 md:mx-1"></div>
        <button
          onClick={toggleHighContrast}
          className="p-1 rounded-full hover:bg-blue-600 focus:ring-2"
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
