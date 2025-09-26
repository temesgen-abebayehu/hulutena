import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import DeleteConfirmationModal from "../components/DeleteConfirmationModal";
import DiscussionForm from "../components/communityDiscussion/DiscussionForm";
import DiscussionThread from "../components/communityDiscussion/DiscussionThread";
import { useLanguage } from "../context/LanguageContext";

function CommunityDiscussion() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [threads, setThreads] = useState([]);
  const [newThread, setNewThread] = useState({ title: "", category: "", content: "" });
  const [commentText, setCommentText] = useState("");
  const [commentsLimit, setCommentsLimit] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [editThreadId, setEditThreadId] = useState(null);
  const [editThreadText, setEditThreadText] = useState({ title: "", content: "" });
  const [editCommentId, setEditCommentId] = useState(null);
  const [editCommentText, setEditCommentText] = useState("");
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteThreadId, setDeleteThreadId] = useState(null);
  const [deleteCommentId, setDeleteCommentId] = useState(null);
  const [displayLimit, setDisplayLimit] = useState(5);

  // Check if the user is logged in
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"))?.currentUser;
    if (user) {
      setLoggedInUser(user._id);
    }
  }, []);

  // Fetch discussions from the backend
  useEffect(() => {
    const fetchDiscussions = async () => {
      try {
        const response = await fetch("/api/discussions", { credentials: "include" });
        const data = await response.json();
        if (!response.ok) {
          throw new Error(t.failedToFetchDiscussions);
        }

        // Sort threads and comments
        const sortedThreads = sortThreadsAndComments(data);
        setThreads(sortedThreads);
      } catch (error) {
        console.error("Error fetching discussions:", error);
      }
    };

    fetchDiscussions();
  }, [t]);

  // Helper function to sort threads and comments
  const sortThreadsAndComments = (threads) => {
    return threads
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .map((thread) => ({
        ...thread,
        comments: thread.comments.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)),
      }));
  };

  // Update threads with sorting logic after any state change
  const updateThreads = (updatedThreads) => {
    const sortedThreads = sortThreadsAndComments(updatedThreads);
    setThreads(sortedThreads);
  };

  const handleSearch = (e) => setSearchQuery(e.target.value);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewThread({ ...newThread, [name]: value });
  };

  const handleCreateThread = async () => {
    if (!newThread.title || !newThread.category || !newThread.content) {
      setErrorMessage(t.allFieldsRequired);
      return;
    }

    try {
      const response = await fetch("/api/discussions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(newThread),
      });
      if (!response.ok) {
        throw new Error(t.failedToCreateDiscussion);
      }

      const data = await response.json();
      updateThreads([data, ...threads]);
      setNewThread({ title: "", category: "", content: "" });
      setErrorMessage("");
    } catch (error) {
      console.error("Error creating discussion:", error);
      setErrorMessage(t.failedToCreateDiscussion);
    }
  };

  const handleLikeThread = async (id) => {
    try {
      const response = await fetch(`/api/discussions/${id}/like`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error(t.failedToLikeDiscussion);
      }
      const data = await response.json();
      const updatedThreads = threads.map((thread) => (thread._id === id ? data : thread));
      updateThreads(updatedThreads);
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
        },
        credentials: "include",
        body: JSON.stringify(editThreadText),
      });
      if (!response.ok) {
        throw new Error(t.failedToEditDiscussion);
      }
      const data = await response.json();
      const updatedThreads = threads.map((thread) => (thread._id === threadId ? data : thread));
      updateThreads(updatedThreads);
      setEditThreadId(null);
      setEditThreadText({ title: "", content: "" });
    } catch (error) {
      console.error("Error editing discussion:", error);
    }
  };

  const handleDeleteThread = async () => {
    try {
      const response = await fetch(`/api/discussions/${deleteThreadId}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error(t.failedToDeleteDiscussion);
      }
      const updatedThreads = threads.filter((thread) => thread._id !== deleteThreadId);
      updateThreads(updatedThreads);
      setShowDeleteModal(false);
      setDeleteThreadId(null);
      setDeleteCommentId(null);
    } catch (error) {
      console.error("Error deleting discussion:", error);
    }
  };

  const handleComment = async (threadId) => {
    if (!commentText.trim()) {
      setErrorMessage(t.commentCannotBeEmpty);
      return;
    }

    try {
      const response = await fetch(`/api/discussions/${threadId}/comment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ comment: commentText }),
      });
      if (!response.ok) {
        throw new Error(t.failedToAddComment);
      }
      const data = await response.json();
      const updatedThreads = threads.map((thread) => (thread._id === threadId ? data : thread));
      updateThreads(updatedThreads);
      setCommentText("");
      setErrorMessage("");
    } catch (error) {
      console.error("Error adding comment:", error);
      setErrorMessage(t.failedToAddComment);
    }
  };

  const handleDeleteComment = async () => {
    try {
      const response = await fetch(`/api/discussions/${deleteThreadId}/comment/${deleteCommentId}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error(t.failedToDeleteComment);
      }

      const updatedThreads = threads.map((thread) => {
        if (thread._id === deleteThreadId) {
          return {
            ...thread,
            comments: thread.comments.filter((comment) => comment._id !== deleteCommentId),
          };
        }
        return thread;
      });
      updateThreads(updatedThreads);
      setShowDeleteModal(false);
      setDeleteThreadId(null);
      setDeleteCommentId(null);
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
        },
        credentials: "include",
        body: JSON.stringify({ comment: editCommentText }),
      });
      if (!response.ok) {
        throw new Error(t.failedToEditComment);
      }

      const data = await response.json();
      const updatedThreads = threads.map((thread) => (thread._id === threadId ? data : thread));
      updateThreads(updatedThreads);
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
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error(t.failedToLikeComment);
      }

      const data = await response.json();
      const updatedThreads = threads.map((thread) => (thread._id === threadId ? data : thread));
      updateThreads(updatedThreads);
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
    <div className="min-h-screen bg-gray-50">
      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={deleteCommentId ? handleDeleteComment : handleDeleteThread}
        message={deleteCommentId ? t.confirmDeleteComment : t.confirmDeleteDiscussion}
      />

      {/* Hero */}
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-700 via-sky-600 to-cyan-500" />
        <div className="relative max-w-7xl mx-auto px-6 py-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white">{t.communityTitle}</h1>
          <p className="mt-4 text-lg md:text-xl text-white/90">{t.communityDescription}</p>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 pb-12">
        {/* Search Bar Card */}
        <div className="bg-white rounded-2xl shadow-lg p-5">
          <div className="relative max-w-2xl mx-auto">
            <input
              type="text"
              aria-label={t.searchDiscussions}
              placeholder={t.searchDiscussions}
              value={searchQuery}
              onChange={handleSearch}
              className="w-full p-4 rounded-full bg-white border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
            />
            <FaSearch className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>
        </div>

        {/* Create Discussion: gated by login */}
        <DiscussionForm
          newThread={newThread}
          handleInputChange={handleInputChange}
          handleCreateThread={handleCreateThread}
          errorMessage={errorMessage}
          isLoggedIn={Boolean(loggedInUser)}
          onRequireLogin={() => navigate("/login")}
        />

        {/* Discussion Threads */}
        <div className="mt-10">
          {filteredThreads.length > 0 ? (
            filteredThreads.slice(0, displayLimit).map((thread) => (
              <DiscussionThread
                key={thread._id}
                thread={thread}
                loggedInUser={loggedInUser}
                handleLikeThread={handleLikeThread}
                setEditThreadId={setEditThreadId}
                setEditThreadText={setEditThreadText}
                editThreadId={editThreadId}
                editThreadText={editThreadText}
                handleEditThread={handleEditThread}
                setDeleteThreadId={setDeleteThreadId}
                setShowDeleteModal={setShowDeleteModal}
                handleComment={handleComment}
                commentText={commentText}
                setCommentText={setCommentText}
                commentsLimit={commentsLimit}
                setCommentsLimit={setCommentsLimit}
                handleLikeComment={handleLikeComment}
                setEditCommentId={setEditCommentId}
                setEditCommentText={setEditCommentText}
                editCommentId={editCommentId}
                editCommentText={editCommentText}
                handleEditComment={handleEditComment}
                setDeleteCommentId={setDeleteCommentId}
              />
            ))
          ) : (
            <p className="text-center text-gray-500">{t.noDiscussionsFound}</p>
          )}
          {filteredThreads.length > displayLimit && (
            <div className="text-center mt-6">
              <button
                onClick={handleShowMore}
                className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition-transform transform hover:scale-105"
              >
                {t.showMore}
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default CommunityDiscussion;