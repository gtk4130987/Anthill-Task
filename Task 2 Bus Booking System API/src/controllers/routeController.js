const Route = require("../models/Route");

const addRoute = async (req, res) => {
  try {
    const { source, destination, distance, estimatedTime } = req.body;
    const newRoute = new Route({ source, destination, distance, estimatedTime });

    await newRoute.save();
    res.status(201).json({ message: "Route added successfully", route: newRoute });
  } catch (error) {
    res.status(500).json({ message: "Error adding route", error });
  }
};

const updateRoute = async (req, res) => {
  try {
    const updatedRoute = await Route.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedRoute) return res.status(404).json({ message: "Route not found" });

    res.json({ message: "Route updated successfully", route: updatedRoute });
  } catch (error) {
    res.status(500).json({ message: "Error updating route", error });
  }
};

module.exports = { addRoute, updateRoute };
