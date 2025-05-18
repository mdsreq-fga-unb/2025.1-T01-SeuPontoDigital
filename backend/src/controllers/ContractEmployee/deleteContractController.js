import deleteContractModel from "../../models/ContractEmployee/deleteContractModel.js";
import findAdminByEmail from "../../models/Admin/findAdminByEmail.js";
import verifyPassword from "../../middlewares/verifyPassword.js";

const deleteContractController = async (req, res) => {
    try {
        const contractID  = req.id;
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

        const error = await deleteContractModel(contractID);
        if (error) {
            return res.status(400).json({ message: "one or more of the data sent are incorrect"});
        }

        return res.status(200).json({ message: "contract deleted" });
    }
    catch (err) {
        return res.status(500).send({message: "internal server error"});
    }
}

export default deleteContractController;