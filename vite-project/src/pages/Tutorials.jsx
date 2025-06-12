// src/pages/Tutorials.jsx
import React from 'react';
import TutorialCard from '../components/TutorialCard';

const Tutorials = () => {
  const tutorials = [
    {
      title: 'WhatsApp',
      image: 'https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg',
      description: 'Learn how to send messages, make calls, and share photos with friends and family.',
      link: '/tutorials/whatsapp',
      level: 'Beginner',
      tags: ['Messaging', 'Communication', 'Calls'],
    },
    {
      title: 'Paytm',
      image: 'https://upload.wikimedia.org/wikipedia/commons/8/8a/Paytm_Logo_IPL.png',
      description: 'Understand how to pay bills, transfer money, and perform online recharges safely.',
      link: '/tutorials/paytm',
      level: 'Intermediate',
      tags: ['Payments', 'Wallet', 'Finance'],
    },
    {
      title: 'Google Maps',
      image: 'https://upload.wikimedia.org/wikipedia/commons/a/aa/Google_Maps_icon_%282020%29.svg',
      description: 'Explore how to find directions, discover nearby places, and navigate with ease.',
      link: '/tutorials/google-maps',
      level: 'Beginner',
      tags: ['Navigation', 'Travel', 'Location'],
    },
    {
      title: 'Google Search',
      image: 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png',
      description: 'Master the basics of finding information, news, and answers to your questions online.',
      link: '/tutorials/google-search',
      level: 'Beginner',
      tags: ['Information', 'Web', 'Research'],
    },
    {
      title: 'Gmail',
      image: 'https://upload.wikimedia.org/wikipedia/commons/7/7e/Gmail_icon_%282020%29.svg',
      description: 'Learn to send and receive emails, manage your inbox, and stay connected digitally.',
      link: '/tutorials/gmail',
      level: 'Intermediate',
      tags: ['Email', 'Communication', 'Productivity'],
    },
    {
      title: 'YouTube',
      image: 'https://upload.wikimedia.org/wikipedia/commons/7/75/YouTube_social_white_squircle_%282017%29.svg',
      description: 'Discover how to watch videos, subscribe to channels, and enjoy entertainment online.',
      link: '/tutorials/youtube',
      level: 'Beginner',
      tags: ['Video', 'Entertainment', 'Learning'],
    },
  ];

  return (
    <div className="bg-gradient-to-br from-gray-50 to-blue-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-extrabold text-center text-blue-800 mb-4 tracking-tight">
          Our Digital Tutorials
        </h2>
        <p className="text-xl text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Find easy-to-follow guides on essential digital tools to help you navigate the online world with confidence.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {tutorials.map((tool, index) => (
            <TutorialCard 
              key={index}
              title={tool.title}
              image={tool.image}
              description={tool.description}
              link={tool.link}
              level={tool.level}
              tags={tool.tags}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Tutorials;