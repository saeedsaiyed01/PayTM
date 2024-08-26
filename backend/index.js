require('dotenv').config();
const express = require('express');
const cors = require('cors');
const session = require('express-session');
const rootRouter = require("./ROUTES/index");

const app = express();

// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configure CORS
app.use(cors({
    origin: 'https://66cc401bb0197c0008615e0d--payytmmkaroo.netlify.app/', // Your deployed frontend URL
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
}));

// Configure session middleware
app.use(session({
    secret: process.env.SESSION_SECRET || 'AADIL@0902', // Use environment variable for secret
    resave: false,
    saveUninitialized: true,
    cookie: { 
        secure: process.env.NODE_ENV === 'production', // Set secure based on environment
        sameSite: 'none' 
    },
}));

const PORT = process.env.PORT || 3000;

// Log session details (for debugging, can be removed later)
app.use((req, res, next) => {
    console.log('Session details:', req.session); // Debugging line, remove in production
    next();
});

// Mount the main router
app.use("/api/v1", rootRouter);

// Error handling middleware (optional)
app.use((err, req, res, next) => {
    console.error(err.stack); // Log the error stack
    res.status(500).send('Something went wrong!'); // Generic error message
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
