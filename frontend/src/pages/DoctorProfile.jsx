import { useState } from 'react';
import { FaArrowLeft, FaComments } from 'react-icons/fa';

function Profile() {
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [chatMessages, setChatMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');

    const handleSendMessage = () => {
        if (newMessage.trim() !== '') {
            setChatMessages([...chatMessages, { text: newMessage, sender: 'user' }]);
            setNewMessage('');
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-2 relative">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl">
                <div className="flex flex-col md:flex-row items-center md:space-x-6">
                    <div className="overflow-hidden rounded-full h-60 w-60">
                        <img className="object-cover h-full w-full" src="doctor2.jpg" alt="doctor profile" />
                    </div>
                    <div className="mt-4 md:mt-0 text-center md:text-left">
                        <h2 className="text-2xl font-semibold text-blue-900">Dr. Belachew Chane</h2>
                        <p className="text-lg text-gray-700">Cardiologist</p>
                        <p className="text-yellow-500">4.5 rating</p>
                    </div>
                </div>
                <div className="mt-6 text-gray-700">
                    <p><span className="font-semibold">Address:</span> Addis Ababa, Ethiopia</p>
                    <p><span className="font-semibold">Speaks:</span> Amharic, English</p>
                    <p><span className="font-semibold">Experience:</span> 20 years</p>
                    <p><span className="font-semibold">Education:</span> Addis Ababa University</p>
                    <p><span className="font-semibold">Services:</span> Home to home, video streaming</p>
                    <p><span className="font-semibold">Specializations:</span> Heart Surgery, Cardiac Rehabilitation</p>
                </div>
                <div className="mt-6 flex justify-between items-center">
                    <button 
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
                        onClick={() => window.history.back()}
                    >
                        <FaArrowLeft />
                    </button>
                    <button 
                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-300"
                        onClick={() => setIsChatOpen(!isChatOpen)}
                    >
                        <FaComments /> Chat
                    </button>
                </div>
            </div>

            {isChatOpen && (
                <div className="fixed bottom-4 right-4 w-80 bg-white rounded-lg shadow-lg flex flex-col">
                    <div className="bg-blue-500 text-white p-4 rounded-t-lg flex justify-between items-center">
                        <h3 className="text-lg font-semibold">Chat with Dr. Chane</h3>
                        <button onClick={() => setIsChatOpen(false)} className="text-white font-bold">&times;</button>
                    </div>
                    <div className="p-4 h-64 overflow-y-auto flex flex-col space-y-2">
                        {chatMessages.map((msg, index) => (
                            <div key={index} className={`p-2 rounded ${msg.sender === 'user' ? 'bg-blue-100 self-end' : 'bg-gray-200 self-start'}`}>
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
