import React, { useState } from "react";
import { FaThumbsUp, FaThumbsDown, FaComment, FaEdit, FaTrash, FaSave, FaTimes, FaInfoCircle } from "react-icons/fa";

const WrittenResource = ({ resource, handleLike, handleDislike, handleDeleteResource, handleEditResource, isAdmin, isLoggedIn }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedResource, setEditedResource] = useState({ ...resource });
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showSaveModal, setShowSaveModal] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);

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

    return (
        <div className="flex flex-col items-start p-6 bg-white shadow-lg rounded-lg">
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
                        placeholder="Title"
                    />
                    <textarea
                        name="description"
                        value={editedResource.description}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded-lg mb-2"
                        placeholder="Description"
                    />
                </div>
            ) : (
                // View Mode
                <>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">{resource.title}</h3>
                    <p className="text-gray-600 mb-4">
                        {isExpanded ? resource.description : resource.description.substring(0, 200)}
                        {resource.description.length > 200 && (
                            <button
                                onClick={() => setIsExpanded(!isExpanded)}
                                className="text-blue-600 hover:underline hover:text-blue-800 ml-2"
                            >
                                {isExpanded ? "See less" : "See more"}
                            </button>
                        )}
                    </p>

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
                                onClick={() => (window.location.href = `/resources/${resource._id}`)}
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
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <div className="flex items-center mb-4">
                            <FaInfoCircle className="text-blue-500 mr-2" size={24} />
                            <p className="text-lg">Are you sure you want to delete this resource?</p>
                        </div>
                        <div className="flex justify-end gap-4">
                            <button
                                onClick={() => {
                                    handleDeleteResource(resource._id);
                                    setShowDeleteModal(false);
                                }}
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
            )}

            {/* Save Confirmation Modal */}
            {showSaveModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <div className="flex items-center mb-4">
                            <FaInfoCircle className="text-blue-500 mr-2" size={24} />
                            <p className="text-lg">Are you sure you want to save changes?</p>
                        </div>
                        <div className="flex justify-end gap-4">
                            <button
                                onClick={handleSave}
                                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
                            >
                                Yes
                            </button>
                            <button
                                onClick={() => setShowSaveModal(false)}
                                className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition duration-300"
                            >
                                No
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default WrittenResource;