const express = require('express');
const router = express.Router();
const bcrypt = require("bcryptjs");

const Admin = require('../models/adminSchema');

// Admin Registration 
router.post('/signupAdmin', async (req, res) => {
    const { adminName, adminPhone, adminEmail, adminPassword, adminCPassword } = req.body;

    if (!adminName || !adminPhone || !adminEmail || !adminPassword || !adminCPassword) {
        return res.status(422).json({ error: "Please fill the form properly" });
    }

    try {
        const adminExist = await Admin.findOne({ adminEmail: adminEmail });

        if (adminExist) {
            return res.status(422).json({ error: "Admin already exists" });
        } else if (adminPassword !== adminCPassword) {
            return res.status(422).json({ error: "Passwords do not match" });
        } else {
            const passwordHash = await bcrypt.hash(adminPassword,10)
            const admin = new Admin({
                adminName,
                phone: adminPhone,
                email: adminEmail,
                adminPassword: passwordHash,
                cPassword: adminCPassword
                
            });

            await admin.save();

            res.status(201).json({ message: "Admin registered successfully" });
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;
