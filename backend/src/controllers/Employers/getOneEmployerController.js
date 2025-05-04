import getOneEmployerByID from "../../models/Employers/getOneEmployerByID.js";

const getOneEmployerController = async (req, res) => {
    try {
        const {id} = req.params
        const data = await getOneEmployerByID(id);
        if (data) {
            return res.status(200).json(data)
        }
        else {
            return res.status(404).json({ message: "not found employer" })
        }
    }
    catch (err) {
        console.log("error in getOneEmployerController controller:", err);
        throw err;
    }
}
export default getOneEmployerController;