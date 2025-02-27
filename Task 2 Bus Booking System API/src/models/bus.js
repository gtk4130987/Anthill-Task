const mongoose = require("mongoose");

const busSchema = new mongoose.Schema({
  busName: { type: String, required: true },
  busNumber: { type: String, required: true, unique: true },
  seats: { type: Number, required: true },
  availableSeats: { type: Number, required: true },
  route: { type: mongoose.Schema.Types.ObjectId, ref: "Route", required: true },
  departureTime: { type: String, required: true },
  arrivalTime: { type: String, required: true },
  ticketPrice: { type: Number, required: true },
});

module.exports = mongoose.model("Bus", busSchema);
