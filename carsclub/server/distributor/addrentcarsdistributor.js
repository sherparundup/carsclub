const express = require('express');
const router = express.Router();
const distributorAuthentication = require("../middelware/distributorAuthentication");
const Rentcar = require('../models/rentcarSchema');
const multer = require("multer");

const upload = multer({ dest: 'uploads/' });

router.post('/addrentcars', distributorAuthentication, upload.single("myrentfile"), async (req, res) => {
    try {
        // Check if the request is coming from an authenticated distributor
        if (!req.distributor) {
            return res.status(401).json({ error: "Unauthorized access" });
        }
        
        // Your logic to add rent cars for distributors
        const { brand, model, year, color, seats, price, rent } = req.body;
        const newRentCar = new Rentcar({
            brand,
            model,
            year,
            color,
            seats,
            price,
            rent,
            fileName: req.file.originalname,
            filePath: req.file.path,
            fileType: req.file.mimetype,
            fileSize: req.file.size
        });
        await newRentCar.save();

        res.status(201).json({ message: "Rent car added successfully" });
    } catch (error) {
        console.error("Error adding rent car:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;
