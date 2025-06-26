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
        
        req.logger.info('Starting employer update process', { employerId: id, adminEmail });
        
        // Remover campos que não devem ser atualizados
        delete updateDataEmployer.activeEmployees;
        delete updateDataEmployer.inactiveEmployees;
        delete updateDataEmployer.id;
        delete updateDataEmployer.id_address;

        if (!passwordAdmin) {
            req.logger.warn('Password not provided for employer update', { employerId: id });
            return res.status(400).json({ message: "password required" });
        }

        const admin = await findAdminByEmail(adminEmail);
        if (!admin) {
            req.logger.warn('Admin not found during employer update', { adminEmail });
            return res.status(404).json({ message: "admin not found" });
        }

        const isPasswordValid = await validateHashPasswordEqual(passwordAdmin, admin.password);
        delete updateDataEmployer.passwordAdmin;
        if (!isPasswordValid) {
            req.logger.warn('Invalid admin password provided for employer update', { adminEmail });
            return res.status(401).json({ message: "invalid password" });
        }

        if (updateDataEmployer.cpf && !validateCPF(updateDataEmployer.cpf)) {
            req.logger.warn('Invalid CPF provided for employer update', { employerId: id });
            return res.status(400).json({ message: "invalid cpf" });
        }
        
        const error = await putEmployerModel(id, updateDataEmployer);
        if (error) {
            req.logger.error('Error updating employer', { 
                employerId: id, 
                error: error.message || error
            });
            return res.status(500).json({ message: "internal server error: " + JSON.stringify(error) });
        }

        req.logger.info('Employer updated successfully', { employerId: id });
        return res.status(200).json({ message: "employer updated successfully" });
    }
    catch (err) {
        req.logger.error('Unexpected error in putEmployerController', {
            error: err.message || err,
            stack: err.stack
        });
        return res.status(500).send({ message: "internal server error" });
    }
}

export default putEmployerController;