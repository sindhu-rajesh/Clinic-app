const User = require("../models/userModel.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const generateToken = require("../utils/generateToken.js");


// Register User
const registerUser = async (req, res) => {
    try {
        const { name, email, password, phone, role } = req.body;
        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({ message: "User already exists" });
        }

        const user = await User.create({ name, email, password, phone, role });

        if (user) {
            generateToken(res, user._id);
            res.status(201).json({ message: "User registered successfully" });
        } else {
            res.status(400).json({ message: "Invalid user data" });
        }
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

// Login User
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (user && (await bcrypt.compare(password, user.password))) {
            const token = jwt.sign(
                { id: user._id, role: user.role },
                process.env.JWT_SECRET,
                { expiresIn: "1h" }
            );

            res.status(200).json({
                token,
                user: { id: user._id, name: user.name, email: user.email, phone: user.phone, role: user.role }
            });
        } else {
            res.status(401).json({ message: "Invalid email or password" });
        }
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

// Logout User
const logoutUser = (req, res) => {
    res.cookie("jwt", "", { httpOnly: true, expires: new Date(0) });
    res.json({ message: "Logged out successfully" });
};

// ✅ Export as CommonJS
module.exports = { registerUser, loginUser, logoutUser };
