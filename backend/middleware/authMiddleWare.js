const jwt = require("jsonwebtoken");
const User = require("../models/userModel.js"); // Make sure this file exists!

const protect = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;

        if (!token) {
            return res.status(401).json({ message: "Not authorized, no token" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.userId).select("-password");

        next();
    } catch (error) {
        res.status(401).json({ message: "Not authorized, token failed" });
    }
};

module.exports = protect;
