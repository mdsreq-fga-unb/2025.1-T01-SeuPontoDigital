import deleteEmployerModel from "../../models/Employers/deleteEmployerModel.js";
import findAdminByEmail from "../../models/Admin/findAdminByEmail.js";
import verifyPassword from "../../middlewares/verifyPassword.js";

const deleteEmployerController = async (req, res) => {
    
    try {
        const employerID  = req.id;
        const {password} = req.body;
        const adminEmail = req.email;

        const admin = await findAdminByEmail(adminEmail);
        if (!admin) {
            return res.status(404).json({message: "admin not found"});
        }

        const isPasswordValid = await verifyPassword(password, admin.password);
        if (!isPasswordValid) {
            return res.status(401).json({message: "invalid password"});
        }

        const error = await deleteEmployerModel(employerID);
        if (error) {
            return res.status(400).json({ message: "one or more of the data sent are incorrect"});
        }

        return res.status(200).json({ message: "employer deleted" });
    }
    catch (err) {
        return res.status(500).send({ message: "internal server error" });  
    }
}

export default deleteEmployerController;