import React from "react";
import { FaEdit, FaTrash, FaThumbsUp, FaSave, FaTimes } from "react-icons/fa";
import moment from "moment";
import { useLanguage } from "../../context/LanguageContext";

const Comment = ({
  comment,
  threadId,
  loggedInUser,
  handleLikeComment,
  handleEditComment,
  editCommentId,
  editCommentText,
  setEditCommentId,
  setEditCommentText,
  setDeleteCommentId,
  setDeleteThreadId,
  setShowDeleteModal,
}) => {
  const { t } = useLanguage();
  return (
    <div className="border-t pt-4 mt-4 text-gray-700 flex items-center justify-between">
      <div>
        {editCommentId === comment._id ? (
          <div className="flex flex-col">
            <input
              type="text"
              value={editCommentText}
              onChange={(e) => setEditCommentText(e.target.value)}
              className="w-full mb-2 p-2 border rounded-lg shadow-sm focus:ring focus:ring-blue-300"
            />
            <div className="flex justify-end gap-10 md:gap-20">
              <button
                onClick={() => handleEditComment(threadId, comment._id)}
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
            <p className="text-sm text-gray-500">
              {t.by}{" "}
              <span className="font-bold">
                {comment.author.name || t.unknown}
              </span>{" "}
              - {moment(comment.createdAt).fromNow()}
            </p>
            <p>{comment.comment}</p>
            <button
              onClick={() => (loggedInUser ? handleLikeComment(threadId, comment._id) : window.location.assign("/login"))}
              className="flex text-blue-800 items-center hover:text-blue-500 my-5"
            >
              <FaThumbsUp className="mr-2" />
              {comment.likes?.length || 0} {t.likes}
            </button>
          </>
        )}
      </div>
      {loggedInUser === comment.author._id && (
        <div className="flex flex-row justify-end items-center gap-x-10 md:gap-x-20">
          <button
            onClick={() => {
              setEditCommentId(comment._id);
              setEditCommentText(comment.comment);
            }}
          >
            <FaEdit color="green" />
          </button>
          <button
            onClick={() => {
              setDeleteCommentId(comment._id);
              setDeleteThreadId(threadId);
              setShowDeleteModal(true);
            }}
          >
            <FaTrash color="red" />
          </button>
        </div>
      )}
    </div>
  );
};

export default Comment;