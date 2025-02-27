const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const busRoutes = require("./src/routes/bus"); // Import bus routes
const authRoutes = require("./src/routes/auth");
const routeRoutes = require("./src/routes/route");
const adminRoutes = require("./src/routes/admin");
const bookingRoutes =  require("./src/routes/booking");
const searchRoutes = require("./src/routes/search");




dotenv.config();
const app = express();

// Middleware
app.use(express.json()); // Parse JSON request body

// Routes
app.use("/api/buses", busRoutes); // Mount bus routes
app.use("/api/auth", authRoutes); // Mount auth routes
app.use("/api/routes", routeRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/booking", bookingRoutes);
app.use("/api", searchRoutes);


// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("✅ MongoDB Connected"))
.catch(err => console.error("MongoDB connection error:", err));




const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
