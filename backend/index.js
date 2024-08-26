// Load environment variables
require('dotenv').config();

// Import dependencies
const express = require('express');
const cors = require('cors');
const rootRouter = require("./ROUTES/index");

// Initialize the Express app
const app = express();

// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS configuration
const corsOptions = {
    origin: 'https://66cc6cbe57638b3fd7a0e86a--payytmmkaroo.netlify.app', // Deployed frontend URL
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed methods
    allowedHeaders: ['Content-Type', 'Authorization'] // Allowed headers
};
app.use(cors(corsOptions));

// Mount the main router
app.use("/api/v1", rootRouter);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack); // Log the error stack
    res.status(500).send('Something went wrong!'); // Generic error message
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
