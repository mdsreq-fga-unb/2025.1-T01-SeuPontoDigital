import validateCPF from "../../middlewares/validateCPF.js";
import putEmployerModel from "../../models/Employers/putEmployerModel.js";
import findAdminByEmail from "../../models/Admin/findAdminByEmail.js";
import validateHashPasswordEqual from "../../middlewares/validateHashPasswordEqual.js";

const putEmployerController = async (req, res) => {
    try {
        const { id } = req.params;
        const updateDataEmployer = req.body;
        const { passwordAdmin } = req.body;
        const adminEmail = req.email;
        
        // Remover campos que não devem ser atualizados
        delete updateDataEmployer.activeEmployees;
        delete updateDataEmployer.inactiveEmployees;
        delete updateDataEmployer.id;
        delete updateDataEmployer.id_address;

        if (!passwordAdmin) {
            return res.status(400).json({ message: "password required" });
        }

        const admin = await findAdminByEmail(adminEmail);
        if (!admin) {
            return res.status(404).json({ message: "admin not found" });
        }

        const isPasswordValid = await validateHashPasswordEqual(passwordAdmin, admin.password);
        delete updateDataEmployer.passwordAdmin;
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