const express = require('express');
const svgCaptcha = require('svg-captcha');
const router = express.Router();

// Route to generate CAPTCHA
router.get('/captcha', (req, res) => {
    try {
        // Generate CAPTCHA
        console.log('CAPTCHA route accessed');

        const captcha = svgCaptcha.create({
            size: 6, // Number of characters
            ignoreChars: '0o1l', // Characters to ignore
            width: 100, // Width of the image
            height: 40, // Height of the image
            fontSize: 50, // Font size
            noise: 3, // Amount of noise
            color: true // Whether the text is colored
        });

        // Store the CAPTCHA text in the session
        req.session.captcha = captcha.text;
        console.log('Generated CAPTCHA:', req.session.captcha); // Debug log

        // Set the response type to SVG and send the CAPTCHA image
        res.type('svg');
        res.status(200).send(captcha.data);
    } catch (error) {
        console.error('Error generating CAPTCHA:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Middleware to ensure session is initialized
router.use((req, res, next) => {
    if (!req.session) {
        console.error('Session is not initialized');
        return res.status(500).json({ message: 'Session is not initialized' });
    }
    next();
});

module.exports = router;
