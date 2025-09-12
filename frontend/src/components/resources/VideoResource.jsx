import React, { useState } from "react";
import {
  FaThumbsUp,
  FaThumbsDown,
  FaComment,
  FaEdit,
  FaTrash,
  FaSave,
  FaTimes,
  FaInfoCircle,
} from "react-icons/fa";
import SaveConfirmationModal from "../SaveConfirmationModal";
import DeleteConfirmationModal from "../DeleteConfirmationModal";
import { useLanguage } from "../../context/LanguageContext";

const VideoResource = ({
  resource,
  handleLike,
  handleDislike,
  handleDeleteResource,
  handleEditResource,
  isAdmin,
  isLoggedIn,
}) => {
  const { t } = useLanguage();
  const [isEditing, setIsEditing] = useState(false);
  const [editedResource, setEditedResource] = useState({ ...resource });
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false);

  // Handle input changes in edit mode
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedResource((prev) => ({ ...prev, [name]: value }));
  };

  // Save changes
  const handleSave = () => {
    handleEditResource(resource._id, editedResource);
    setIsEditing(false);
    setShowSaveModal(false);
  };

  // Cancel edit mode
  const handleCancel = () => {
    setEditedResource({ ...resource });
    setIsEditing(false);
  };

  // Confirm delete
  const confirmDelete = () => {
    handleDeleteResource(resource._id);
    setShowDeleteModal(false);
  };

  return (
    <div className="flex flex-col items-center p-6 bg-white shadow-lg rounded-lg">
      {/* Admin Controls */}
      {isAdmin && (
        <div className="flex gap-2 mb-4">
          {isEditing ? (
            <div className="flex justify-center gap-64 md:gap-60 lg:gap-40">
              <button
                onClick={() => setShowSaveModal(true)}
                className="text-green-500 hover:text-green-700"
              >
                <FaSave />
              </button>
              <button
                onClick={handleCancel}
                className="text-red-500 hover:text-red-700"
              >
                <FaTimes />
              </button>
            </div>
          ) : (
            <div className="flex justify-center gap-64 md:gap-60 lg:gap-40">
              <button
                onClick={() => setIsEditing(true)}
                className="text-blue-500 hover:text-blue-700"
              >
                <FaEdit />
              </button>
              <button
                onClick={() => setShowDeleteModal(true)}
                className="text-red-500 hover:text-red-700"
              >
                <FaTrash />
              </button>
            </div>
          )}
        </div>
      )}

      {isEditing ? (
        // Edit Mode
        <div className="w-full">
          <input
            type="text"
            name="title"
            value={editedResource.title}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-lg mb-2"
            placeholder={t.titleLabel}
          />
          <input
            type="text"
            name="src"
            value={editedResource.src}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-lg mb-2"
            placeholder={t.sourceUrlLabel}
          />
          <textarea
            name="description"
            value={editedResource.description}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-lg mb-2"
            placeholder={t.descriptionLabel}
          />
        </div>
      ) : (
        // View Mode
        <>
          <iframe
            width="100%"
            height="200"
            src={resource.src}
            title={resource.title}
            className="rounded-lg shadow-lg"
            style={{ border: 0 }}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>

          {/* Like, Dislike, and Comment Buttons */}
          {isLoggedIn && (
            <div className="flex gap-4 mt-4">
              <button
                onClick={() => handleLike(resource._id)}
                className="flex items-center gap-2 text-blue-500"
              >
                <FaThumbsUp /> {resource.likes?.length || 0}
              </button>
              <button
                onClick={() => handleDislike(resource._id)}
                className="flex items-center gap-2 text-red-500"
              >
                <FaThumbsDown /> {resource.dislikes?.length || 0}
              </button>
              <button
                onClick={() =>
                  (window.location.href = `/resources/${resource._id}`)
                }
                className="flex items-center gap-2 text-green-500"
              >
                <FaComment /> {resource.comments?.length || 0}
              </button>
            </div>
          )}
        </>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <DeleteConfirmationModal
          onConfirm={confirmDelete}
          onClose={() => setShowDeleteModal(false)}
          isOpen={showDeleteModal}
          message={t.confirmDeleteResourceGeneric}
        />
      )}

      {/* Save Confirmation Modal */}
      {showSaveModal && (
        <SaveConfirmationModal
          onConfirm={handleSave}
          onClose={() => setShowSaveModal(false)}
          isOpen={showSaveModal}
          message={t.confirmSaveChanges}
        />
      )}
    </div>
  );
};

export default VideoResource;
