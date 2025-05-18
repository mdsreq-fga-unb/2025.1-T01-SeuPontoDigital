import validateCPF from "../../middlewares/validateCPF.js";
import putEmployerModel from "../../models/Employers/putEmployerModel.js";
import findAdminByEmail from "../../models/Admin/findAdminByEmail.js";
import verifyPassword from "../../middlewares/verifyPassword.js";

const putEmployerController = async (req, res) => {
    try {
        const { id } = req.params;
        const updateDataEmployer = req.body;
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

        if (updateDataEmployer.cpf && !validateCPF(updateDataEmployer.cpf))
            return res.status(400).json({ message: "invalid cpf" });

        const error = await putEmployerModel(id, updateDataEmployer);
        if (error) {
            return res.status(500).json({ message: "internal server error" });
        }

        return res.status(200).json({ message: "employer updated successfully" });
    }
    catch (err) {
        return res.status(500).send({ message: "internal server error" });
    }
}

export default putEmployerController;