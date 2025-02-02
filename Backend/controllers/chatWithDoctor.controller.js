import ChatWithDoctor from "../models/ChatWithDoctor.model.js";

export const getChats = async (req, res) => {
    try {
        const chat = await ChatWithDoctor.find({
            $or: [
                { patientId: req.body.patientId || req.user._id },
                { doctorId: req.body.doctorId || req.user._id }
            ]
        });
        res.status(200).json(chat);
    } catch (error) {
        console.log(`Error in getChatWithDoctor: ${error.message}`);
        res.status(500).json({ message: "Internal server error!" });
    }
};

export const createChat = async (req, res) => {
    const patientId = req.user;
    try {
        const { doctorId, message } = req.body;
        const chat = await ChatWithDoctor.create({
            patientId,
            doctorId,
            messages: [{ sender: patientId._id, message }],
        });
        res.status(200).json(chat);
    }
    catch (error) {
        console.log(`Error in createChatWithDoctor: ${error.message}`);
        res.status(500).json({ message: "Internal server error!" });
    }
};

export const deleteChat = async (req, res) => {
    try {
        const chat = await ChatWithDoctor.deleteMany({
            $or: [
                { patientId: req.body.patientId || req.user._id },
                { doctorId: req.body.doctorId || req.user._id }
            ]
        });

        if (chat.deletedCount === 0) {
            return res.status(404).json({ message: "Chat not found!" });
        }

        res.status(200).json({ message: "Chat deleted successfully!" });
    }
    catch (error) {
        console.log(`Error in deleteChatWithDoctor: ${error.message}`);
        res.status(500).json({ message: "Internal server error!" });
    }
};