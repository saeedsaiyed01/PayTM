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
    origin: 'http://localhost:5173', // Your frontend URL
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
}));

// Configure session middleware
app.use(session({
    secret: 'AADIL@0902',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // Set to true for production and ensure HTTPS
}));
const PORT = process.env.PORT || 3000;
// Log session details (for debugging, can be removed later)
app.use((req, res, next) => {
    console.log('Session details:', req.session);
    next();
});

// Mount the main router
app.use("/api/v1", rootRouter);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:3000`);
});
