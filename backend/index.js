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
const allowedOrigins = [
    'https://payytmmkaroo.netlify.app', 
    'https://66ccda677079100008701e26--payytmmkaroo.netlify.app',
    'http://localhost:5173/',// Include your current origin here
];

const corsOptions = {
    origin: function (origin, callback) {
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));
// Session management

// Port configuration
const PORT = process.env.PORT || 3000;

// Debugging middleware to log session details
app.use((req, res, next) => {
    console.log('Session details:', req.session); // Log session details for debugging
    next();
});

// Mount the main router
app.use("/api/v1", rootRouter);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack); // Log the error stack
    res.status(500).send('Something went wrong!'); // Generic error message
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});