// backend/routes/account.js
const express = require('express');
const { authMiddleware } = require('../middleware');
const { Account } = require("../db");
const { User } = require("../db");
const {Transaction} = require("../db")

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

// router.post("/transactions", authMiddleware, async (req, res) => {
//     try {
//         const { userId, type, name, date, amount, category, status } = req.body;

//         // Validate the incoming data (if necessary)
//         if (!userId || !type || !name || !date || !amount || !category || !status) {
//             return res.status(400).json({ message: 'Missing required fields' });
//         }

//         const transaction = new Transaction({
//             userId,  // Reference to the user
//             type,
//             name,
//             date,
//             amount,
//             category,
//             status
//         });
        
//         await transaction.save();
//         res.status(201).json(transaction);
//     } catch (error) {
//         console.error("Error saving transaction:", error);
//         res.status(400).json({ message: error.message });
//     }
// });

router.get("/transaction",authMiddleware, async (req, res) => {
    try {
        // You can add filtering by user if needed (e.g., req.user._id after authentication)
        const transactions = await Transaction.find().sort({ date: -1 });
        res.json(transactions);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
});
router.post("/transfer", authMiddleware, async (req, res) => {
    const { amount, to, pin } = req.body;
  
    try {
      // Fetch the sender's account
      const senderAccount = await Account.findOne({ userId: req.userId });
      if (!senderAccount || senderAccount.balance < amount) {
        return res.status(400).json({
          message: "Insufficient balance"
        });
      }
  
      // Fetch the recipient's account
      const recipientAccount = await Account.findOne({ userId: to });
      if (!recipientAccount) {
        return res.status(400).json({
          message: "Invalid account"
        });
      }
  
      // Fetch user details to validate PIN (sender)
      const sender = await User.findOne({ _id: req.userId });
      if (!sender || sender.pin !== pin) {
        return res.status(400).json({
          message: "Invalid PIN"
        });
      }
  
      // Fetch recipient's details to get their name
      const recipient = await User.findOne({ _id: to });
      if (!recipient) {
        return res.status(400).json({
          message: "Recipient not found"
        });
      }
  
      // Perform the transfer: update sender's and recipient's balances
      await Account.updateOne({ userId: req.userId }, { $inc: { balance: -amount } });
      await Account.updateOne({ userId: to }, { $inc: { balance: amount } });
  
      // Create a transaction record that includes the recipient's name
      const transaction = new Transaction({
        userId: req.userId, // sender's user ID from the token
        type: "debit",      // debit since money is leaving the sender's account
        // Use the recipient's name from the User model:
        name: `Transfer to ${recipient.firstName} `,
        date: new Date(),   // current date/time
        amount: amount,     // actual amount transferred
        category: "Transfer",
        status: "completed"
      });
      await transaction.save();
  
      res.json({
        message: "Transfer successful and transaction recorded"
      });
    } catch (error) {
      console.error('Transaction error:', error);
      res.status(500).json({
        message: "An error occurred during the transfer"
      });
    }
  });
  

module.exports = router;