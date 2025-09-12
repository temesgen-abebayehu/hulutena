import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import moment from "moment";
import {
  FaArrowLeft,
  FaThumbsUp,
  FaThumbsDown,
  FaComment,
  FaTrash,
} from "react-icons/fa";
import { useLanguage } from "../context/LanguageContext";

function SingleResource() {
  const { id } = useParams();
  const [resource, setResource] = useState(null);
  const [newComment, setNewComment] = useState("");
  const userData = JSON.parse(localStorage.getItem("user")).currentUser;
  const userId = userData._id;
  const userName = userData.fullName;
  const { t } = useLanguage();

  // Fetch resource from the backend
  useEffect(() => {
    const fetchResource = async () => {
      try {
        const response = await fetch(`/api/resources/${id}`);
        if (!response.ok) throw new Error("Failed to fetch resource.");
        const data = await response.json();
        setResource(data);
      } catch (error) {
        console.error("Error fetching resource:", error);
      }
    };

    fetchResource();
  }, [id]);

  // Handle like
  const handleLike = async () => {
    try {
      const response = await fetch(`/api/resources/${id}/like`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (!response.ok) throw new Error("Failed to like resource.");
      const data = await response.json();
      setResource(data);
    } catch (error) {
      console.error("Error liking resource:", error);
    }
  };

  // Handle dislike
  const handleDislike = async () => {
    try {
      const response = await fetch(`/api/resources/${id}/dislike`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (!response.ok) throw new Error("Failed to dislike resource.");
      const data = await response.json();
      setResource(data);
    } catch (error) {
      console.error("Error disliking resource:", error);
    }
  };

  // Handle adding a comment
  const handleAddComment = async () => {
    if (newComment.trim() === "") return;

    try {
      const response = await fetch(`/api/resources/${id}/comment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ text: newComment, user: userId, userName }),
      });
      if (!response.ok) throw new Error("Failed to add comment.");
      const data = await response.json();

      data.comments.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setResource(data);
      setNewComment("");
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  // Handle deleting a comment
  const handleDeleteComment = async (commentId) => {
    try {
      const response = await fetch(
        `/api/resources/${id}/comment/${commentId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (!response.ok) throw new Error("Failed to delete comment.");
      const data = await response.json();
      setResource(data);
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  if (!resource) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <Link to="/resources" className="flex items-center text-blue-500 mb-4">
        <FaArrowLeft className="mr-2" />
        {t.backToResources}
      </Link>
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-3xl font-bold mb-2">{resource.title}</h1>
        <p className="text-gray-500 mb-4">
          {t.resourceType}: {resource.type}
        </p>
        <p className="mb-4">{resource.description}</p>

        {/* Like, Dislike, and Comment Buttons */}
        <div className="flex gap-4 mt-4">
          <button
            onClick={handleLike}
            className="flex items-center gap-2 text-blue-500"
          >
            <FaThumbsUp /> {resource.likes.length}
          </button>
          <button
            onClick={handleDislike}
            className="flex items-center gap-2 text-red-500"
          >
            <FaThumbsDown /> {resource.dislikes.length}
          </button>
          <button className="flex items-center gap-2 text-green-500">
            <FaComment /> {resource.comments.length}
          </button>
        </div>
      </div>

      {/* Comments Section */}
      <div className="mt-8">
        {/* Add Comment Section */}
        <div className="mt-6">
          <textarea
            placeholder="Add a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="w-full p-2 border rounded-lg"
          />
          <button
            onClick={handleAddComment}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-2"
          >
            Add Comment
          </button>
        </div>

        {/* Comments */}
        {resource.comments.length > 0 ? (
          <div className="mt-6">
            <h2 className="text-xl font-semibold">Comments</h2>
            {resource.comments.map((comment) => (
              <div
                key={comment._id}
                className="mt-4 p-4 bg-gray-100 rounded-lg space-y-4"
              >
                <div className="flex justify-between items-center">
                  <p className="text-gray-500 text-sm mt-2">
                    By:{" "}
                    <span className="font-bold">{comment.userName}</span>
                    {" | "} {moment(comment.createdAt).fromNow()}
                  </p>
                  {comment.user === userId && (
                    <button
                      onClick={() => handleDeleteComment(comment._id)}
                      className="text-red-500 mt-2 flex items-center gap-2"
                    >
                      <FaTrash /> Delete
                    </button>
                  )}
                </div>
                <p className="text-gray-800 pl-4">{comment.text}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600 mt-4">No comments yet.</p>
        )}
      </div>
    </div>
  );
}

export default SingleResource;
