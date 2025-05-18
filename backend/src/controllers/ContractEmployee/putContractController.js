import validateCPF from "../../middlewares/validateCPF.js";
import putContractModel from "../../models/ContractEmployee/putContractModel.js";
import findAdminByEmail from "../../models/Admin/findAdminByEmail.js";
import verifyPassword from "../../middlewares/verifyPassword.js";

const putContractController = async (req, res) => {
    try {
        const id = req.params.id;
        const updateDataContract = req.body;
        const { password } = req.body;
        const adminEmail = req.email;

        if (!password) {
            return res.status(400).json({ message: "password required" });
        }

        const admin = await findAdminByEmail(adminEmail);
        if (!admin) {
            return res.status(404).json({ message: "admin not found" });
        }

        const isPasswordValid = await verifyPassword(password, admin.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "invalid password" });
        }

        if (updateDataContract.cpf && !validateCPF(updateDataContract.cpf))
            return res.status(400).json({ message: "invalid cpf" });

        const error = await putContractModel(id, updateDataContract);
        if (error) {
            return res.status(500).json({message: error.message });
        }

        return res.status(200).json({ message: "contract updated successfully" });
    }
    catch (err) {
        return res.status(500).send({message: err.message});
    }
}

export default putContractController;