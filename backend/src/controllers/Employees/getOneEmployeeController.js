import getOneEmployeeModel from "../../models/Employees/getOneEmployeeModel.js";

const getOneEmployeeController = async (req, res) => {
    try {
        const employeeID = req.params.id;

        const employee = await getOneEmployeeModel(employeeID)
    
        if (!employee) {
            return res.status(404).send({ message: "employer not found" });
        }

        return res.status(200).json(employee);
    } catch (err) {
        return res.status(500).json({ message: "internal server error" });
    }
}

export default getOneEmployeeController;