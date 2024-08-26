// captcha.js
const express = require('express');
const svgCaptcha = require('svg-captcha');
const router = express.Router();

// Route to generate CAPTCHA
router.get('/captcha', (req, res) => {
    try {
        console.log('CAPTCHA route accessed');
        
        const captcha = svgCaptcha.create({
            size: 6,
            ignoreChars: '0o1l',
            width: 100,
            height: 40,
            fontSize: 50,
            noise: 3,
            color: true
        });

        // Send CAPTCHA image and text to the client
        res.json({ captchaImage: captcha.data, captchaText: captcha.text });
    } catch (error) {
        console.error('Error generating CAPTCHA:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
