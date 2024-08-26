require('dotenv').config();
const express = require('express');
const cors = require('cors');
const session = require('express-session');
const rootRouter = require("./ROUTES/index");
const MongoStore = require('connect-mongo');

const app = express();

// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configure CORS
app.use(cors({
    origin: 'https://66cc6cbe57638b3fd7a0e86a--payytmmkaroo.netlify.app', // Your deployed frontend URL
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
}));

// Set up session management
app.use(session({
    secret: 'AADIL@0902', // Use environment variable for secret
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URL, // Your MongoDB connection string
    }),
    cookie: { 
        secure: process.env.NODE_ENV === 'production', // Set secure based on environment
        sameSite: 'none', 
        httpOnly: true, // Prevent JavaScript from accessing the cookie
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
