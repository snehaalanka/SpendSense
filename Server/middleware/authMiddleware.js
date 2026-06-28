const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
    let token;

    // Check if token exists in Authorization header
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        try {
            // Extract token
            token = req.headers.authorization.split(" ")[1];

            // Verify token
            const decoded = jwt.verify(
                token,
                process.env.JWT_SECRET
            );

            // Find user by ID and attach to request
            req.user = await User.findById(decoded.id).select("-password");

            // Continue to the next middleware/controller
            next();

        } catch (error) {
            console.error(error);

            return res.status(401).json({
                message: "Not Authorized, Token Failed",
            });
        }
    }

    // No token provided
    if (!token) {
        return res.status(401).json({
            message: "Not Authorized, No Token",
        });
    }
};

module.exports = { protect };