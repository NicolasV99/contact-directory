const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    let token = req.headers.authorization?.split(" ")[1];

    // Intentar obtener el token desde las cookies si no está en el header
    if (!token && req.cookies) {
        token = req.cookies.token;
    }

    if (!token) {
        return res.status(401).json({ message: "Access denied. Not authenticated." });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.user;
        next();
    } catch (error) {
        return res.status(403).json({ message: "Invalid or expired token." });
    }
};

module.exports = authMiddleware;
