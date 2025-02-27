const Booking = require("../models/Booking");
const Bus = require("../models/bus");
const mongoose = require("mongoose");

const bookBus = async (req, res) => {
  try {
    const { busId, seatsBooked } = req.body;
    const userId = req.user._id;

    const bus = await Bus.findById(busId);
    if (!bus) return res.status(404).json({ message: "Bus not found!" });

    if (bus.availableSeats < seatsBooked) {
      return res.status(400).json({ message: "Not enough seats available!" });
    }

    const booking = new Booking({
      user: userId,
      bus: busId,
      seatsBooked,
      status: "confirmed",
    });

    bus.availableSeats -= seatsBooked; // Reduce seat availability
    await bus.save();
    await booking.save();

    res.status(201).json({ message: "Booking successful!", booking });
  } catch (error) {
    res.status(500).json({ message: "Booking failed!", error });
  }
};

const cancelBooking = async (req, res) => {
  try {
    const { id } = req.params; // Match parameter with the route
    const userId = req.user._id;

    // Validate if bookingId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid booking ID format!" });
    }

    const booking = await Booking.findById(id);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found!" });
    }

    // Check if the logged-in user is the owner of the booking
    if (booking.user.toString() !== userId.toString()) {
      return res.status(403).json({ message: "Unauthorized to cancel this booking!" });
    }

    // Find the bus associated with the booking
    const bus = await Bus.findById(booking.bus);
    if (!bus) {
      return res.status(404).json({ message: "Bus associated with this booking not found!" });
    }

    // Increase available seats since booking is cancelled
    bus.availableSeats += booking.seatsBooked;

    // Save the updated bus seat count
    await bus.save();

    // Delete the booking from the database
    await Booking.findByIdAndDelete(id);

    res.json({ message: "Booking cancelled successfully!" });
  } catch (error) {
    console.error("Error cancelling booking:", error);
    res.status(500).json({ message: "Cancellation failed!", error: error.message });
  }
};


module.exports = { bookBus, cancelBooking };
