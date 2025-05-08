import getEmployersFromDB from "../../models/Employers/getEmployersfromDB.js";

const getEmployersController = async (req, res) => {
    try {
        const data = await getEmployersFromDB();

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