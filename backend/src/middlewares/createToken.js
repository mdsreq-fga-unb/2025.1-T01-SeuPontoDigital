import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/env.js";

const createToken = (admin) => {
    try {
        const token = jwt.sign({ id: admin.id, email: admin.email }, JWT_SECRET, { expiresIn: "1d" });
        return token;
    }
    catch (err) {
        console.error("error in createToken middleware:", err);
        throw err;
    }
}
export default createToken;