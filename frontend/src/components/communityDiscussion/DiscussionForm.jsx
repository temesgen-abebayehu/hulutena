import React from "react";
import { FaPaperPlane } from "react-icons/fa";
import { useLanguage } from "../../context/LanguageContext";

const DiscussionForm = ({ newThread, handleInputChange, handleCreateThread, errorMessage }) => {
  const { t } = useLanguage();

  return (
    <div className="bg-white p-6 shadow-lg rounded-lg mb-12">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">{t.startDiscussion}</h2>
      <input
        type="text"
        name="title"
        value={newThread.title}
        onChange={handleInputChange}
        placeholder={t.discussionTitle}
        className="w-full mb-4 p-3 border rounded-lg shadow-sm focus:ring focus:ring-blue-300"
      />
      <select
        name="category"
        value={newThread.category}
        onChange={handleInputChange}
        className="w-full mb-4 p-3 border rounded-lg shadow-sm focus:ring focus:ring-blue-300"
      >
        <option value="">{t.selectCategory}</option>
        <option value="general">{t.general}</option>
        <option value="mental health">{t.mentalHealth}</option>
        <option value="nutrition">{t.nutrition}</option>
        <option value="physical health">{t.physicalHealth}</option>
        <option value="wellness tips">{t.wellnessTips}</option>
        <option value="pharmacy">{t.pharmacy}</option>
        <option value="patient">{t.patient}</option>
        <option value="doctor">{t.doctor}</option>
        <option value="fitness">{t.fitness}</option>
        <option value="lifestyle">{t.lifestyle}</option>
        <option value="other">{t.other}</option>
      </select>
      <textarea
        name="content"
        value={newThread.content}
        onChange={handleInputChange}
        placeholder={t.shareThoughts}
        rows="4"
        className="w-full mb-4 p-3 border rounded-lg shadow-sm focus:ring focus:ring-blue-300"
      />
      <button
        onClick={handleCreateThread}
        className="bg-blue-600 text-white py-2 px-6 rounded-lg shadow-md hover:bg-blue-700 flex items-center"
      >
        <FaPaperPlane className="mr-2" /> {t.createDiscussion}
      </button>
      {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}
    </div>
  );
};

export default DiscussionForm;