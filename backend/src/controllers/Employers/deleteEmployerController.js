import deleteEmployerByID from "../../models/Employers/deleteEmployerByID.js";
import findAdminByEmail from "../../models/findAdminByEmail.js";
import verifyPassword from "../../middlewares/verifyPassword.js";

const deleteEmployerController = async (req, res) => {
    
    try {
        const employerID  = req.params.id;
        const {password} = req.body;
        const adminEmail = req.email;
        const admin = await findAdminByEmail(adminEmail);
        if (!admin) {
            return res.status(404).json({message: "admin not found"})
        }
        const isPasswordValid = await verifyPassword(password, admin.password)
        if (!isPasswordValid) {
            return res.status(401).json({message: "invalid password"});
        }
        const error = await deleteEmployerByID(employerID);
        if (error) {
            return res.status(400).json({ message: "one or more of the data sent is incorrect"});
        }
        return res.status(200).json({ message: "employer deleted" });
    }
    catch (err) {
        return res.status(500).send({message: "internal server error", error: err});
        
    }
}

export default deleteEmployerController;