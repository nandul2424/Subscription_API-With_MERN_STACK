import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../Config/env.js";
import User from "../Models/user.model.js";

const authorize = async (req, res, next) => {
    try {
        // 1️⃣ Extract token from headers
        let token;
        if (req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
            token = req.headers.authorization.split(" ")[1];
        }

        // 2️⃣ Check if token exists
        if (!token) {
            return res.status(401).json({ message: "Unauthorized: Token not found" });
        }

        // 3️⃣ Verify token
        const decoded = jwt.verify(token, JWT_SECRET);

        // 4️⃣ Find the user by decoded ID (use "id" if that's how you sign the token)
        const user = await User.findById(decoded.userId || decoded.id).select("-password");

        if (!user) {
            return res.status(401).json({ message: "Unauthorized: User not found" });
        }

        // 5️⃣ Attach user to request
        req.user = user;

        // ✅ Proceed to next middleware or route
        next();

    } catch (err) {
        console.error("Authorization Error:", err.message);

        // handle specific JWT errors
        if (err.name === "TokenExpiredError") {
            return res.status(401).json({ message: "Token expired. Please log in again." });
        } else if (err.name === "JsonWebTokenError") {
            return res.status(401).json({ message: "Invalid token." });
        }

        res.status(401).json({ message: "Unauthorized", error: err.message });
    }
};

export default authorize;
