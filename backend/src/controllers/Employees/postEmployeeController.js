import validateCPF from "../../middlewares/validateCPF.js";
import postEmployeeModel from "../../models/Employees/postEmployeeModel.js";

const postEmployeeController = async (req, res) => {
    try {
        const employee = req.body;

        if (validateCPF(employee.cpf)) {
            const error = await postEmployeeModel(employee);
            
            if (error) {
                return res.status(400).json({ message: error});
            }
            
            return res.status(201).json({ message: "employee has been added successfully" });
        }

        return res.status(400).json({ message: "invalid cpf" });
    }
    catch (err) {
        return res.status(500).send({message: "internal server error"});
    }
}

export default postEmployeeController;