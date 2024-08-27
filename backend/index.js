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
const allowedOrigins = [
    'https://payytmmkaroo.netlify.app', 
    'https://66ccda677079100008701e26--payytmmkaroo.netlify.app',
    // Include your current origin here
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
app.use(session({
    secret: process.env.SESSION_SECRET || 'AADIL@0902', // Use environment variable for secret
    resave: false, // Avoid resaving session if not modified
    saveUninitialized:false, // Do not save new sessions that are not initialized
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URL, // MongoDB connection string
    }),
    cookie: {
        secure: process.env.NODE_ENV === 'production', // Set secure cookies in production
        sameSite: 'none', // Allow cross-site cookies
        httpOnly: false, // Security: prevent access to cookie from client-side scripts
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