const express = require("express");
const { addRoute, updateRoute } = require("../controllers/routeController");
const { authMiddleware } = require("../middleware/authMiddleware"); // ✅ Corrected

const router = express.Router();

router.post("/add", authMiddleware, addRoute);
router.put("/update/:id", authMiddleware, updateRoute);

module.exports = router;
