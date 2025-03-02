import ChatWithDoctor from "../models/ChatWithDoctor.model.js";

export const getChats = async (req, res) => {
    try {
        const chats = await ChatWithDoctor.find({
            $or: [
                { patientId: req.user._id },
                { doctorId: req.user._id }
            ]
        });
        res.status(200).json(chats);
    } catch (error) {
        console.log(`Error in getChats: ${error.message}`);
        res.status(500).json({ message: "Internal server error!" });
    }
};

export const updateChat = async (req, res) => {
    const { id } = req.params;
    const { sender, message } = req.body;
    try {
        const chat = await ChatWithDoctor.findOneAndUpdate(
            { _id: id },
            { $push: { messages: { sender, message } } },
            { new: true }
        );

        if (!chat) {
            return res.status(404).json({ message: "Chat not found!" });
        }

        res.status(200).json(chat);
    } catch (error) {
        console.log(`Error in updateChat: ${error.message}`);
        res.status(500).json({ message: "Internal server error!" });
    }
};

export const createChat = async (req, res) => {
    const { senderId, doctorId, message } = req.body;
    try {
        const chat = await ChatWithDoctor.create({
            senderId,
            doctorId,
            messages: [{ sender: senderId, message }],
        });
        res.status(200).json(chat);
    } catch (error) {
        console.log(`Error in createChat: ${error.message}`);
        res.status(500).json({ message: "Internal server error!" });
    }
};

export const deleteChat = async (req, res) => {
    const { id } = req.params;
    try {
        const chat = await ChatWithDoctor.deleteOne({ _id: id });

        if (chat.deletedCount === 0) {
            return res.status(404).json({ message: "Chat not found!" });
        }

        res.status(200).json({ message: "Chat deleted successfully!" });
    } catch (error) {
        console.log(`Error in deleteChat: ${error.message}`);
        res.status(500).json({ message: "Internal server error!" });
    }
};