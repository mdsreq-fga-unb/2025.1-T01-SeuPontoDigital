import getOneEmployerByID from "../../models/Employees/getOneEmployeeByID.js";

const getOneEmployerController = async (req, res) => {
    try {
        const {id} = req.params
        const data = await getOneEmployerByID(id);
        if (data) {
            return res.status(200).json(data)
        }
        else {
            return res.status(404).json({ message: "not found employee" })
        }
    }
    catch (err) {
        console.log("error in getOneEmployerController controller:", err);
        throw err;
    }
}
export default getOneEmployerController;