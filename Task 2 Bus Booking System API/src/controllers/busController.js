const Bus = require("../models/bus");
const Route = require("../models/Route");

const addBus = async (req, res) => {
  try {
    const { busName, busNumber, seats, availableSeats, routeId, departureTime, arrivalTime, ticketPrice } = req.body;

    const route = await Route.findById(routeId);
    if (!route) return res.status(404).json({ message: "Route not found" });

    const newBus = new Bus({ busName, busNumber, seats, availableSeats, route: routeId, departureTime, arrivalTime, ticketPrice });
    await newBus.save();

    res.status(201).json({ message: "Bus added successfully", bus: newBus });
  } catch (error) {
    res.status(500).json({ message: "Error adding bus", error });
  }
};

const updateBus = async (req, res) => {
  try {
    const { routeId } = req.body;
    if (routeId) {
      const route = await Route.findById(routeId);
      if (!route) return res.status(404).json({ message: "Route not found" });
    }

    const updatedBus = await Bus.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedBus) return res.status(404).json({ message: "Bus not found" });

    res.json({ message: "Bus updated successfully", bus: updatedBus });
  } catch (error) {
    res.status(500).json({ message: "Error updating bus", error });
  }
};

module.exports = { addBus, updateBus };
