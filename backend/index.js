// Load environment variables
require('dotenv').config();

// Import dependencies
const express = require('express');
const cors = require('cors');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const rootRouter = require("./ROUTES/index");

// Initialize the Express app
const app = express();

// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS configuration
const corsOptions = {
    origin: 'https://66ccda677079100008701e26--payytmmkaroo.netlify.app', // Deployed frontend URL
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed methods
    allowedHeaders: ['Content-Type', 'Authorization'] // Allowed headers
};

app.use(cors(corsOptions));
// Session management
app.use(session({
    secret: process.env.SESSION_SECRET || 'AADIL@0902', // Use environment variable for secret
    resave: false, // Avoid resaving session if not modified
    saveUninitialized: true, // Save new sessions that are not initialized
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URL, // MongoDB connection string
    }),
    cookie: {
        secure: process.env.NODE_ENV === 'production', // Set secure cookies in production
        sameSite: 'none', // Allow cross-site cookies
        httpOnly: false, // Set to false for debugging; set to true in production for security
        maxAge: 1000 * 60 * 60 * 24 // Set cookie expiration (1 day)
    },
}));

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
