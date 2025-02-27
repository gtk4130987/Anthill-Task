const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");
require("dotenv").config();
const busRoutes = require("./routes/bus");
const authRoutes = require("./routes/auth");
const routeRoutes = require("./routes/route");
const searchRoutes = require("./routes/search");
const bookingRoutes = require("./routes/booking");
const adminRoutes = require("./routes/admin");

const app = express();
connectDB();

app.use(cors());
app.use(bodyParser.json());

app.use("/api/auth", authRoutes);
app.use("/api/bus", busRoutes);
app.use("/api/route", routeRoutes);
app.use("/api/search", searchRoutes);
app.use("/api/booking", bookingRoutes);
app.use("/api/admin", adminRoutes);

module.exports = app;
