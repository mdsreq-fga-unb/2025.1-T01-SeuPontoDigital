import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/env.js";

const verifyToken = (req, res, next) => {

    const token = req.headers.authorization;

    if(!token){
        return res.status(403).json({msg: "access not authorized"});
    }

    try{
        const decodedToken = jwt.verify(token.replace("Bearer ", ""), JWT_SECRET);
        console.log(decodedToken)
    }
    catch(err){
        return res.status(403).json({msg: "invalid token"})
    }
}