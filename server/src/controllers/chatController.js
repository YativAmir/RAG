const ChatSession = require('../models/chatSessions.model.js');
const { handleUserQuery } = require('../services/chatRAGService');

// Create a new chat session
const createNewChat = async (req, res) => {
  try {
    const newChat = await ChatSession.create({ messages: [] });
    return res.status(201).json({ sessionId: newChat._id });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Unable to create new chat session' });
  }
};

// Get existing chat session
const getChatHistory = async (req, res) => {
  const { sessionId } = req.params;
  try {
    const chat = await ChatSession.findById(sessionId);
    if (!chat) {
      return res.status(404).json({ error: 'Chat session not found' });
    }
    return res.json(chat);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Unable to fetch chat session' });
  }
};

// Send a message and get the chatbot’s response
const sendMessage = async (req, res) => {
  const { sessionId } = req.params;
  const { message } = req.body;
  try {
    // 1. Retrieve chat session
    const chat = await ChatSession.findById(sessionId);
    if (!chat) {
      return res.status(404).json({ error: 'Chat session not found' });
    }

    // 2. Add user message
    chat.messages.push({ role: 'user', content: message });

    // 3. Use RAG service to get AI response
    const aiResponse = await handleUserQuery(message, chat.messages);

    // 4. Add AI response to chat
    chat.messages.push({ role: 'assistant', content: aiResponse });

    await chat.save();
    return res.json({ response: aiResponse });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Error sending message' });
  }
};

module.exports = {
  createNewChat,
  getChatHistory,
  sendMessage,
};
