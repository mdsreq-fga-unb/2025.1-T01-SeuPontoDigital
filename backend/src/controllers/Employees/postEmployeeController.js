import validateCPF from "../../middlewares/validateCPF.js";
import postEmployeeModel from "../../models/Employees/postEmployeeModel.js";

const postEmployeeController = async (req, res) => {
    try {
        const employee = req.body;

        if (validateCPF(employee.cpf)) {
            const result = await postEmployeeModel(employee);
            
            if (result?.error) {
                return res.status(400).json({ message: result.error});
            }
            
            return res.status(201).json({ 
                message: "employee has been added successfully",
                employeeId: result
            });
        }

        return res.status(400).json({ message: "invalid cpf" });
    }
    catch (err) {
        req.logger.error(err.message);
        return res.status(500).send({message: "internal server error"});
    }
}

export default postEmployeeController;