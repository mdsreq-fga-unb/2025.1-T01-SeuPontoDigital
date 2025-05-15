import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/env.js";

const createTokenMobile = (employee) => {
    try {
        const token = jwt.sign({ id: employee.id, email: employee.email }, JWT_SECRET, { expiresIn: "1d" });
        return token;
    }
    catch (err) {
        console.error("error in createToken middleware:", err);
        throw err;
    }
}
export default createTokenMobile;