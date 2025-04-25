import bcrypt from "bcrypt";
import { findOneAdminByEmail } from "../models/adminModel.js";

const comparePassword = async (password, password_hash) => {
    return await bcrypt.compare(password, password_hash);
}

const passwordToHash = async (password) => {
    try{
        const saltRounds = await bcrypt.genSalt(10);
        const password_hash = await bcrypt.hash(password, saltRounds);
        return password_hash;
    }   
    catch(err){
        throw err;
    }
}

const authenticateAdmin = async (email, password) => {
    const admin = await findOneAdminByEmail(email);
    if(!admin) {
        throw new Error("admin not found");
    }
    const isValid = await comparePassword(password, admin.password_hash);
    if(!isValid){
        throw new Error("wrong password");
    }
    return admin;
}

export { passwordToHash, authenticateAdmin };