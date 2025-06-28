import getEmployeesModel from "../../models/Employees/getEmployeesModel.js";

const getEmployeesController = async (req, res) => {
    try {
        const data = await getEmployeesModel();

        if (data) {
            return res.status(200).json(data);
        }
        else {
            return res.status(404).json({ message: "employees not found" });
        }
    }
    catch (err) {
        return res.status(500).send({message: "internal server error"});
    }
}

export default getEmployeesController;