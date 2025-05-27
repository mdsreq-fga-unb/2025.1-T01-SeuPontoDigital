import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/env.js";

const createToken = (admin) => {
    try {
        const token = jwt.sign({ id: admin.id, email: admin.email }, JWT_SECRET, { expiresIn: "7d" });
        return token;
    }
    catch (err) {
        console.error("error generating token");
        throw err;
    }
}
export default createToken;