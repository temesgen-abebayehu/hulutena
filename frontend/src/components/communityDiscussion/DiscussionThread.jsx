import React, { useState } from "react";
import { FaEdit, FaTrash, FaThumbsUp, FaSave, FaTimes } from "react-icons/fa";
import Comment from "./Comment";

const DiscussionThread = ({
  thread,
  isLoggedIn,
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
  console.log('author', thread.author);
  return (
    <div key={thread._id} className="bg-white p-6 shadow-lg rounded-lg mb-6">
      <div className="flex justify-between">
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
            <h3 className="text-xl font-semibold text-blue-800 mb-2">{thread.title}</h3>
            {isLoggedIn && (
              <div className="flex justify-end items-center gap-x-12 md:gap-x-32">
              <button
                className="text-green-600 hover:text-green-800"
                onClick={() => {
                  setEditThreadId(thread._id);
                  setEditThreadText({ title: thread.title, content: thread.content });
                }}
              >
                <FaEdit size={24} />
              </button>
              <button
                className="text-red-600 hover:text-red-800"
                onClick={() => {
                  setDeleteThreadId(thread._id);
                  setShowDeleteModal(true);
                }}
              >
                <FaTrash size={22} />
              </button>
            </div>
            )}
          </>
        )}
      </div>
      <div className="flex flex-col items-start mb-4">
        <p className="text-gray-600 text-sm font-semibold mb-2">
          {thread.category} | {new Date(thread.createdAt).toLocaleDateString()} | By{" "}
          <span className="font-bold">{thread.author?.name || "Unknown"}</span>
        </p>
        {isLoggedIn && (
          <button
            onClick={() => handleLikeThread(thread._id)}
            className="flex items-center text-blue-800 hover:text-blue-500"
          >
            <FaThumbsUp className="mr-2" />
            {thread.likes?.length || 0} Likes
          </button>
        )}
      </div>
      <p className="text-gray-700 mb-4">{thread.content}</p>
      <div className="flex items-center ml-16">
        <div className="w-full">
        {isLoggedIn && (
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
          {thread.comments.slice(0, commentsLimit[thread._id] || 3).map((comment) => (
            <Comment
              key={comment._id}
              comment={comment}
              threadId={thread._id}
              isLoggedIn={isLoggedIn}
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
      </div>
    </div>
  );
};

export default DiscussionThread;