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
const corsOptions = {
    origin: 'https://66cc6cbe57638b3fd7a0e86a--payytmmkaroo.netlify.app', // Your deployed frontend URL
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed methods
    allowedHeaders: ['Content-Type', 'Authorization'] // Allowed headers
};

app.use(cors(corsOptions));

app.use(session({
    secret: process.env.SESSION_SECRET || 'AADIL@0902', // Use environment variable for secret, fallback to a default value
    resave: false, // Prevent resaving session if it wasn't modified
    saveUninitialized: true, // Save uninitialized sessions to the store
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URL, // Your MongoDB connection string
    }),
    cookie: { 
        secure: process.env.NODE_ENV === 'production', // Set secure flag for cookies in production
        sameSite: 'none', // Allow cross-origin cookie sending
        httpOnly: false, // Set to false for debugging; change to true in production for security
        maxAge: 24 * 60 * 60 * 1000 // Optional: Set cookie expiration time (1 day)
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
