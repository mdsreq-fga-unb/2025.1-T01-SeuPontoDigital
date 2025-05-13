import getOneEmployerModel from "../../models/Employers/getOneEmployerModel.js";

const getOneEmployerController = async (req, res) => {
    try {
        const data = await getOneEmployerModel(req.params.id);

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