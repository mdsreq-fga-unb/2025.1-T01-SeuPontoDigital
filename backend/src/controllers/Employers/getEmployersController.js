import getEmployersModel from "../../models/Employers/getEmployersModel.js";

const getEmployersController = async (req, res) => {
    try {
        const data = await getEmployersModel();

        if (data) {
            return res.status(200).json(data)
        }
        else {
            return res.status(404).json({ message: "not found employers" })
        }
    }
    catch (err) {
        return res.status(500).send({message: "internal server error"});
    }
}

export default getEmployersController;