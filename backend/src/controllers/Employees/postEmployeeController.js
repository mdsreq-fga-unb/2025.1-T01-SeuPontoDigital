import postEmployeeModel from "../../models/Employees/postEmployeeModel.js";
import validateCPF from "../../middlewares/validateCPF.js";

const postEmployeeController = async (req, res) => {
    try {
        const employeeData = req.body;

        if (!validateCPF(employeeData.cpf)) {
            return res.status(400).json({ message: "CPF inválido." });
        }

        const newEmployee = await postEmployeeModel(employeeData);
        return res.status(201).json(newEmployee);

    } catch (err) {
        console.error('Error in postEmployeeController:', err);
        return res.status(500).json({ message: "Erro interno do servidor." });
    }
};

export default postEmployeeController;