import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/env.js";

const authVerifyToken = (req, res, next) => {
    try {
        const token = req.headers['authorization'].replace("Bearer ", "");
        if (!token) {
            return res.status(403).json({ error: "token is required" });
        }
        jwt.verify(token, JWT_SECRET, (err, decodedUser) => {

            if (err) {
                return res.status(401).json({ error: "invalid or expired token" });
            }
            req.id = decodedUser.id;
            next();
        })
    }
    catch (err) {
        console.error("error in authVerifyToken middleware:", err);
        res.status(500).json({ error: "internal server error" });
    }
}

export default authVerifyToken;