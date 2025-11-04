const jwt = require("jsonwebtoken");

// This should match the same secret used when signing tokens at login (this is from your .env file)
const SECRET_KEY = process.env.JWT_SECRET || "superSecret123";

const verifyToken = (req, res, next) => {
  try {
    // Expect token in request header (Authorization: Bearer <token>)
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ message: "[VERIFY TOKEN]: No token provided." });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, SECRET_KEY);

    // Attach user data (like id or email) to req.user
    req.user = decoded;
    next();
  } catch (err) {
    console.error("[VERIFY TOKEN]: Invalid token!");
    res
      .status(403)
      .json({ message: "[VERIFY TOKEN]: Invalid or expired token." });
  }
};

module.exports = verifyToken;
