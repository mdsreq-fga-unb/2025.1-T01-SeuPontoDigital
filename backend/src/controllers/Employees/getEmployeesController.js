import getEmployeesFromDB from "../../models/Employees/getEmployeesFromDB.js";

const getEmployeesController = async (req, res) => {

    try {
        const data = await getEmployeesFromDB();
        if (data) {
            return res.status(200).json(data)
        }
        else {
            return res.status(404).json({ message: "not found employees" })
        }
    }
    catch (err) {
        console.log("error in getEmployess controller:", err);
        throw err;
    }
}

export default getEmployeesController;