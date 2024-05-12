const express = require('express');
const router = express.Router();
const adminAuthentication = require("../middelware/adminAuthentication");

const Rentcar = require('../models/rentcarSchema');

module.exports = router.post('/deleteRentCarFromDashboard', adminAuthentication, async (req, res) => {
    try {
        const { carIdFromDashBoard } = req.body;
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
