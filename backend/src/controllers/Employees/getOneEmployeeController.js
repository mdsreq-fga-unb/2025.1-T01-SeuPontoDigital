import getOneEmployeeByID from "../../models/Employees/getOneEmployeeByID.js";

const getOneEmployeeController = async (req, res) => {
    try {
        const {id} = req.params
        const data = await getOneEmployeeByID(id);
        if (data) {
            return res.status(200).json(data)
        }
        else {
            return res.status(404).json({ message: "not found employee" })
        }
    }
    catch (err) {
        console.log("error in getOneEmployeeController controller:", err);
        throw err;
    }
}
export default getOneEmployeeController;
