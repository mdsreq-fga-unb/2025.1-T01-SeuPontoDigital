import getOneEmployerWithContractsModel from "../../models/Employers/getOneEmployerWithContractsModel.js";

const getOneEmployerController = async (req, res) => {
    try {
        const employerID = req.params.id;
        const employer = await getOneEmployerWithContractsModel(employerID);
        if (!employer) {
            return res.status(404).send({ message: "employer not found" });
        }

        return res.status(200).json(employer);
    } catch (err) {
        return res.status(500).json({ message: "internal server error" });
    }
};

export default getOneEmployerController;