import getResponse from "../services/chatbotService.js";

export const askChatbot = async (req, res) => {
  const { question } = req.body;

  try {
    const response = getResponse(question);
    res.status(200).json({ response });
  } catch (error) {
    console.error(`Error asking chatbot: ${error.message}`);
    res.status(500).json({ message: error.message });
  }
}