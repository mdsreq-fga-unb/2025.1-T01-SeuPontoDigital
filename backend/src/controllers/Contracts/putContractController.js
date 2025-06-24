import putContractModel from "../../models/Contracts/putContractModel.js";
import findAdminByEmail from "../../models/Admin/findAdminByEmail.js";
import validateHashPasswordEqual from "../../middlewares/validateHashPasswordEqual.js";

const putContractController = async (req, res) => {
    try {
        const contractID = req.params.id;
        const updateDataContract = req.body;
        const { passwordAdmin } = req.body;
        const adminEmail = req.email;

        if (!passwordAdmin) {
            return res.status(400).json({ message: "password required" });
        }

        const admin = await findAdminByEmail(adminEmail);
        if (!admin) {
            return res.status(404).json({ message: "admin not found" });
        }

        const isPasswordValid = await validateHashPasswordEqual(passwordAdmin, admin.password);
        delete updateDataContract.passwordAdmin;
        
        if (!isPasswordValid) {
            return res.status(401).json({ message: "invalid password" });
        }

        const error = await putContractModel(contractID, updateDataContract);
        if (error) {
            return res.status(500).json({message: "internal server error"});
        }

        return res.status(200).json({ message: "contract updated successfully" });
    }
    catch (err) {
        return res.status(500).send({message: "internal server error" });
    }
}

export default putContractController;