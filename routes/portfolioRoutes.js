const express = require("express");
const router = express.Router();
const { getPortfolio, addStock, updateStock, deleteStock } = require("../controllers/portfolioController");
const { protect } = require("../middleware/authMiddleware");

router.route("/").get(protect, getPortfolio).post(protect, addStock);
router.route("/:id").put(protect, updateStock).delete(protect, deleteStock);

module.exports = router;
