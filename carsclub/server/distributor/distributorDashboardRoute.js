// distributorDashboardRoute.js
const express = require('express');
const router = express.Router();
const distributorAuthentication = require("../middelware/distributorAuthentication");

router.get('/distributordashboard', distributorAuthentication, (req, res) => {
    console.log("kldsjflkjsd")
    res.send(req.rootDistributor);
});

module.exports = router;
