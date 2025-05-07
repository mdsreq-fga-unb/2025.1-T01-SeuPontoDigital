import deleteEmployeeByID from "../../models/Employees/deleteEmployeeByID.js";

const deleteEmployeeController = async (req, res) => {
    try {
        const { id } = req.params;
        const error = await deleteEmployeeByID(id);
        if (error) {
            return res.status(400).json({ message: "one or more of the data sent is incorrect"});
        }
        return res.status(200).json({ message: "employee deleted" });
    }
    catch (err) {
        return res.status(500).send({message: "internal server error"});
    }
}

export default deleteEmployeeController;