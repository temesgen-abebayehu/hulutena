import React from "react";
import { FaBeer, FaPaperclip, FaPaperPlane, FaPlane } from "react-icons/fa";

const DiscussionForm = ({ newThread, handleInputChange, handleCreateThread, errorMessage }) => {
  return (
    <div className="bg-white p-6 shadow-lg rounded-lg mb-12">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Start a Discussion</h2>
      <input
        type="text"
        name="title"
        value={newThread.title}
        onChange={handleInputChange}
        placeholder="Discussion Title"
        className="w-full mb-4 p-3 border rounded-lg shadow-sm focus:ring focus:ring-blue-300"
      />
      <select
        name="category"
        value={newThread.category}
        onChange={handleInputChange}
        className="w-full mb-4 p-3 border rounded-lg shadow-sm focus:ring focus:ring-blue-300"
      >
        <option value="">Select a Category</option>
        <option value="general">General</option>
        <option value="mental health">Mental Health</option>
        <option value="nutrition">Nutrition</option>
        <option value="physical health">Physical Health</option>
        <option value="wellness tips">Wellness Tips</option>
        <option value="pharmacy">Pharmacy</option>
        <option value="patient">Patient</option>
        <option value="doctor">Doctor</option>
        <option value="fitness">Fitness</option>
        <option value="lifestyle">Lifestyle</option>
        <option value="other">Other</option>
      </select>
      <textarea
        name="content"
        value={newThread.content}
        onChange={handleInputChange}
        placeholder="Share your thoughts or ask a question..."
        rows="4"
        className="w-full mb-4 p-3 border rounded-lg shadow-sm focus:ring focus:ring-blue-300"
      />
      <button
        onClick={handleCreateThread}
        className="bg-blue-600 text-white py-2 px-6 rounded-lg shadow-md hover:bg-blue-700"
      >
        <FaPaperPlane size={24} />
      </button>
      {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}
    </div>
  );
};

export default DiscussionForm;