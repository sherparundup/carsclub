const express = require('express');
const router = express.Router();
const distributorAuthentication = require("../middelware/distributorAuthentication");

module.exports = router.get('/distributorSignout', distributorAuthentication, (req, res) => {
    console.log('User log out');
    res.clearCookie('jwtDistributor', { path: '/' });
    res.status(200).send("Distributor Logout");
});
