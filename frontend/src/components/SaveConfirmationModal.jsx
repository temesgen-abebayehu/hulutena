import React from "react";
import { FaQuestionCircle } from "react-icons/fa";
import { useLanguage } from "../context/LanguageContext";

function SaveConfirmationModal({ isOpen, onClose, onConfirm, message, confirmText, cancelText }) {
  const { t } = useLanguage();

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md mx-4">
        <div className="flex items-center mb-4">
          <FaQuestionCircle className="text-blue-500 mr-3" size={24} />
          <p className="text-lg">{message || t.confirmSaveChanges}</p>
        </div>
        <div className="flex justify-end gap-4">
          <button
            onClick={onConfirm}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
          >
            {confirmText || t.yesSaveChanges}
          </button>
          <button
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition duration-300"
          >
            {cancelText || t.noCancel}
          </button>
        </div>
      </div>
    </div>
  );
}

export default SaveConfirmationModal;
