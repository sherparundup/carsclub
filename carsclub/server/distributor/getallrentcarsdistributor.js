const express = require('express');
const router = express.Router();
const distributorAuthentication = require("../middelware/distributorAuthentication");
const Rentcar = require('../models/rentcarSchema');

module.exports = router.post('/deleteRentCarFromDashboard', distributorAuthentication, async (req, res) => {
    try {
        // Check if the request is coming from an authenticated distributor
        if (!req.distributor) {
            return res.status(401).json({ error: "Unauthorized access" });
        }

        // Get the car ID from the request body
        const { carIdFromDashBoard } = req.body;

        // Find and delete the rent car by its ID
        const deletedCar = await Rentcar.findOneAndDelete({ _id: carIdFromDashBoard });
        
        if (!deletedCar) {
            return res.status(404).json({ error: "Car not found" });
        }
        
        res.status(200).json({ message: "Car deleted successfully" });
    } catch (error) {
        console.error("Error deleting car:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
