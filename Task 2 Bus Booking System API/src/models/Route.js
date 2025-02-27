const mongoose = require("mongoose");

const routeSchema = new mongoose.Schema({
  source: { type: String, required: true },
  destination: { type: String, required: true },
  distance: { type: Number, required: true },
  estimatedTime: { type: String, required: true }
});

const Route = mongoose.models.Route || mongoose.model('Route', routeSchema);

module.exports = Route;
