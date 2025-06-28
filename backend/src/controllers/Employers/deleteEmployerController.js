import deleteEmployerModel from "../../models/Employers/deleteEmployerModel.js";
import findAdminByEmail from "../../models/Admin/findAdminByEmail.js";
import validateHashPasswordEqual from "../../middlewares/validateHashPasswordEqual.js";

const deleteEmployerController = async (req, res) => {
    
    try {
        const employerID  = req.id;
        const {passwordAdmin} = req.body;
        const adminEmail = req.email;

        const admin = await findAdminByEmail(adminEmail);
        if (!admin) {
            return res.status(404).json({message: "admin not found"});
        }

        const isPasswordValid = await validateHashPasswordEqual(passwordAdmin, admin.password);
        if (!isPasswordValid) {
            return res.status(401).json({message: "invalid password"});
        }

        const error = await deleteEmployerModel(employerID);
        if (error) {
            return res.status(400).json({ message: "insert failed: 'id_employer' cannot be null in 'sign_contract' table"});
        }

        return res.status(200).json({ message: "employer deleted" });
    }
    catch (err) {
        return res.status(500).send({ message: err.message});  
    }
}

export default deleteEmployerController;