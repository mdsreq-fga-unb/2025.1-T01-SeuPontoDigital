import getOneEmployerModel from "../../models/Employers/getOneEmployerModel.js"

const getOneEmployerController = async (req, res) => {
    try {
        const employerId = req.params.id;
        const employer = await getOneEmployerModel(employerId)
        if (!employer){
            return res.status(404).send({message: "not found employers"});
        }
        return res.status(200).json(employer)
    } catch (err) {
        return res.status(500).json({ message: "Internal server error" });
    }
};

export default getOneEmployerController;