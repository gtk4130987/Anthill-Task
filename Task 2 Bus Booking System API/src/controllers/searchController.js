const Bus = require("../models/bus");
const Route = require("../models/Route");

const searchBuses = async (req, res) => {
  try {
    const { startLocation, endLocation } = req.query;

    // Find the route that matches start and end locations
    const route = await Route.findOne({ source: startLocation, destination: endLocation });

    if (!route) {
      return res.status(404).json({ message: "No route found for the given locations!" });
    }

    // Find buses that match the route ID
    const buses = await Bus.find({ route: route._id }).populate("route");

    if (!buses.length) {
      return res.status(404).json({ message: "No buses found for the given route!" });
    }

    res.json({ message: "Available buses found", buses });
  } catch (error) {
    console.error("Error searching for buses:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { searchBuses };
