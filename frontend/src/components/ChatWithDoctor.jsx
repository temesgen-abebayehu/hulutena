import { useState, useEffect } from "react";
import { FaInfoCircle, FaPaperPlane } from "react-icons/fa";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import { useLanguage } from "../context/LanguageContext";

function ChatWithDoctor({ doctorId, userId, doctorName, onClose }) {
  const { t } = useLanguage();
  const [chatMessages, setChatMessages] = useState({ messages: [] });
  const [newMessage, setNewMessage] = useState("");
  const [chatId, setChatId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Fetch chat messages
  useEffect(() => {
    const fetchChatMessages = async () => {
      try {
        const response = await fetch(`/api/chatdoctors?doctorId=${doctorId}&&senderId=${userId}`);
        if (!response.ok) throw new Error(t.failedToFetchMessages);
        const data = await response.json();

        // Handle array response
        if (Array.isArray(data)) {
          if (data.length > 0) {
            // Use the first chat object in the array
            setChatMessages(data[0]);
            setChatId(data[0]._id);
          } else {
            // If no chats exist, initialize with an empty messages array
            setChatMessages({ messages: [] });
            setChatId(null);
          }
        } else {
          // If the response is not an array, use it as-is
          setChatMessages(data);
          setChatId(data._id);
        }
      } catch (err) {
        console.error("Error fetching chat messages:", err);
      }
    };

    fetchChatMessages();
  }, [doctorId, userId, t]);

  // Send a new message
  const handleSendMessage = async () => {
    if (newMessage.trim() === "") return;

    try {
      let response;
      if (!chatId) {
        // Create new chat
        response = await fetch("/api/chatdoctors", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            senderId: userId,
            doctorId: doctorId,
            message: newMessage,
            timestamp: new Date().toISOString(),
          }),
        });
        const data = await response.json();
        setChatMessages(data);
        setChatId(data._id);
      } else {
        // Update existing chat
        response = await fetch(`/api/chatdoctors/${chatId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            sender: userId,
            message: newMessage,
            timestamp: new Date().toISOString(),
          }),
        });
        const data = await response.json();
        setChatMessages(data);
      }

      if (!response.ok) throw new Error(t.failedToSendMessage);
      setNewMessage("");
    } catch (err) {
      console.error("Error sending message:", err);
    }
  };

  // Delete chat
  const handleDeleteChat = async () => {
    setShowDeleteModal(true);
  };

  const confirmDeleteChat = async () => {
    try {
      const response = await fetch(`/api/chatdoctors/${chatId}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error(t.failedToDeleteChat);
      setChatMessages({ messages: [] });
      setChatId(null);
      setShowDeleteModal(false);
    } catch (err) {
      console.error("Error deleting chat:", err);
    }
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  };

  return (
    <div className="fixed bottom-4 right-4 w-80 bg-white rounded-lg shadow-lg flex flex-col">
      <div className="bg-blue-500 text-white p-4 rounded-t-lg flex justify-between items-center">
        <h3 className="text-lg font-semibold">{t.chatWith}
          <a href={`/doctor-profile/${doctorId}`} className="text-lg text-blue-50 hover:underline" onClick={onClose}> {doctorName}</a>
        </h3>
        <button
          onClick={onClose}
          className="text-white font-bold"
        >
          &times;
        </button>
      </div>
      <div className="p-4 h-64 overflow-y-auto flex flex-col space-y-2">
        {chatMessages.messages && chatMessages.messages.length > 0 ? (
          chatMessages.messages.map((msg, index) => (
            <div
              key={index}
              className={`p-2 rounded ${msg.sender === userId
                  ? "bg-blue-100 self-end"
                  : "bg-gray-200 self-start"
                }`}
            >
              <p>{msg.message}</p>
              <span className="text-xs text-gray-500">{formatTimestamp(msg.timestamp)}</span>
            </div>
          ))
        ) : (
          <p className="text-6xl">🙋🏼‍♂️</p>
        )}
      </div>
      <div className="p-4 border-t flex items-center">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-grow border rounded-l px-4 py-2 focus:outline-none"
          placeholder={t.typeMessage}
        />
        <button
          onClick={handleSendMessage}
          className={`bg-blue-500 text-white px-4 py-2 rounded-r hover:bg-blue-600 transition duration-300 ${newMessage.trim() === "" ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          <FaPaperPlane size={24} />
        </button>
      </div>
      <button
        onClick={handleDeleteChat}
        className="bg-red-500 text-white px-4 py-2 rounded-b hover:bg-red-600 transition duration-300 flex items-center justify-center"
      >
        <FaInfoCircle className="mr-2" size={16} />
        {t.deleteChat}
      </button>

      {/* Delete Confirmation Modal */}

      <DeleteConfirmationModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={confirmDeleteChat}
        message={t.confirmDeleteChat}
      />

    </div>
  );
}

export default ChatWithDoctor;