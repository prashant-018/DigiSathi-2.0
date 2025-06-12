import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const VoiceCommand = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = 'en-IN';
    recognition.continuous = true;

    recognition.onresult = (event) => {
      const transcript = event.results[event.results.length - 1][0].transcript.toLowerCase();
      console.log('Heard:', transcript);

      if (transcript.includes('home')) navigate('/');
      else if (transcript.includes('tutorial')) navigate('/tutorials');
      else if (transcript.includes('chat') || transcript.includes('buddy')) navigate('/chatbot');
      else if (transcript.includes('feedback')) navigate('/feedback');
    };

    recognition.start();
    return () => recognition.stop();
  }, [navigate]);

  return null;
};

export default VoiceCommand;
