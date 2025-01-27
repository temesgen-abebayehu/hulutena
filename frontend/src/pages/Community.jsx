import React, { useState } from "react";
import { FaSearch, FaThumbsUp, FaCommentAlt } from "react-icons/fa";

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
      comments: 5,
      createdAt: "2 days ago",
    },
    {
      id: 2,
      title: "Best diet for improving heart health?",
      category: "Nutrition",
      content: "What are some recommended foods to keep my heart healthy?",
      author: "Jane Smith",
      likes: 8,
      comments: 3,
      createdAt: "1 week ago",
    },
    {
      id: 3,
      title: "Effective exercises for lower back pain",
      category: "Physical Health",
      content: "I’ve been experiencing lower back pain. Can someone suggest some exercises?",
      author: "Alex Green",
      likes: 15,
      comments: 6,
      createdAt: "3 days ago",
    },
  ]);

  const [newThread, setNewThread] = useState({
    title: "",
    category: "",
    content: "",
  });

  const handleSearch = (e) => setSearchQuery(e.target.value);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewThread({ ...newThread, [name]: value });
  };

  const handleCreateThread = () => {
    if (newThread.title && newThread.category && newThread.content) {
      const newThreadData = {
        id: threads.length + 1,
        ...newThread,
        author: "Anonymous",
        likes: 0,
        comments: 0,
        createdAt: "Just now",
      };
      setThreads([newThreadData, ...threads]);
      setNewThread({ title: "", category: "", content: "" });
    }
  };

  const filteredThreads = threads.filter(
    (thread) =>
      thread.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      thread.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
        <button className="bg-blue-500 text-white p-3 rounded-lg shadow-md ml-2">
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
      </div>

      {/* Discussion Threads */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Discussions</h2>
        {filteredThreads.length > 0 ? (
          filteredThreads.slice(0,8).map((thread) => (
            <div
              key={thread.id}
              className="bg-white p-6 shadow-lg rounded-lg mb-6"
            >
              <h3 className="text-xl font-semibold text-blue-800 mb-2">
                {thread.title}
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                {thread.category} | {thread.createdAt} | By {thread.author}
              </p>
              <p className="text-gray-700 mb-4">{thread.content}</p>
              <div className="flex justify-between items-center text-gray-500">
                <div className="flex items-center space-x-4">
                  <button className="flex items-center hover:text-blue-600">
                    <FaThumbsUp className="mr-2" />
                    {thread.likes} Likes
                  </button>
                  <button className="flex items-center hover:text-blue-600">
                    <FaCommentAlt className="mr-2" />
                    {thread.comments} Comments
                  </button>
                </div>
                <a
                  href="#"
                  className="text-blue-600 hover:underline hover:text-blue-800"
                >
                  View Discussion
                </a>
              </div>              
            </div>            
          ))
        ) : (
          <p className="text-gray-600">No discussions found.</p>
        )}
      </div>
      {filteredThreads.length > limit ? (
        <button
          onClick={() => setLimit(limit + 8)}
          className=" text-blue-600 hover:underline hover:text-blue-800"
        >
          see More discussion...
        </button>
      ) : (
        ""
      )}
    </div>
  );
}

export default CommunityDiscussion;
