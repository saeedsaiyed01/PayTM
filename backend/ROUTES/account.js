// backend/routes/account.js
const express = require('express');
const { authMiddleware } = require('../middleware');
const { Account } = require("../db");
const { default: mongoose } = require('mongoose');

const router = express.Router();

router.get("/balance", authMiddleware, async (req, res) => {
    const account = await Account.findOne({
        userId: req.userId
    });

    res.json({
        balance: account.balance
    })
});

router.post("/transfer", authMiddleware, async (req, res) => {
    const { amount, to, pin } = req.body;

    try {
        // Fetch the user's account
        const account = await Account.findOne({ userId: req.userId });
        if (!account || account.balance < amount) {
            return res.status(400).json({
                message: "Insufficient balance"
            });
        }

        // Fetch the recipient's account
        const toAccount = await Account.findOne({ userId: to });
        if (!toAccount) {
            return res.status(400).json({
                message: "Invalid account"
            });
        }

        // Validate the PIN
        const isPinValid = await bcrypt.compare(pin, account.pin); // Adjust according to your PIN storage and hashing logic
        if (!isPinValid) {
            return res.status(400).json({
                message: "Invalid PIN"
            });
        }

        // Perform the transfer
        await Account.updateOne({ userId: req.userId }, { $inc: { balance: -amount } });
        await Account.updateOne({ userId: to }, { $inc: { balance: amount } });

        res.json({
            message: "Transfer successful"
        });
    } catch (error) {
        console.error('Transaction error:', error);
        res.status(500).json({
            message: "An error occurred during the transfer"
        });
    }
});

module.exports = router;