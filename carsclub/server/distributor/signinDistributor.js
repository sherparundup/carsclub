const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const bcrypt = require('bcryptjs');

const Distributor = require('../models/distributerschema'); // Assuming you have a Distributor model

// Distributor Signin
router.post('/signinDistributor', async (req, res) => {
  try {
    let token;
    const { distributorName, distributorPassword } = req.body;

    if (!distributorName || !distributorPassword) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const distributorSignin = await Distributor.findOne({ distributorName });

    if (distributorSignin) {
      const isSame = await bcrypt.compare(distributorPassword,distributorSignin.distributorPassword);
      
      console.log("Is same: ",isSame)

      
      if (!isSame) {
        console.log("Is sameeeeeeeeeeeeeeeeeeeeeeeeee: ",isSame)
        return res.status(400).json({ error: 'Invalid credentials' });

      }

      token = await distributorSignin.generateAuthToken();

      res.cookie('jwtDistributor', token, {
        expires: new Date(Date.now() + 25892000000),
        httpOnly: true
      });


      return res.json({ message: 'User signed in successfully' });
    } else {
      return res.status(400).json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
