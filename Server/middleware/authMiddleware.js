const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        try {
            token = req.headers.authorization.split(" ")[1];

            const decoded = jwt.verify(
                token,
                process.env.JWT_SECRET
            );

            req.user = await User.findById(decoded.id).select("-password");

            if (!req.user) {
                return res.status(401).json({
                    message: "Not Authorized, User Not Found",
                });
            }

            next();

        } catch (error) {
            console.error(error);

            return res.status(401).json({
                message: "Not Authorized, Token Failed",
            });
        }
    }

    if (!token) {
        return res.status(401).json({
            message: "Not Authorized, No Token",
        });
    }
};

module.exports = { protect };