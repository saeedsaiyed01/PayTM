const express = require('express');
const svgCaptcha = require('svg-captcha');
const router = express.Router();

// Middleware to ensure the session is initialized
router.use((req, res, next) => {
    if (!req.session) {
        console.error('Session is not initialized');
        return res.status(500).json({ message: 'Session is not initialized' });
    }
    next();
});

// Route to generate CAPTCHA
router.get('/captcha', (req, res) => {
    try {
        console.log('CAPTCHA route accessed');

        // Generate CAPTCHA
        const captcha = svgCaptcha.create({
            size: 6, // Number of characters
            ignoreChars: '0o1l', // Characters to ignore
            width: 100, // Width of the image
            height: 40, // Height of the image
            fontSize: 50, // Font size
            noise: 3, // Amount of noise
            color: true, // Whether the text is colored
        });

        // Store the CAPTCHA text in the session
        req.session.captcha = captcha.text;
        console.log('Generated CAPTCHA:', req.session.captcha); // Debug log

        // Log the entire session for debugging (optional)
        console.log('Session after setting CAPTCHA:', req.session);

        // Set the response type to SVG and send the CAPTCHA image
        res.type('svg');
        res.status(200).send(captcha.data);
    } catch (error) {
        console.error('Error generating CAPTCHA:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Route to verify CAPTCHA
router.post('/verify-captcha', (req, res) => {
    const userCaptcha = req.body.captcha ? req.body.captcha.trim() : ''; // User input CAPTCHA
    const sessionCaptcha = req.session.captcha; // Stored CAPTCHA in session

    console.log('User entered CAPTCHA:', userCaptcha);
    console.log('Session stored CAPTCHA:', sessionCaptcha);

    // Check if the CAPTCHA matches
    if (!sessionCaptcha || userCaptcha !== sessionCaptcha) {
        return res.status(400).json({ message: 'CAPTCHA is incorrect or session expired. Please try again.' });
    }

    // Clear the CAPTCHA from the session after successful verification
    delete req.session.captcha;

    res.status(200).json({ message: 'CAPTCHA verified successfully!' });
});

module.exports = router;
