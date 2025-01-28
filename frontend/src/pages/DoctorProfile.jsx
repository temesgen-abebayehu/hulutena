import { useState } from "react";
import { FaArrowLeft, FaComments, FaStar, FaCheckCircle } from "react-icons/fa";

function Profile() {
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [chatMessages, setChatMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");

    const doctor = {
        id: 1,
        name: "Specialist Doctor 1",
        address: "Addis Ababa, Ethiopia",
        experience: 11,
        education: ["Addis Ababa University", "Harvard University"],
        rating: 4.6,
        languages: ["English", "Spanish"],
        availability: "Online & In-person",
        specialty: "Cardiologist",
        imgSrc: "/doctor2.jpg",
    };

    const handleSendMessage = () => {
        if (newMessage.trim() !== "") {
            setChatMessages([...chatMessages, { text: newMessage, sender: "user" }]);
            setNewMessage("");
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-2 relative">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl">
                <div className="flex flex-col md:flex-row items-center md:space-x-6">
                    <div className="overflow-hidden rounded-full h-60 w-60">
                        <img
                            className="object-cover h-full w-full"
                            src={doctor.imgSrc}
                            alt="doctor profile"
                        />
                    </div>
                    <div className="mt-4 md:mt-0 text-center md:text-left">
                        <h2 className="flex flex-row items-center gap-2 text-2xl font-semibold text-blue-900">
                            {doctor.name} <FaCheckCircle color="green" size={16} />
                        </h2>
                        <p className="text-lg text-gray-700">{doctor.specialty}</p>
                        <div className="flex flex-row items-center gap-2 mt-2 font-semibold">
                            <p className="text-yellow-500">{doctor.rating}</p>
                            {[1, 2, 3, 4, 5].map((index) => (
                                <div key={index} className="relative w-5 h-5">
                                    <FaStar className="absolute top-0 left-0 text-slate-200" />
                                    <FaStar
                                        className="absolute top-0 left-0 text-yellow-500"
                                        style={{
                                            clipPath:
                                                doctor.rating >= index - 0.5 && doctor.rating < index
                                                    ? "polygon(0 0, 50% 0, 50% 100%, 0 100%)"
                                                    : doctor.rating >= index
                                                    ? "none"
                                                    : "polygon(0 0, 0 0, 0 100%, 0 100%)",
                                        }}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="mt-6 text-gray-700 text-lg">
                    <p>
                        <span className="font-semibold">Address:</span> {doctor.address}
                    </p>
                    <p>
                        <span className="font-semibold">Speaks:</span> {doctor.languages.join(", ")}
                    </p>
                    <p>
                        <span className="font-semibold">Experience:</span> {doctor.experience} years
                    </p>
                    <p>
                        <span className="font-semibold">Education:</span> {doctor.education.join(", ")}
                    </p>
                    <p>
                        <span className="font-semibold">Availability:</span> {doctor.availability}
                    </p>
                    <p>
                        <span className="font-semibold">Specialty:</span> {doctor.specialty}
                    </p>
                </div>
                <div className="mt-6 flex justify-between items-center">
                    <button
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300 flex items-center gap-2"
                        onClick={() => window.history.back()}
                    >
                        <FaArrowLeft />
                        <span>Back</span>
                    </button>
                    <button
                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-300 flex items-center gap-2"
                        onClick={() => setIsChatOpen(!isChatOpen)}
                    >
                        <FaComments />
                        <span>Chat</span>
                    </button>
                </div>
            </div>

            {isChatOpen && (
                <div className="fixed bottom-4 right-4 w-80 bg-white rounded-lg shadow-lg flex flex-col">
                    <div className="bg-blue-500 text-white p-4 rounded-t-lg flex justify-between items-center">
                        <h3 className="text-lg font-semibold">Chat with {doctor.name}</h3>
                        <button
                            onClick={() => setIsChatOpen(false)}
                            className="text-white font-bold"
                        >
                            &times;
                        </button>
                    </div>
                    <div className="p-4 h-64 overflow-y-auto flex flex-col space-y-2">
                        {chatMessages.map((msg, index) => (
                            <div
                                key={index}
                                className={`p-2 rounded ${
                                    msg.sender === "user"
                                        ? "bg-blue-100 self-end"
                                        : "bg-gray-200 self-start"
                                }`}
                            >
                                {msg.text}
                            </div>
                        ))}
                    </div>
                    <div className="p-4 border-t flex items-center">
                        <input
                            type="text"
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            className="flex-grow border rounded-l px-4 py-2 focus:outline-none"
                            placeholder="Type a message..."
                        />
                        <button
                            onClick={handleSendMessage}
                            className="bg-blue-500 text-white px-4 py-2 rounded-r hover:bg-blue-600 transition duration-300"
                        >
                            Send
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Profile;
