const express = require("express");
const { bookBus, cancelBooking } = require("../controllers/bookingController");
const { authMiddleware } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/book", authMiddleware, bookBus);
router.delete("/cancel/:id", authMiddleware, cancelBooking);

module.exports = router;
