import React, { useState } from "react";
import { FaEdit, FaSearch, FaThumbsUp, FaTrash, FaSave, FaTimes } from "react-icons/fa";

function CommunityDiscussion() {
  const [searchQuery, setSearchQuery] = useState("");
  const [limit, setLimit] = useState(8);
  const [threads, setThreads] = useState([
    {
      id: 1,
      title: "How to manage stress effectively?",
      category: "Mental Health",
      content: "I’ve been feeling overwhelmed lately. Can anyone share tips for managing stress?",
      author: "John Doe",
      likes: 12,
      comments: [
        {
          id: 1,
          comment: "Take deep breaths and meditate daily.",
          author: "Alice Brown",
          likes: 3,
        },
      ],
      createdAt: "2 days ago",
    },
  ]);
  const [newThread, setNewThread] = useState({ title: "", category: "", content: "" });
  const [commentText, setCommentText] = useState("");
  const [commentsLimit, setCommentsLimit] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [editThreadId, setEditThreadId] = useState(null);
  const [editThreadText, setEditThreadText] = useState({ title: "", content: "" });
  const [editCommentId, setEditCommentId] = useState(null);
  const [editCommentText, setEditCommentText] = useState("");

  const handleSearch = (e) => setSearchQuery(e.target.value);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewThread({ ...newThread, [name]: value });
  };

  const handleCreateThread = () => {
    if (!newThread.title || !newThread.category || !newThread.content) {
      setErrorMessage("All fields are required to create a discussion!");
      return;
    }

    const newThreadData = {
      id: threads.length + 1,
      ...newThread,
      author: "Anonymous",
      likes: 0,
      comments: [],
      createdAt: "Just now",
    };

    setThreads([newThreadData, ...threads]);
    setNewThread({ title: "", category: "", content: "" });
    setErrorMessage("");
  };

  const handleLikeThread = (id) => {
    setThreads(
      threads.map((thread) =>
        thread.id === id ? { ...thread, likes: thread.likes + 1 } : thread
      )
    );
  };

  const handleComment = (threadId) => {
    if (!commentText.trim()) {
      setErrorMessage("Comment cannot be empty!");
      return;
    }

    setThreads(
      threads.map((thread) =>
        thread.id === threadId
          ? {
              ...thread,
              comments: [
                ...thread.comments,
                {
                  id: thread.comments.length + 1,
                  comment: commentText,
                  author: "Anonymous",
                  likes: 0,
                },
              ],
            }
          : thread
      )
    );

    setCommentText("");
    setErrorMessage("");
  };

  const handleLikeComment = (threadId, commentId) => {
    setThreads(
      threads.map((thread) =>
        thread.id === threadId
          ? {
              ...thread,
              comments: thread.comments.map((comment) =>
                comment.id === commentId
                  ? { ...comment, likes: comment.likes + 1 }
                  : comment
              ),
            }
          : thread
      )
    );
  };

  const filteredThreads = threads.filter(
    (thread) =>
      thread.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      thread.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDeleteComment = (threadId, commentId) => {
    setThreads(
      threads.map((thread) =>
        thread.id === threadId
          ? {
              ...thread,
              comments: thread.comments.filter((comment) => comment.id !== commentId),
            }
          : thread
      )
    );
  };

  const handleEditComment = (threadId, commentId) => {
    setEditCommentId(commentId);
    const thread = threads.find((thread) => thread.id === threadId);
    const comment = thread.comments.find((comment) => comment.id === commentId);
    setEditCommentText(comment.comment);
  };

  const handleSaveComment = (threadId, commentId) => {
    setThreads(
      threads.map((thread) =>
        thread.id === threadId
          ? {
              ...thread,
              comments: thread.comments.map((comment) =>
                comment.id === commentId
                  ? { ...comment, comment: editCommentText }
                  : comment
              ),
            }
          : thread
      )
    );
    setEditCommentId(null);
    setEditCommentText("");
  };

  const handleEditThread = (threadId) => {
    setEditThreadId(threadId);
    const thread = threads.find((thread) => thread.id === threadId);
    setEditThreadText({ title: thread.title, content: thread.content });
  };

  const handleSaveThread = (threadId) => {
    setThreads(
      threads.map((thread) =>
        thread.id === threadId
          ? { ...thread, title: editThreadText.title, content: editThreadText.content }
          : thread
      )
    );
    setEditThreadId(null);
    setEditThreadText({ title: "", content: "" });
  };

  const handleDeleteThread = (threadId) => {
    setThreads(threads.filter((thread) => thread.id !== threadId));
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6 md:p-12">
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

      {/* New Discussion Form */}
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
          <option value="Mental Health">Mental Health</option>
          <option value="Nutrition">Nutrition</option>
          <option value="Physical Health">Physical Health</option>
          <option value="Wellness Tips">Wellness Tips</option>
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
          Post Discussion
        </button>
        {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}
      </div>

      {/* Discussion Threads */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Discussions</h2>
        {filteredThreads.slice(0, limit).map((thread) => (
          <div key={thread.id} className="bg-white p-6 shadow-lg rounded-lg mb-6">
            <div className="flex justify-between">
              {editThreadId === thread.id ? (
                <div className="flex flex-col w-full">
                  <input
                    type="text"
                    value={editThreadText.title}
                    onChange={(e) => setEditThreadText({ ...editThreadText, title: e.target.value })}
                    className="w-full mb-2 p-2 border rounded-lg shadow-sm focus:ring focus:ring-blue-300"
                  />
                  <textarea
                    value={editThreadText.content}
                    onChange={(e) => setEditThreadText({ ...editThreadText, content: e.target.value })}
                    className="w-full mb-2 p-2 border rounded-lg shadow-sm focus:ring focus:ring-blue-300"
                  />
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => handleSaveThread(thread.id)}
                      className="bg-green-600 text-white py-1 px-3 rounded-lg shadow-md hover:bg-green-700"
                    >
                      <FaSave />
                    </button>
                    <button
                      onClick={() => setEditThreadId(null)}
                      className="bg-red-600 text-white py-1 px-3 rounded-lg shadow-md hover:bg-red-700"
                    >
                      <FaTimes />
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <h3 className="text-xl font-semibold text-blue-800 mb-2">{thread.title}</h3>
                  <div className="flex gap-2">
                    <button
                      className="text-green-600 hover:text-green-800"
                      onClick={() => handleEditThread(thread.id)}
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="text-red-600 hover:text-red-800"
                      onClick={() => handleDeleteThread(thread.id)}
                    >
                      <FaTrash />
                    </button>
                  </div>
                </>
              )}
            </div>
            <div className="flex flex-row gap-x-12 mb-4">
              <p className="text-gray-600 text-sm font-bold mb-4">
                {thread.category} | {thread.createdAt} | By {thread.author}
              </p>
              <button
                onClick={() => handleLikeThread(thread.id)}
                className="flex items-center text-blue-800 hover:text-blue-500"
              >
                <FaThumbsUp className="mr-2" />
                {thread.likes} Likes
              </button>
            </div>
            <p className="text-gray-700 mb-4">{thread.content}</p>
            <div className="flex items-center ml-16">
              <div className="w-full">
                {thread.comments.slice(0, commentsLimit[thread.id] || 3).map((comment) => (
                  <div
                    key={comment.id}
                    className="border-t pt-4 mt-4 text-gray-700 flex items-center justify-between"
                  >
                    <div>
                      {editCommentId === comment.id ? (
                        <div className="flex flex-col">
                          <input
                            type="text"
                            value={editCommentText}
                            onChange={(e) => setEditCommentText(e.target.value)}
                            className="w-full mb-2 p-2 border rounded-lg shadow-sm focus:ring focus:ring-blue-300"
                          />
                          <div className="flex justify-end gap-2">
                            <button
                              onClick={() => handleSaveComment(thread.id, comment.id)}
                              className="bg-green-600 text-white py-1 px-3 rounded-lg shadow-md hover:bg-green-700"
                            >
                              <FaSave />
                            </button>
                            <button
                              onClick={() => setEditCommentId(null)}
                              className="bg-red-600 text-white py-1 px-3 rounded-lg shadow-md hover:bg-red-700"
                            >
                              <FaTimes />
                            </button>
                          </div>
                        </div>
                      ) : (
                        <>
                          <p>{comment.comment}</p>
                          <p className="text-sm text-gray-500">By <a href="#" className="font-bold">{comment.author}</a></p>
                          <button
                            onClick={() => handleLikeComment(thread.id, comment.id)}
                            className="flex text-blue-800 items-center hover:text-blue-500 my-5"
                          >
                            <FaThumbsUp className="mr-2" />
                            {comment.likes} Likes
                          </button>
                        </>
                      )}
                    </div>
                    <div className="flex flex-col items-center gap-y-4">
                      <button onClick={() => handleDeleteComment(thread.id, comment.id)}>
                        <FaTrash color="red"/>
                      </button>
                      <button onClick={() => handleEditComment(thread.id, comment.id)}>
                        <FaEdit color="green" size={20}/>
                      </button>
                    </div>
                  </div>
                ))}
                {thread.comments.length > 3 && thread.comments.length > (commentsLimit[thread.id] || 3) && (
                  <button
                    onClick={() => setCommentsLimit({ ...commentsLimit, [thread.id]: thread.comments.length })}
                    className="text-blue-600 hover:underline hover:text-blue-800 mt-2"
                  >
                    See More Comments...
                  </button>
                )}
                {(commentsLimit[thread.id] || 3) > 3 && (
                  <button
                    onClick={() => setCommentsLimit({ ...commentsLimit, [thread.id]: 3 })}
                    className="text-blue-600 hover:underline hover:text-blue-800 mt-2"
                  >
                    Close
                  </button>
                )}
                <div className="mt-4">
                  <input
                    type="text"
                    placeholder="Add a comment..."
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    className="w-full p-3 border rounded-lg shadow-sm focus:ring focus:ring-blue-300"
                  />
                  <button
                    onClick={() => handleComment(thread.id)}
                    className="bg-blue-600 text-white py-2 px-6 rounded-lg shadow-md hover:bg-blue-700 mt-2"
                  >
                    Add Comment
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
        {filteredThreads.length > limit && (
          <button
            onClick={() => setLimit(limit + 8)}
            className="text-blue-600 hover:underline hover:text-blue-800"
          >
            See More Discussions...
          </button>
        )}
      </div>
    </div>
  );
}

export default CommunityDiscussion;
