const express = require("express");
const { searchBuses } = require("../controllers/searchController");
const { authMiddleware } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/search", authMiddleware, searchBuses);

module.exports = router;
