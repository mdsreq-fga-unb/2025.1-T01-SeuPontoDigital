import validateCPF from "../../middlewares/validateCPF.js";
import putEmployeeModel from "../../models/Employees/putEmployeeModel.js";
import findAdminByEmail from "../../models/Admin/findAdminByEmail.js";
import validateHashPasswordEqual from "../../middlewares/validateHashPasswordEqual.js";

const putEmployeeController = async (req, res) => {
    try {
        const employeeID  = req.params.id;
        const updateDataEmployee = req.body;
        const { passwordAdmin } = req.body;
        const adminEmail = req.email;
        
        // Remover campos que não devem ser atualizados
        delete updateDataEmployee.id;

        if (!passwordAdmin) {
            return res.status(400).json({ message: "password required" });
        }

        const admin = await findAdminByEmail(adminEmail);
        if (!admin) {
            return res.status(404).json({ message: "admin not found" });
        }

        const isPasswordValid = await validateHashPasswordEqual(passwordAdmin, admin.password);
        delete updateDataEmployee.passwordAdmin;
        if (!isPasswordValid) {
            return res.status(401).json({ message: "invalid password" });
        }

        if (updateDataEmployee.cpf && !validateCPF(updateDataEmployee.cpf))
            return res.status(400).json({ message: "invalid cpf" });
        
        const error = await putEmployeeModel(employeeID, updateDataEmployee);
        if (error) {
            return res.status(500).json({ message: "internal server error" });
        }

        return res.status(200).json({ message: "employer updated successfully" });
    }
    catch (err) {
        return res.status(500).send({ message: "internal server error" });
    }
}

export default putEmployeeController;