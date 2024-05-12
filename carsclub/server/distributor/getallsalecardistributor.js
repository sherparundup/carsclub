// distributorSaleCarsRoute.js
const express = require('express');
const router = express.Router();
const distributorAuthentication = require("../middelware/distributorAuthentication");
const Salecar = require('../models/salecarSchema');

router.get('/getAvailableSaleCars', distributorAuthentication, async (req, res) => {
    try {
        const allSaleCars = await Salecar.find();
        res.status(200).send(allSaleCars);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

module.exports = router;
