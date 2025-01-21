require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { connectDB } = require('./config/db');
connectDB();


const app = express();
// Middleware
app.use(cors());
app.use(express.json());


// Import routes
const chatRoutes = require('./routes/chatRoutes');

// Use routes
app.use('/api/chat', chatRoutes);

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});