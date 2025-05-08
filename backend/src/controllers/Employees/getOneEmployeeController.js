import getOneEmployeeByID from "../../models/Employees/getOneEmployeeByID.js";

const getOneEmployeeController = async (req, res) => {
    try {
        const data = await getOneEmployeeByID(req.params.id);

        if (data) {
            return res.status(200).json(data)
        }
        else {
            return res.status(404).json({ message: "not found employee" })
        }
    }
    catch (err) {
        return res.status(500).send({message: "internal server error"});
    }
}
export default getOneEmployeeController;
