import React from "react";
import { FaEdit, FaTrash, FaThumbsUp, FaSave, FaTimes } from "react-icons/fa";
import moment from "moment";
import Comment from "./Comment";

const DiscussionThread = ({
  thread,
  loggedInUser,
  handleLikeThread,
  handleEditThread,
  editThreadId,
  editThreadText,
  setEditThreadText,
  setEditThreadId,
  setDeleteThreadId,
  setShowDeleteModal,
  commentsLimit,
  setCommentsLimit,
  handleComment,
  commentText,
  setCommentText,
  handleLikeComment,
  handleEditComment,
  handleDeleteComment,
  editCommentId,
  editCommentText,
  setEditCommentId,
  setEditCommentText,
  setDeleteCommentId,
}) => {
  const isAuthor = loggedInUser === thread.author._id;

  return (
    <div key={thread._id} className="bg-white p-6 shadow-lg rounded-lg mb-6">
      {/* Edit and Delete Buttons (Top Right) */}
      {editThreadId === thread._id ? (
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
          <div className="flex justify-end gap-10 md:gap-20">
            <button
              onClick={() => handleEditThread(thread._id)}
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
          {/* First Line: Edit and Delete Buttons (Right Side) */}
          <div className="flex justify-between items-start">
            {/* Category, Timestamp, and Author (Left Side) */}
            <p className="text-gray-600 text-sm font-semibold mb-2">
              {thread.category} | {moment(thread.createdAt).fromNow()} | By{" "}
              <span className="font-bold">{thread.author.name || "Unknown"}</span>
            </p>

            {/* Edit and Delete Buttons (Right Side) */}
            {isAuthor && (
              <div className="flex justify-end items-center gap-x-4">
                <button
                  className="text-green-600 hover:text-green-800"
                  onClick={() => {
                    setEditThreadId(thread._id);
                    setEditThreadText({ title: thread.title, content: thread.content });
                  }}
                >
                  <FaEdit size={20} />
                </button>
                <button
                  className="text-red-600 hover:text-red-800"
                  onClick={() => {
                    setDeleteThreadId(thread._id);
                    setShowDeleteModal(true);
                  }}
                >
                  <FaTrash size={20} />
                </button>
              </div>
            )}
          </div>
          <h3 className="text-xl font-semibold text-blue-800 mb-2">{thread.title}</h3>
          <p className="text-gray-700 mb-4">{thread.content}</p>
          {loggedInUser && (
            <button
              onClick={() => handleLikeThread(thread._id)}
              className="flex items-center text-blue-800 hover:text-blue-500 mb-4"
            >
              <FaThumbsUp className="mr-2" />
              {thread.likes?.length || 0} Likes
            </button>
          )}

          {/* Comments Section */}
          <div className="w-full pl-10 pt-9">
            {loggedInUser && (
              <div className="mt-4">
                <input
                  type="text"
                  placeholder="Add a comment..."
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  className="w-full p-3 border rounded-lg shadow-sm focus:ring focus:ring-blue-300"
                />
                <button
                  onClick={() => handleComment(thread._id)}
                  className="bg-blue-600 text-white py-2 px-6 rounded-lg shadow-md hover:bg-blue-700 mt-2"
                >
                  Add Comment
                </button>
              </div>
            )}

            {/* Display Comments */}
            {thread.comments.slice(0, commentsLimit[thread._id] || 3).map((comment) => (
              <Comment
                className="border-t"
                key={comment._id}
                comment={comment}
                threadId={thread._id}
                setDeleteThreadId={setDeleteThreadId}
                loggedInUser={loggedInUser}
                handleLikeComment={handleLikeComment}
                handleEditComment={handleEditComment}
                handleDeleteComment={handleDeleteComment}
                editCommentId={editCommentId}
                editCommentText={editCommentText}
                setEditCommentId={setEditCommentId}
                setEditCommentText={setEditCommentText}
                setDeleteCommentId={setDeleteCommentId}
                setShowDeleteModal={setShowDeleteModal}
              />
            ))}

            {/* See More / Close Comments Buttons */}
            {thread.comments.length > 3 && thread.comments.length > (commentsLimit[thread._id] || 3) && (
              <button
                onClick={() => setCommentsLimit({ ...commentsLimit, [thread._id]: thread.comments.length })}
                className="text-blue-600 hover:underline hover:text-blue-800 mt-2"
              >
                See More Comments...
              </button>
            )}
            {(commentsLimit[thread._id] || 3) > 3 && (
              <button
                onClick={() => setCommentsLimit({ ...commentsLimit, [thread._id]: 3 })}
                className="text-blue-600 hover:underline hover:text-blue-800 mt-2"
              >
                Close
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default DiscussionThread;