import { registerAdminModel} from "../models/adminModel.js";
import { passwordToHash, authenticateAdmin } from "../services/adminAuth.js";

const registerAdminController = async (req, res) => {
    try{
        const {name, email, password} = req.body;
        registerAdminModel(name, email, await passwordToHash(password));
        res.status(201).json({msg: "success to register"});
    }   
    catch(err){
        res.status(500).json({error: "internal error"});
        throw err;
    }
}

const loginAdminController = async (req, res) => {
    try{
        const {email, password} = req.body;
        const admin = await authenticateAdmin(email, password)
        res.status(200).json({msg: "authorized login"});
    }
    catch(err){
        res.status(401).json({error: err.message});
    }
}

export {registerAdminController, loginAdminController};