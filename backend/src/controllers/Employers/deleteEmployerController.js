import deleteEmployerModel from "../../models/Employers/deleteEmployerModel.js";
import findAdminByEmail from "../../models/Admin/findAdminByEmail.js";
import validateHashPasswordEqual from "../../middlewares/validateHashPasswordEqual.js";

const deleteEmployerController = async (req, res) => {
    
    try {
        const { id: employerID } = req.params;
        const { password: passwordAdmin } = req.body;
        const adminEmail = req.email;

        if (!passwordAdmin) {
            return res.status(400).json({ message: "password required" });
        }

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
            return res.status(400).json({ message: "delete failed: " + (error.message || JSON.stringify(error))});
        }

        return res.status(200).json({ message: "employer deleted" });
    }
    catch (err) {
        console.error("Error in deleteEmployerController:", err);
        return res.status(500).send({ message: "internal server error"});  
    }
}

export default deleteEmployerController;