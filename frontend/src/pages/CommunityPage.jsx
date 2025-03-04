import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import DeleteConfirmationModal from "../components/DeleteConfirmationModal";
import DiscussionForm from "../components/communityDiscussion/DiscussionForm";
import DiscussionThread from "../components/communityDiscussion/DiscussionThread";

function CommunityDiscussion() {
  const [searchQuery, setSearchQuery] = useState("");
  const [limit, setLimit] = useState(8);
  const [threads, setThreads] = useState([]);
  const [newThread, setNewThread] = useState({ title: "", category: "", content: "" });
  const [commentText, setCommentText] = useState("");
  const [commentsLimit, setCommentsLimit] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [editThreadId, setEditThreadId] = useState(null);
  const [editThreadText, setEditThreadText] = useState({ title: "", content: "" });
  const [editCommentId, setEditCommentId] = useState(null);
  const [editCommentText, setEditCommentText] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteThreadId, setDeleteThreadId] = useState(null);
  const [deleteCommentId, setDeleteCommentId] = useState(null);
  const [displayLimit, setDisplayLimit] = useState(5); // New state for display limit

  // Check if the user is logged in
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"))?.currentUser;
    if (user) {
      setIsLoggedIn(true);
    }
  }, []);

  // Fetch discussions from the backend
  useEffect(() => {
    const fetchDiscussions = async () => {
      try {
        const response = await fetch("/api/discussions");
        const data = await response.json();
        const sortedThread = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        const sortedData = sortedThread.map((thread) => ({
          ...thread,
          comments: thread.comments.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)),
        }));
        setThreads(sortedData);
      } catch (error) {
        console.error("Error fetching discussions:", error);
      }
    };

    fetchDiscussions();
  }, []);

  const handleSearch = (e) => setSearchQuery(e.target.value);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewThread({ ...newThread, [name]: value });
  };

  const handleCreateThread = async () => {
    if (!newThread.title || !newThread.category || !newThread.content) {
      setErrorMessage("All fields are required to create a discussion!");
      return;
    }

    try {
      const response = await fetch("/api/discussions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(newThread),
      });
      const data = await response.json();
      setThreads([data, ...threads]);
      setNewThread({ title: "", category: "", content: "" });
      setErrorMessage("");
    } catch (error) {
      console.error("Error creating discussion:", error);
      setErrorMessage("Failed to create discussion.");
    }
  };

  const handleLikeThread = async (id) => {
    try {
      const response = await fetch(`/api/discussions/${id}/like`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await response.json();
      setThreads(threads.map((thread) => (thread._id === id ? data : thread)));
    } catch (error) {
      console.error("Error liking discussion:", error);
    }
  };

  const handleEditThread = async (threadId) => {
    try {
      const response = await fetch(`/api/discussions/${threadId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(editThreadText),
      });
      const data = await response.json();
      setThreads(threads.map((thread) => (thread._id === threadId ? data : thread)));
      setEditThreadId(null);
      setEditThreadText({ title: "", content: "" });
    } catch (error) {
      console.error("Error editing discussion:", error);
    }
  };

  const handleDeleteThread = async () => {
    try {
      await fetch(`/api/discussions/${deleteThreadId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setThreads(threads.filter((thread) => thread._id !== deleteThreadId));
      setShowDeleteModal(false);
    } catch (error) {
      console.error("Error deleting discussion:", error);
    }
  };

  const handleComment = async (threadId) => {
    if (!commentText.trim()) {
      setErrorMessage("Comment cannot be empty!");
      return;
    }

    try {
      const response = await fetch(`/api/discussions/${threadId}/comment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ comment: commentText }),
      });
      const data = await response.json();
      setThreads(threads.map((thread) => (thread._id === threadId ? data : thread)));
      setCommentText("");
      setErrorMessage("");
    } catch (error) {
      console.error("Error adding comment:", error);
      setErrorMessage("Failed to add comment.");
    }
  };

  const handleDeleteComment = async () => {
    try {
      const response = await fetch(`/api/discussions/${deleteThreadId}/comment/${deleteCommentId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await response.json();
      setThreads(threads.map((thread) => (thread._id === deleteThreadId ? data : thread)));
      setShowDeleteModal(false);
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  const handleEditComment = async (threadId, commentId) => {
    try {
      const response = await fetch(`/api/discussions/${threadId}/comment/${commentId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ comment: editCommentText }),
      });
      const data = await response.json();
      setThreads(threads.map((thread) => (thread._id === threadId ? data : thread)));
      setEditCommentId(null);
      setEditCommentText("");
    } catch (error) {
      console.error("Error editing comment:", error);
    }
  };

  const handleLikeComment = async (threadId, commentId) => {
    try {
      const response = await fetch(`/api/discussions/${threadId}/comment/${commentId}/like`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await response.json();
      setThreads(threads.map((thread) => (thread._id === threadId ? data : thread)));
    } catch (error) {
      console.error("Error liking comment:", error);
    }
  };

  const handleShowMore = () => {
    setDisplayLimit((prevLimit) => prevLimit + 5);
  };

  const filteredThreads = threads.filter(
    (thread) =>
      thread.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      thread.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-gray-100 min-h-screen p-6 md:p-12">
      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        showDeleteModal={showDeleteModal}
        setShowDeleteModal={setShowDeleteModal}
        handleDelete={deleteCommentId ? handleDeleteComment : handleDeleteThread}
      />

      {/* Page Header */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-blue-800">Community Discussions</h1>
        <p className="text-lg text-gray-600 mt-4">
          Join the discussion, share experiences, and learn from others in the community.
        </p>
      </div>

      {/* Search Bar */}
      <div className="mb-10 flex justify-center">
        <input
          type="text"
          placeholder="Search discussions..."
          value={searchQuery}
          onChange={handleSearch}
          className="w-full max-w-xl p-3 border rounded-lg shadow-sm focus:ring focus:ring-blue-300"
        />
        <button className="bg-blue-500 text-white p-3 rounded-lg shadow-md ml-2 hover:bg-blue-600">
          <FaSearch />
        </button>
      </div>

      {/* Create Discussion */}
      {isLoggedIn && (
        <DiscussionForm
          newThread={newThread}
          handleInputChange={handleInputChange}
          handleCreateThread={handleCreateThread}
          errorMessage={errorMessage}
        />
      )}

      {/* Discussion Threads */}
      {filteredThreads.slice(0, displayLimit).map((thread) => (
        <DiscussionThread
          key={thread._id}
          thread={thread}
          isLoggedIn={isLoggedIn}
          editThreadId={editThreadId}
          editThreadText={editThreadText}
          setEditThreadId={setEditThreadId}
          setEditThreadText={setEditThreadText}
          setDeleteThreadId={setDeleteThreadId}
          handleLikeThread={handleLikeThread}
          handleEditThread={handleEditThread}
          handleDeleteThread={setDeleteThreadId}
          handleComment={handleComment}
          commentText={commentText}
          setCommentText={setCommentText}
          commentsLimit={commentsLimit}
          setCommentsLimit={setCommentsLimit}
          editCommentId={editCommentId}
          editCommentText={editCommentText}
          setEditCommentId={setEditCommentId}
          setEditCommentText={setEditCommentText}
          setDeleteCommentId={setDeleteCommentId}
          handleLikeComment={handleLikeComment}
          handleEditComment={handleEditComment}
          handleDeleteComment={setDeleteCommentId}
          setShowDeleteModal={setShowDeleteModal}
        />
      ))}

      {/* Show More / Show Less Buttons */}
      <div className="flex justify-center mt-6">
        {displayLimit < filteredThreads.length && (
          <button
            onClick={handleShowMore}
            className="bg-blue-500 text-white p-3 rounded-lg shadow-md hover:bg-blue-600 mr-2"
          >
            Show More
          </button>
        )}
        {displayLimit > 5 && (
          <button
            onClick={() => setDisplayLimit(5)}
            className="bg-blue-500 text-white p-3 rounded-lg shadow-md hover:bg-blue-600"
          >
            Show Less
          </button>
        )}
      </div>
    </div>
  );
}

export default CommunityDiscussion;