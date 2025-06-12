// src/pages/Feedback.jsx
import React, { useState } from 'react';
import { StarIcon } from '@heroicons/react/20/solid'; // For star ratings

const Feedback = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '', rating: 0 }); // Added email, changed rating to 0 initial
  const [submitted, setSubmitted] = useState(false); // State to show success message

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRatingChange = (newRating) => {
    setForm({ ...form, rating: newRating });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Simulate API call
    console.log('Submitting feedback:', form);
    try {
      // In a real application, you would send this 'form' data to your backend:
      // const response = await fetch('/api/feedback', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(form),
      // });
      // if (!response.ok) {
      //   throw new Error('Failed to submit feedback');
      // }
      // const result = await response.json();
      // console.log('Feedback submitted successfully:', result);

      setSubmitted(true); // Show success message
      setForm({ name: '', email: '', message: '', rating: 0 }); // Reset form
      setTimeout(() => setSubmitted(false), 5000); // Hide message after 5 seconds
    } catch (error) {
      console.error('Error submitting feedback:', error);
      alert('There was an error submitting your feedback. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white p-8 sm:p-10 rounded-xl shadow-2xl w-full max-w-lg border border-blue-200 animate-fade-in-up">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-blue-800 mb-6 text-center">
          Share Your Feedback
        </h2>
        <p className="text-center text-gray-600 mb-8 text-lg">
          We'd love to hear about your experience with DigiSathi! Your input helps us improve.
        </p>

        {submitted && (
          <div
            className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-6"
            role="alert"
          >
            <strong className="font-bold">Success!</strong>
            <span className="block sm:inline ml-2">Thank you for your valuable feedback!</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-gray-700 text-sm font-semibold mb-2">
              Your Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition duration-200"
              placeholder="e.g., Ramesh Kumar"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-gray-700 text-sm font-semibold mb-2">
              Email (Optional)
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition duration-200"
              placeholder="e.g., your.email@example.com"
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-gray-700 text-sm font-semibold mb-2">
              Your Message
            </label>
            <textarea
              id="message"
              name="message"
              value={form.message}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition duration-200 resize-y"
              rows="5"
              placeholder="Tell us what you think..."
              required
            ></textarea>
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-2">
              Overall Rating
            </label>
            <div className="flex items-center space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <StarIcon
                  key={star}
                  className={`h-8 w-8 cursor-pointer transition-colors duration-200 ${
                    form.rating >= star ? 'text-yellow-400' : 'text-gray-300'
                  }`}
                  onClick={() => handleRatingChange(star)}
                />
              ))}
              {form.rating > 0 && <span className="ml-2 text-gray-600">({form.rating} out of 5)</span>}
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-bold py-3 px-6 rounded-lg shadow-md
                       hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105
                       focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Submit Feedback
          </button>
        </form>
      </div>
    </div>
  );
};

export default Feedback;