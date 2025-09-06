const jwt = require("jsonwebtoken");
const db = require("../models/db"); // Optional if you want DB check

// ✅ Protect middleware with role-based access
const protect = (allowedRoles = []) => {
  return async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Not authorized, no token" });
    }

    const token = authHeader.split(" ")[1];

    try {
      // Verify JWT token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // ✅ Optional: Validate user existence in DB
      // const user = await db.User.findById(decoded.id);
      // if (!user) return res.status(401).json({ error: "User no longer exists" });

      req.user = decoded;

      // ✅ Role-based access check
      if (allowedRoles.length > 0 && !allowedRoles.includes(req.user.role)) {
        return res.status(403).json({ error: "Forbidden: Insufficient role" });
      }

      next();
    } catch (err) {
      return res.status(401).json({ error: "Invalid or expired token" });
    }
  };
};

module.exports = protect;
