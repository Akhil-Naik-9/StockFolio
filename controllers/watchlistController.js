const Watchlist = require("../models/Watchlist");

// @route  GET /api/watchlist
// @access Private
const getWatchlist = async (req, res) => {
  try {
    const items = await Watchlist.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @route  POST /api/watchlist
// @access Private
const addToWatchlist = async (req, res) => {
  try {
    const { companyName, ticker, currentPrice, dailyChangePercent } = req.body;

    if (!companyName || !ticker || !currentPrice) {
      return res.status(400).json({ message: "Please fill in all required fields" });
    }

    const exists = await Watchlist.findOne({ user: req.user._id, ticker: ticker.toUpperCase() });
    if (exists) {
      return res.status(400).json({ message: "This stock is already in your watchlist" });
    }

    const item = await Watchlist.create({
      user: req.user._id,
      companyName,
      ticker,
      currentPrice,
      dailyChangePercent: dailyChangePercent || 0,
    });

    res.status(201).json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @route  DELETE /api/watchlist/:id
// @access Private
const removeFromWatchlist = async (req, res) => {
  try {
    const item = await Watchlist.findById(req.params.id);

    if (!item) {
      return res.status(404).json({ message: "Watchlist item not found" });
    }

    if (item.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized to remove this item" });
    }

    await item.deleteOne();

    res.json({ message: "Removed from watchlist", id: req.params.id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getWatchlist, addToWatchlist, removeFromWatchlist };
