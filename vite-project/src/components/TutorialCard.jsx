// src/components/TutorialCard.jsx
import React from 'react';

const TutorialCard = ({ title, image, description }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-4 w-full sm:w-[300px]">
      <img src={image} alt={title} className="w-full h-40 object-cover rounded-md mb-3" />
      <h3 className="text-xl font-semibold text-blue-700 mb-2">{title}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  );
};

export default TutorialCard;
