import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/env.js";

const validateTokenJWT = (req, res, next) => {
    try {
        const token = req.headers['authorization'].replace("Bearer ", "");
        if (!token) {
            return res.status(403).json({ message: "token is required" });
        }
        
        jwt.verify(token, JWT_SECRET, (err, decodedUser) => {

            if (err) return res.status(401).json({ message: "invalid or expired token" });
                
            req.id = decodedUser.id;
            req.email = decodedUser.email
            next();
        })
    }
    catch (err) {
        return res.status(500).json({ message: "internal server error" });
    }
}

export default validateTokenJWT;