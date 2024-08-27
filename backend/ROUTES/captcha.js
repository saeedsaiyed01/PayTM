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
            size: 6,
            ignoreChars: '0o1l',
            width: 100,
            height: 40,
            fontSize: 50,
            noise: 3,
            color: true,
        });

        // Store the CAPTCHA text in the session
        req.session.captcha = captcha.text;
        console.log('Generated CAPTCHA:', req.session.captcha);

        // Log the entire session for debugging
        console.log('Session after setting CAPTCHA:', req.session);

        res.type('svg');
        res.status(200).send(captcha.data);
    } catch (error) {
        console.error('Error generating CAPTCHA:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
// Route to verify CAPTCHA
router.post('/verify-captcha', (req, res) => {
    const userCaptcha = req.body.captcha ? req.body.captcha.trim() : '';
    const sessionCaptcha = req.session.captcha;

    console.log('User entered CAPTCHA:', userCaptcha);
    console.log('Session stored CAPTCHA:', sessionCaptcha);

    // Ensure the session is initialized and CAPTCHA exists
    if (!sessionCaptcha) {
        console.error('CAPTCHA is undefined in session');
        return res.status(400).json({ message: 'CAPTCHA session has expired or is not set' });
    }

    // Check if the CAPTCHA matches
    if (userCaptcha !== sessionCaptcha) {
        return res.status(400).json({ message: 'CAPTCHA is incorrect. Please try again.' });
    }

    // Clear the CAPTCHA from the session after successful verification
    delete req.session.captcha;

    res.status(200).json({ message: 'CAPTCHA verified successfully!' });
});

module.exports = router;
