import deleteContractModel from "../../models/Contracts/deleteContractModel.js";
import findAdminByEmail from "../../models/Admin/findAdminByEmail.js";
import validateHashPasswordEqual from "../../middlewares/validateHashPasswordEqual.js";

const deleteContractController = async (req, res) => {
    try {
        const contractID  = req.id;
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

        const error = await deleteContractModel(contractID);
        if (error) {
            return res.status(400).json({ message: error.message});
        }

        return res.status(200).json({ message: "contract deleted" });
    }
    catch (err) {
        return res.status(500).send({message: err.message});
    }
}

export default deleteContractController;