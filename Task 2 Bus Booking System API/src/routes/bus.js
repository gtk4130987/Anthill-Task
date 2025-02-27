const express = require("express");
const { addBus, updateBus } = require("../controllers/busController");  // Ensure correct import
const { authMiddleware, adminMiddleware } = require("../middleware/authMiddleware");

console.log("Bus Controller Imported:", { addBus, updateBus }); // Debugging

const router = express.Router();

// Add a new bus
router.post("/add", authMiddleware, adminMiddleware, addBus);

// Update a bus
router.put("/update/:id", authMiddleware, adminMiddleware, updateBus);

module.exports = router;
