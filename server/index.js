const express = require('express');
const cors = require('cors');
const path = require('path');
const connectToMongo = require('./db');

const app = express();

const PORT = process.env.PORT || 8181;

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
connectToMongo();

// API routes
app.use('/api/auth', require('./routes/auth'));

// Serve the React production build
const buildPath = path.join(__dirname, 'build');
app.use(express.static(buildPath));

// React Router SPA fallback
app.get('*', (req, res) => {
    res.sendFile(path.join(buildPath, 'index.html'));
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});
