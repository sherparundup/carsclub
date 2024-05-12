const express = require('express');
const router = express.Router();
const distributorAuthentication = require("../middelware/distributorAuthentication");
const Rentcarincomes = require('../models/rentCarIncomeSchema');

module.exports = router.get('/getrentcarincome', distributorAuthentication, async (req, res) => {
    try {
        // Check if the request is coming from an authenticated distributor
        if (!req.distributor) {
            return res.status(401).json({ error: "Unauthorized access" });
        }

        // Retrieve all rent car income data
        const allIncomes = await Rentcarincomes.find();

        // Send the rent car income data in the response
        res.status(200).json(allIncomes);
    } catch (error) {
        // Handle any errors that occur during the process
        console.error("Error retrieving rent car income:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
