import getOneEmployerByID from "../../models/Employers/getOneEmployerByID.js";

const getOneEmployerController = async (req, res) => {
    try {
        const data = await getOneEmployerByID(req.params.id);

        if (data) {
            return res.status(200).json(data)
        }
        else {
            return res.status(404).json({ message: "not found employer" })
        }
    }
    catch (err) {
        return res.status(500).send({message: "internal server error"});
    }
}
export default getOneEmployerController;