const Transaction = require("../models/Transaction");

// @route  GET /api/transactions
// @access Private
const getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({ user: req.user._id }).sort({ date: -1 });
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @route  POST /api/transactions
// @access Private
const addTransaction = async (req, res) => {
  try {
    const { stockName, ticker, type, quantity, price, date } = req.body;

    if (!stockName || !ticker || !type || !quantity || !price) {
      return res.status(400).json({ message: "Please fill in all required fields" });
    }

    const transaction = await Transaction.create({
      user: req.user._id,
      stockName,
      ticker,
      type,
      quantity,
      price,
      date: date || Date.now(),
    });

    res.status(201).json(transaction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getTransactions, addTransaction };
