const express = require("express");
const router = express.Router();
const User = require("../models/user-model");
const bcrypt = require("bcrypt");


router.post("/signup", async (req, res) => {
    const { fullName, email, phone, password, role } = req.body;

    try {

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            fullName,
            email,
            phone,
            password: hashedPassword,
            role: role || 'user',  
        });

        await user.save();

        res.status(201).json({ message: "User created successfully" });
    } catch (err) {
        console.error("Signup Error:", err);
        res.status(500).json({ message: "Server error" });
    }
});


router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

      
        const userResponse = {
            id: user._id,
            fullName: user.fullName,
            email: user.email,
            role: user.role,  
        };

        res.status(200).json({
            message: "Login successful",
            user: userResponse,
        });
    } catch (err) {
        console.error("Login Error:", err);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;
