const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect MongoDB
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.error("MongoDB connection error:", err));

// Import and use chat route
const chatRoutes = require('./routes/chat');
app.use('/api/chat', chatRoutes);

// Default route for testing
app.get('/', (req, res) => {
    res.send('Welcome to the AI Chat API! Use /api/chat to chat with GPT.');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
