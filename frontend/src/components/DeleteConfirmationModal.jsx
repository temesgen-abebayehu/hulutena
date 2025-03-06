import React from "react";
import { FaInfoCircle } from "react-icons/fa";

const DeleteConfirmationModal = ({  setShowDeleteModal, handleDelete, message }) => {
  return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <div className="flex items-center mb-4">
            <FaInfoCircle className="text-blue-500 mr-2" size={24} />
            <p className="text-lg">{message ? message : 'Are you sure you want to delete this?'}</p>
          </div>
          <div className="flex justify-end gap-4">
            <button
              onClick={handleDelete}
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-300"
            >
              Yes
            </button>
            <button
              onClick={() => setShowDeleteModal(false)}
              className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition duration-300"
            >
              No
            </button>
          </div>
        </div>
      </div>
  );
};

export default DeleteConfirmationModal;