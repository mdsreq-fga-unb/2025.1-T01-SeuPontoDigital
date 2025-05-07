import validateCPF from "../../middlewares/validateCPF.js";
import insertEmployee from "../../models/Employees/insertEmployee.js";

const postEmployeeController = async (req, res) => {
    try {
        const employee = req.body;

        if (validateCPF(employee.cpf)) {
            const error = await insertEmployee(employee);

            if (error) {
                return res.status(400).json({ message: "error when inserting employee" });
            }
            return res.status(201).json({ message: "inserted employee" });
        }
        return res.status(400).json({ message: "invalid cpf" })
    }
    catch (err) {
        return res.status(500).send({message: "internal server error"});
    }
}

export default postEmployeeController;