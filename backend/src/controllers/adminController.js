import { registerAdminOnDB, findOneAdminByEmail } from "../models/adminModel.js";
import bcrypt from "bcrypt";

// ==================================== PASSWORDS ====================================

const comparePassword = async (password, password_hash) => {
    return await bcrypt.compare(password, password_hash);
}


const setPasswordToHashPassword = async (password) => {
    try{
        const saltRounds = await bcrypt.genSalt(10);
        const password_hash = await bcrypt.hash(password, saltRounds);
        return password_hash;
    }   
    catch(err){
        throw err;
    }
}

// ==================================== FETCH ADMIN ====================================

const fetchAdmin = async (email) => {
    const admin = await findOneAdminByEmail(email);
    if(!admin) {
        throw new Error("admin not found");
    }
    return admin;
}


const checkPassword = async (admin, password) => {
    const isPasswordValid = await comparePassword(password, admin.password_hash);
    if(!isPasswordValid){
        return false;
    }
    return true;
}

// ==================================== REGISTER ADMIN ====================================

const registerAdminController = async (req, res) => {
    try{
        const {name, email, password} = req.body;
        const hasAdmin = await fetchAdmin(email);
        if (hasAdmin){
            res.status(409).json({ error: "admin already exists" });
            return;
        }
        registerAdminOnDB(name, email, await setPasswordToHashPassword(password));
        res.status(201).json({msg: "success to register"});
    }   
    catch(err){
        res.status(500).json({error: "internal error"});
        throw err;
    }
}

// ==================================== LOGIN ADMIN ====================================

const loginAdminController = async (req, res) => {
    try{
        const {email, password} = req.body;
        const admin = await fetchAdmin(email, password)
        if (admin){
            const isPasswordValid = await checkPassword(admin, password)
            if(!isPasswordValid) {
                res.status(401)
                throw new Error("wrong password")
            }  
            res.status(200).json({msg: "authorized login"});
        }
    }
    catch(err){
        res.status(401).json({error: err.message});
    }
}

export {registerAdminController, loginAdminController};