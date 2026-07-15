const Portfolio = require("../models/Portfolio");

// @route  GET /api/portfolio
// @access Private
const getPortfolio = async (req, res) => {
  try {
    const stocks = await Portfolio.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(stocks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @route  POST /api/portfolio
// @access Private
const addStock = async (req, res) => {
  try {
    const { stockName, ticker, sector, quantity, buyPrice, currentPrice, purchaseDate } = req.body;

    if (!stockName || !ticker || !quantity || !buyPrice || !purchaseDate) {
      return res.status(400).json({ message: "Please fill in all required fields" });
    }

    const stock = await Portfolio.create({
      user: req.user._id,
      stockName,
      ticker,
      sector,
      quantity,
      buyPrice,
      currentPrice: currentPrice || buyPrice,
      purchaseDate,
    });

    res.status(201).json(stock);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @route  PUT /api/portfolio/:id
// @access Private
const updateStock = async (req, res) => {
  try {
    const stock = await Portfolio.findById(req.params.id);

    if (!stock) {
      return res.status(404).json({ message: "Stock not found" });
    }

    if (stock.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized to edit this stock" });
    }

    const updated = await Portfolio.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @route  DELETE /api/portfolio/:id
// @access Private
const deleteStock = async (req, res) => {
  try {
    const stock = await Portfolio.findById(req.params.id);

    if (!stock) {
      return res.status(404).json({ message: "Stock not found" });
    }

    if (stock.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized to delete this stock" });
    }

    await stock.deleteOne();

    res.json({ message: "Stock removed", id: req.params.id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getPortfolio, addStock, updateStock, deleteStock };
