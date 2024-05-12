// distributorAuthentication.js
const jwt = require('jsonwebtoken');
const Distributor = require('../models/distributerschema');

const distributorAuthentication = async (req, res, next) => {
    try {
        const token = req.cookies.jwtDistributor;
        if (!token) {
            throw new Error('Authentication failed');
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const distributor = await Distributor.findOne({ _id: decoded._id, 'tokens.token': token });
        if (!distributor) {
            throw new Error('Authentication failed');
        }
        req.rootDistributor = distributor;
        next();
    } catch (error) {
        res.status(401).json({ error: 'Authentication failed' });
    }
};

module.exports = distributorAuthentication;
