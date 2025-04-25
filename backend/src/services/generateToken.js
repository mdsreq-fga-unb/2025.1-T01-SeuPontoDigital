import jwt from "jsonwebtoken";
import {JWT_SECRET} from "../config/env.js";

const generateToken = (admin) => {
    const token = jwt.sign({id:admin.id}, JWT_SECRET, {expiresIn:"1d"});
    return token;
}

export default generateToken;
