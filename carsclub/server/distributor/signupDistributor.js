const express = require('express');
const router = express.Router();
const bcrypt = require("bcryptjs");

const Distributor = require('../models/distributerschema');

// Distributor Registration 
router.post('/signupDistributor', async (req, res) => {
    const { distributorName, distributorPhone, distributorEmail, distributorPassword, distributorCPassword } = req.body;

    if (!distributorName || !distributorPhone || !distributorEmail || !distributorPassword || !distributorCPassword) {
        return res.status(422).json({ error: "Please fill the form properly" });
    }

    try {
        const distributorExist = await Distributor.findOne({ distributorEmail: distributorEmail });

        if (distributorExist) {
            return res.status(422).json({ error: "Distributor already exists" });
        } else if (distributorPassword !== distributorCPassword) {
            return res.status(422).json({ error: "Passwords do not match" });
        } else {
            console.log("Distributor Password: ",distributorPassword);
            const distributor = new Distributor({
                distributorName,
                phone: distributorPhone,
                email: distributorEmail,
                distributorPassword,
                cPassword: distributorCPassword
            });

            await distributor.save();

            res.status(201).json({ message: "Distributor registered successfully" });
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;
