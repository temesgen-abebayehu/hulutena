import React from "react";
import { FaArrowLeft, FaBackward } from "react-icons/fa";

function WrittenPost() {
  return (
    <div className="p-8 md:p-16 bg-white shadow-lg rounded-lg">
      <h1 className="text-4xl font-bold mb-2">Post Title 1</h1>
      <p className="text-gray-700 font-medium">Overview of the first post.</p>
      <button 
        className="bg-blue-500 text-white p-3 rounded-lg shadow-md mt-4"
        onClick={() => window.history.back()}
      >
        <FaArrowLeft />
      </button>
    </div>
  );
}

export default WrittenPost;
