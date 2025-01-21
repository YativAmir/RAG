const express = require('express');
const router = express.Router();
const {
  chatController,
  createNewChat,
  getChatHistory,
  sendMessage,
} = require('../controllers/chatController');

// Create a new chat session
router.post('/new', createNewChat);

// Get a chat session by ID (to continue or view history)
router.get('/:sessionId', getChatHistory);

// Send a message in a specific chat session
router.post('/:sessionId', sendMessage);

module.exports = router;
