const express = require("express");
const { getAllUsers, deleteUser } = require("../controllers/adminController");
const { authMiddleware, adminMiddleware } = require("../middleware/authMiddleware");

const router = express.Router();

// Admin-only route: Get all users
router.get("/users", authMiddleware, adminMiddleware, getAllUsers);

// Admin-only route: Delete a user
router.delete("/delete_user/:id", authMiddleware, adminMiddleware, deleteUser);

module.exports = router;
