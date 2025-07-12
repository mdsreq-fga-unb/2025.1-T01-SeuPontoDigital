import putEmployerModel from "../../models/Employers/putEmployerModel.js";
import findAdminByEmail from "../../models/Admin/findAdminByEmail.js";
import validateHashPasswordEqual from "../../middlewares/validateHashPasswordEqual.js";
import validateCPF from "../../middlewares/validateCPF.js";

const putEmployerController = async (req, res) => {
    const { id } = req.params;
    const { adminEmail, adminPassword, passwordAdmin, ...employerData } = req.body;

    try {
        // Aceita passwordAdmin do body ou adminPassword dos headers
        const adminPasswordToValidate = passwordAdmin || adminPassword;
        
        if (!adminPasswordToValidate) {
            return res.status(400).json({ message: "Senha do administrador é obrigatória." });
        }

        // Se não tiver adminEmail no body, tenta pegar do header
        const adminEmailToUse = adminEmail || req.headers.adminemail;

        if (!adminEmailToUse) {
            return res.status(400).json({ message: "Email do administrador é obrigatório." });
        }

        const admin = await findAdminByEmail(adminEmailToUse);

        if (!admin) {
            return res.status(404).json({ message: "Administrador não encontrado." });
        }

        const isPasswordValid = await validateHashPasswordEqual(adminPasswordToValidate, admin.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: "Senha do administrador inválida." });
        }

        if (employerData.cpf && !validateCPF(employerData.cpf)) {
            return res.status(400).json({ message: "CPF inválido." });
        }

        const updatedEmployer = await putEmployerModel(id, employerData);

        if (!updatedEmployer) {
            return res.status(404).json({ message: "Empregador não encontrado." });
        }

        return res.status(200).json(updatedEmployer);

    } catch (err) {
        console.error('Error in putEmployerController:', err);
        return res.status(500).json({ message: "Erro interno do servidor." });
    }
};

export default putEmployerController;